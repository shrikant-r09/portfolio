import { useEffect, useRef } from 'react';

// Full-page drifting dots, linked when close, attracted to the cursor.
export default function Particles() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 120, REACH = 180;
    let dots = [], w, h, raf;

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // ponytail: O(n²) linking, capped at 140 dots; use a spatial grid if you raise the cap
      const n = Math.min(140, Math.round((w * h) / 9000));
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    function frame() {
      const css = getComputedStyle(document.documentElement);
      const dot = css.getPropertyValue('--muted').trim();
      const accent = css.getPropertyValue('--accent').trim();
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        if (!still) {
          const dx = mouse.x - d.x, dy = mouse.y - d.y, dist = Math.hypot(dx, dy);
          if (dist < REACH) { d.vx += dx / dist * 0.02; d.vy += dy / dist * 0.02; }
          const speed = Math.hypot(d.vx, d.vy);
          if (speed > 1.2) { d.vx *= 1.2 / speed; d.vy *= 1.2 / speed; }
          else if (speed > 0.3) { d.vx *= 0.99; d.vy *= 0.99; } // ease back to a slow drift
          d.x += d.vx; d.y += d.vy;
          if (d.x < 0 || d.x > w) d.vx *= -1;
          if (d.y < 0 || d.y > h) d.vy *= -1;
        }
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = dot;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j], dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK) {
            ctx.globalAlpha = (1 - dist / LINK) * 0.35;
            ctx.strokeStyle = dot;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < REACH) {
          ctx.globalAlpha = (1 - md / REACH) * 0.6;
          ctx.strokeStyle = accent;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      if (!still) raf = requestAnimationFrame(frame);
    }

    const move = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const leave = () => { mouse.x = mouse.y = -9999; };
    const onResize = () => { resize(); if (still) frame(); };
    resize(); frame();
    addEventListener('resize', onResize);
    addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', onResize);
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
