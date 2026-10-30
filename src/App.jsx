import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { contact, projects, skills, certs, leadership } from './data.js';
import Particles from './Particles.jsx';
import { iconFor } from './icons.js';

function Tag({ name }) {
  const Icon = iconFor(name);
  return <span><Icon aria-hidden="true" />{name}</span>;
}

const ease = [0.22, 1, 0.36, 1];
const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease },
};

function Section({ id, index, title, children }) {
  return (
    <section id={id} className="section">
      <motion.header className="section-head" {...reveal}>
        <span className="idx">{index}</span>
        <h2>{title}</h2>
        <motion.span className="rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1, ease }} />
      </motion.header>
      {children}
    </section>
  );
}

function Nav({ onHome }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <motion.nav className="nav" initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease }}>
        <button className="brand" onClick={onHome} aria-label="Back to landing">SR<span>/</span>DEV</button>
        <div className="links">
          {['work', 'stack', 'about', 'contact'].map(l => <a key={l} href={`#${l}`}>{l}</a>)}
        </div>
        <a className="btn small" href="/Shrikant_Rathod_CV_FullStack.pdf" download>Résumé ↓</a>
      </motion.nav>
    </>
  );
}

const Sun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const Moon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
  </svg>
);

function ThemeToggle() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'dark');
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    setTheme(next);
  }
  return (
    <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={theme} style={{ display: 'grid' }}
          initial={{ rotate: -90, scale: 0, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
          {theme === 'dark' ? <Moon /> : <Sun />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

// Full-screen landing; "Explore my work" wipes it away to reveal the full site.
function Landing({ onEnter }) {
  const words = ['I', 'build', 'complete', 'web', 'products'];
  return (
    <motion.header className="landing" key="landing"
      exit={{ y: '-100%', transition: { duration: 0.9, ease } }}>
      <div className="grid-bg" />
      <motion.div className="glow" animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="landing-top">
        <span className="brand">SR<span>/</span>DEV</span>
        <span className="status"><span className="dot" /> Open to work</span>
      </div>

      <div className="landing-center">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Portfolio · Shrikant Rathod · Full-Stack Developer
        </motion.p>
        <h1>
          {words.map((w, i) => (
            <span className="mask" key={w}>
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.9, ease }}>{w}</motion.span>
            </span>
          )).flatMap((el, i) => i ? [' ', el] : [el])}
          <br />
          <span className="mask">
            <motion.em initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ delay: 0.75, duration: 1, ease }}>end to end.</motion.em>
          </span>
        </h1>
        <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease }}>
          Final-year CSE student at DYPCET, Kolhapur. From the React screen to the Node &amp; FastAPI
          APIs, the database and the AI behind it — I design it, build it and ship it live.
        </motion.p>
        <motion.dl className="specs" initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } } }}>
          {[['02', 'live full-stack AI apps shipped'], ['MERN', 'primary stack, plus FastAPI'], ['RAG', 'retrieval AI running in production'], ['2027', 'graduating · open to roles now']].map(([v, k]) => (
            <motion.div key={k} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <dt>{v}</dt><dd>{k}</dd>
            </motion.div>
          ))}
        </motion.dl>
        <motion.div className="cta center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6, ease }}>
          <button className="btn pill" onClick={onEnter}>Explore my work ↓</button>
          <a className="btn pill ghost" href="/Shrikant_Rathod_CV_FullStack.pdf" target="_blank" rel="noopener">View résumé</a>
        </motion.div>
      </div>

      <div className="landing-foot">
        <span>{contact.location}</span>
        <span>Web Developer · Full-Stack · Data Analyst</span>
      </div>
    </motion.header>
  );
}

function Marquee() {
  const items = skills.slice(0, 6).flatMap(s => s.items);
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="track" animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}>
        {[...items, ...items].map((t, i) => <span key={i}>{t} <i>✦</i></span>)}
      </motion.div>
    </div>
  );
}

