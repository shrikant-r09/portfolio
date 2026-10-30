import { useEffect, useRef } from 'react';

// 3D point cloud that morphs into a new shape for whichever [data-scene] element
// is in the middle of the screen, tilts toward the mouse, and uses the theme gradient.
const N = 1400;
const rand = (a = 1) => (Math.random() * 2 - 1) * a;

const shapes = {
  galaxy: i => {
    const r = Math.sqrt(Math.random()) * 1.5, arm = (i % 3) * (Math.PI * 2 / 3), a = arm + r * 3.2 + rand(0.35);
    return [Math.cos(a) * r, rand(0.08) * (1.6 - r), Math.sin(a) * r];
  },
  sphere: i => {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), a = i * 2.39996;
    return [Math.cos(a) * r * 1.1, y * 1.1, Math.sin(a) * r * 1.1];
  },
  wave: i => {
    const cols = 50, x = (i % cols) / (cols - 1) * 3.4 - 1.7, z = Math.floor(i / cols) / (N / cols) * 2.4 - 1.2;
    return [x, 0, z]; // y is animated each frame
  },
  helix: i => {
    const t = (i / N) * 2.8 - 1.4, a = t * 7 + (i % 2) * Math.PI, rung = i % 9 === 0;
    const r = rung ? rand(0.6) : 0.6;
    return [Math.cos(a) * r + rand(0.03), t, Math.sin(a) * r + rand(0.03)];
  },
  torus: () => {
    const u = Math.random() * Math.PI * 2, v = Math.random() * Math.PI * 2;
    return [(1 + 0.35 * Math.cos(v)) * Math.cos(u), 0.35 * Math.sin(v), (1 + 0.35 * Math.cos(v)) * Math.sin(u)];
  },
  stars: () => [rand(2.2), rand(1.4), rand(1.6)],
};
const targets = Object.fromEntries(Object.entries(shapes).map(([k, f]) => [k, Array.from({ length: N }, (_, i) => f(i))]));

// camera tilt (radians around X) per shape, so each reads best
const viewTilt = { galaxy: 1.0, wave: 0.5, sphere: 0.25, helix: 0.15, torus: 0.9, stars: 0.1 };

const hex = h => [1, 3, 5].map(o => parseInt(h.slice(o, o + 2), 16));

export default function Particles() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pts = targets.galaxy.map(([x, y, z]) => ({ x: x * 3, y: y * 3, z: z * 3 })); // start exploded, fly in
    const mouse = { x: 0, y: 0 }, tilt = { x: 0, y: 0 };
    let scene = 'galaxy', w, h, raf, frame = 0, rotY = 0, baseTilt = viewTilt.galaxy, palette = [];

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function readTheme() {
      const css = getComputedStyle(document.documentElement);
      const a = hex(css.getPropertyValue('--accent').trim()), b = hex(css.getPropertyValue('--accent-2').trim());
      palette = Array.from({ length: 12 }, (_, k) => `rgb(${a.map((v, j) => Math.round(v + (b[j] - v) * k / 11)).join(',')})`);
    }

    function pickScene() {
      const mid = h * 0.5;
      for (const el of document.querySelectorAll('[data-scene]')) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) { scene = el.dataset.scene; return; }
      }
    }

    function draw() {
      frame++;
      if (frame % 15 === 1) { pickScene(); readTheme(); }
      const t = frame / 60, target = targets[scene] || targets.galaxy, ease = still ? 1 : 0.04;
      if (!still) {
        rotY += scene === 'wave' ? 0.0008 : 0.0025;
        tilt.x += (mouse.y * 0.35 - tilt.x) * 0.05;
        tilt.y += (mouse.x * 0.6 - tilt.y) * 0.05;
      }
      baseTilt += ((viewTilt[scene] ?? 0.25) - baseTilt) * (still ? 1 : 0.03);
      const ay = rotY + tilt.y, ax = baseTilt + tilt.x;
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const scale = Math.min(w, h) * 0.42, cam = 3.4;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < N; i++) {
        const p = pts[i], [tx, ty0, tz] = target[i];
        const ty = scene === 'wave' && !still ? Math.sin(tx * 2.2 + t * 1.4) * 0.18 + Math.cos(tz * 2.6 + t) * 0.12 : ty0;
        p.x += (tx - p.x) * ease; p.y += (ty - p.y) * ease; p.z += (tz - p.z) * ease;

        // rotate around Y, then X
        const x1 = p.x * cy - p.z * sy, z1 = p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx, z2 = p.y * sx + z1 * cx;
        const k = cam / (cam + z2);
        if (k <= 0) continue;
        const px = w / 2 + x1 * scale * k, py = h / 2 + y2 * scale * k;
        if (px < -10 || px > w + 10 || py < -10 || py > h + 10) continue;

        const depth = Math.min(1, Math.max(0, (k - 0.6) / 0.9));
        ctx.globalAlpha = 0.3 + depth * 0.7;
        ctx.fillStyle = palette[Math.min(11, Math.max(0, Math.floor(px / w * 12)))];
        const s = 1 + depth * 2.2;
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    const move = e => { mouse.x = e.clientX / w - 0.5; mouse.y = e.clientY / h - 0.5; };
    resize(); readTheme(); draw();
    addEventListener('resize', resize);
    addEventListener('pointermove', move);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', move);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
