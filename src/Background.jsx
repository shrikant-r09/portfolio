import { useEffect, useState } from 'react';

// Blurred aurora glows + film grain, recolored per [data-scene] section.
const palettes = {
  galaxy: ['#1d4ed8', '#1e3a8a', '#6d28d9', '#0f172a'],
  sphere: ['#7c3aed', '#2563eb', '#db2777', '#1e1b4b'],
  wave:   ['#c026d3', '#f59e0b', '#0d9488', '#7c3aed'],
  helix:  ['#0891b2', '#4f46e5', '#22d3ee', '#1e3a8a'],
  torus:  ['#e11d48', '#7c3aed', '#f97316', '#312e81'],
  stars:  ['#2563eb', '#14b8a6', '#8b5cf6', '#0f172a'],
};

function useScene() {
  const [scene, setScene] = useState('galaxy');
  useEffect(() => {
    function pick() {
      const mid = innerHeight / 2;
      for (const el of document.querySelectorAll('[data-scene]')) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) return setScene(el.dataset.scene);
      }
    }
    pick();
    const id = setInterval(pick, 400); // also catches landing ↔ site switches, not just scrolls
    addEventListener('scroll', pick, { passive: true });
    return () => { clearInterval(id); removeEventListener('scroll', pick); };
  }, []);
  return scene;
}

export default function Background() {
  const colors = palettes[useScene()] || palettes.galaxy;
  return (
    <>
      <div className="aurora" aria-hidden="true">
        {colors.map((c, i) => <div key={i} className={`blob b${i}`} style={{ backgroundColor: c }} />)}
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