function Project({ p, i }) {
  const [noImg, setNoImg] = useState(false);
  return (
    <motion.article className="project" {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
      <div className="project-meta">
        <span className="idx">P-{String(i + 1).padStart(2, '0')}</span>
        <span>{p.kind}</span>
      </div>
      <motion.div className={`shot ${noImg ? 'empty' : ''}`} whileHover={{ scale: 1.02 }} transition={{ duration: 0.4, ease }}>
        {noImg ? <span>// screenshot coming soon</span>
          : <img src={p.image} alt={`${p.name} screenshot`} onError={() => setNoImg(true)} loading="lazy" />}
      </motion.div>
      <div className="project-body">
        <h3>{p.name}</h3>
        <ul>{p.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
        <div className="tags">{p.stack.map(s => <Tag key={s} name={s} />)}</div>
        <div className="cta">
          <a className="btn" href={p.live} target="_blank" rel="noopener">Live demo ↗</a>
          {p.code && <a className="btn ghost" href={p.code} target="_blank" rel="noopener">Source ↗</a>}
        </div>
      </div>
    </motion.article>
  );
}

function ContactForm() {
  const [state, setState] = useState({ status: 'idle', msg: '' });
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ status: 'sending', msg: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      form.reset();
      setState({ status: 'sent', msg: 'Message received — I’ll get back to you soon.' });
    } catch (err) {
      setState({ status: 'error', msg: err.message });
    }
  }
  return (
    <motion.form className="form" onSubmit={submit} {...reveal}>
      <label>Name<input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" /></label>
      <label>Email<input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@company.com" /></label>
      <label>Message<textarea name="message" rows={5} required maxLength={2000} placeholder="Tell me about the role or project…" /></label>
      <button className="btn" disabled={state.status === 'sending'}>
        {state.status === 'sending' ? 'Sending…' : 'Send message →'}
      </button>
      {state.msg && <p className={`form-msg ${state.status}`} role="status">{state.msg}</p>}
    </motion.form>
  );
}

export default function App() {
  const [entered, setEntered] = useState(() => !!location.hash);
  const enter = () => { setEntered(true); scrollTo(0, 0); };
  return (
    <>
      <Particles />
      <ThemeToggle />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {entered ? <Site key="site" onHome={() => { setEntered(false); history.replaceState(null, '', ' '); }} />
            : <Landing key="landing" onEnter={enter} />}
        </AnimatePresence>
      </div>
    </>
  );
}

function Site({ onHome }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <Nav onHome={onHome} />
      <section className="intro">
        <motion.p className="eyebrow" {...reveal}>// who I am</motion.p>
        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
          Full-stack developer who <em>ships.</em>
        </motion.h2>
        <motion.p className="lead" {...reveal} transition={{ ...reveal.transition, delay: 0.2 }}>
          I'm <b>Shrikant Rathod</b>, a final-year Computer Science student at DYPCET, Kolhapur — I build
          React front ends, Node &amp; FastAPI back ends, MongoDB/SQL data layers and the AI behind them.
          A Data Science minor means I can also turn the data into decisions.
        </motion.p>
        <motion.div className="cta" {...reveal} transition={{ ...reveal.transition, delay: 0.3 }}>
          <a className="btn" href="/Shrikant_Rathod_CV_FullStack.pdf" download>CV — Full-Stack ↓</a>
          <a className="btn ghost" href="/Shrikant_Rathod_CV_DataAnalyst.pdf" download>CV — Data Analyst ↓</a>
        </motion.div>
      </section>
      <Marquee />
      <main>
        <Section id="work" index="01" title="Selected work">
          <div className="projects">{projects.map((p, i) => <Project key={p.name} p={p} i={i} />)}</div>
        </Section>

        <Section id="stack" index="02" title="Tech stack">
          <div className="skills">
            {skills.map((s, i) => (
              <motion.div className="card" key={s.group} {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.06 }} whileHover={{ y: -6 }}>
                <h4>{s.group}</h4>
                <div className="tags">{s.items.map(t => <Tag key={t} name={t} />)}</div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="about" index="03" title="About & credentials">
          <div className="about">
            <motion.div {...reveal}>
              <p>B.Tech Computer Science (Major) with a Data Science minor at D. Y. Patil College of
                Engineering &amp; Technology, Kolhapur (2023 – 2027, CGPA 7.00). I like owning a
                feature end to end — schema, API, UI, deployment — and I’m most at home where web
                engineering meets data and AI.</p>
              <h4 className="sub">Leadership</h4>
              {leadership.map(l => <p key={l.title}><b>{l.title}</b> — {l.text}</p>)}
            </motion.div>
            <ol className="timeline">
              {certs.map((c, i) => (
                <motion.li key={c.title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease }}>
                  <time>{c.date}</time><h4>{c.title}</h4><p>{c.by}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </Section>

        <Section id="contact" index="04" title="Let’s build something">
          <div className="contact">
            <motion.ul className="contact-list" {...reveal}>
              <li><span>Email</span><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><span>Phone</span><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
              <li><span>LinkedIn</span><a href={contact.linkedin} target="_blank" rel="noopener">shrikant-rathod</a></li>
              <li><span>GitHub</span><a href={contact.github} target="_blank" rel="noopener">shrikant-r09</a></li>
              <li><span>Based in</span>{contact.location}</li>
            </motion.ul>
            <ContactForm />
          </div>
        </Section>
      </main>
      <footer>© 2026 Shrikant Rathod · Built with MongoDB, Express, React &amp; Node</footer>
    </motion.div>
  );
}
