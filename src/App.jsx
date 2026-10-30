import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useSpring } from 'framer-motion';
import { contact, projects, skills, certs, leadership } from './data.js';
import Background from './Background.jsx';
import { iconFor } from './icons.js';

function Tag({ name }) {
  const [Icon, color] = iconFor(name);
  return <span><Icon aria-hidden="true" style={color ? { color } : undefined} />{name}</span>;
}

// Endless row of brand-colored logo chips; pauses on hover.
function LogoRow({ items, reverse }) {
  return (
    <div className="logo-row" aria-hidden="true">
      <div className={`logo-track ${reverse ? 'reverse' : ''}`}>
        {[...items, ...items].map((t, i) => {
          const [Icon, color] = iconFor(t);
          return <span className="logo-chip" key={i}><Icon style={color ? { color } : undefined} />{t}</span>;
        })}
      </div>
    </div>
  );
}

const featured = ['React', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'JavaScript', 'Python', 'FastAPI', 'Docker', 'Git'];
const featured2 = ['Gemini API', 'GitHub', 'Vercel', 'Razorpay', 'JWT', 'Google OAuth', 'HTML', 'CSS', 'Pandas', 'NumPy', 'Scikit-learn'];

const ease = [0.22, 1, 0.36, 1];
const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease },
};

// blurred & ghosted → crisp (used by the bento cards and contact panels)
const blurIn = {
  hidden: { opacity: 0, scale: 0.94, filter: 'blur(14px)' },
  show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
};

function Section({ id, index, title, scene, children }) {
  return (
    <section id={id} className="section" data-scene={scene}>
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
    <motion.header className="landing" key="landing" data-scene="galaxy"
      exit={{ y: '-100%', transition: { duration: 0.9, ease } }}>
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

// Cut-out portrait that fades out at the bottom, framed by HUD corners and floating info chips.
const bob = (d, dur = 5) => ({ animate: { y: [0, -8, 0] }, transition: { duration: dur, repeat: Infinity, ease: 'easeInOut', delay: d } });

function Portrait() {
  return (
    <motion.div className="portrait" initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.3, ease }}>
      <div className="portrait-glow" />
      <span className="hud tl" /><span className="hud tr" />
      <img src="/img/portrait.webp" alt="Shrikant Rathod" width="900" height="856" />
      <div className="scan" aria-hidden="true" />

      <motion.div className="chip c1" {...bob(0)}><span className="dot" /> Open to work</motion.div>
      <motion.div className="chip c2" {...bob(1.2, 6)}><b>{'{ }'}</b> MERN · FastAPI</motion.div>
      <motion.div className="chip c3" {...bob(2.1, 5.5)}><b>⌖</b> Kolhapur, IN</motion.div>
      <motion.div className="term" {...bob(0.6, 7)} aria-hidden="true">
        <p><i>$</i> whoami</p>
        <p>shrikant.rathod</p>
        <p><i>role</i> full-stack dev</p>
        <p><i>grad</i> 2027 · CSE</p>
        <p><i>status</i> shipping<span className="caret">_</span></p>
      </motion.div>
    </motion.div>
  );
}

// Live, scaled-down view of the deployed site in a browser frame (or its screenshot when the site blocks framing).
// Click opens the real site.
function LivePreview({ p, live }) {
  return (
    <motion.a className="live" href={p.live} target="_blank" rel="noopener"
      whileHover={{ y: -6 }} transition={{ duration: 0.4, ease }} aria-label={`Open ${p.name} live`}>
      <div className="live-bar">
        <i /><i /><i />
        <span>{(p.embed || p.live).replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
        {live && <b className="live-badge">● Live</b>}
      </div>
      <div className="live-view">
        {live
          ? <iframe src={p.embed} title={`${p.name} live preview`} loading="lazy" tabIndex={-1} scrolling="no" />
          : ['light', 'dark'].map(t => <img key={t} className={`shot-${t}`} src={p.shot[t]} alt={`${p.name} homepage`} loading="lazy" />)}
        <span className="live-open">Open live site ↗</span>
      </div>
    </motion.a>
  );
}

// Asks our API whether the site's headers allow framing; null while checking.
function useFrameable(url) {
  const [ok, setOk] = useState(url ? null : false);
  useEffect(() => {
    if (!url) return;
    fetch(`/api/frameable?url=${encodeURIComponent(url)}`)
      .then(r => r.json()).then(d => setOk(!!d.ok)).catch(() => setOk(false));
  }, [url]);
  return ok;
}

function Project({ p, i }) {
  const live = useFrameable(p.embed) === true;
  const showPreview = live || !!p.shot;
  return (
    <motion.article className={`project ${showPreview ? '' : 'solo'}`} {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
      <div className="project-meta">
        <span className="idx">P-{String(i + 1).padStart(2, '0')}</span>
        <span>{p.kind}</span>
      </div>
      {showPreview && <LivePreview p={p} live={live} />}
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
  const sent = state.status === 'sent';
  const field = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
  return (
    <motion.form className="form message-panel" onSubmit={submit} variants={blurIn}
      initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
      <motion.div className="message-head" variants={field}>
        <h3>Contact me to build your next project</h3>
        <p>Hiring for a full-stack or data role, or have a project in mind? I usually reply within a day.</p>
      </motion.div>

      {/* on success the fields fold away and the button slides up into a confirmation */}
      <AnimatePresence initial={false}>
        {!sent && (
          <motion.div className="message-fields" key="fields"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
            exit={{ opacity: 0, height: 0, filter: 'blur(8px)', transition: { duration: 0.5, ease } }}>
            <motion.label variants={field}>Name<input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" /></motion.label>
            <motion.label variants={field}>Email<input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@company.com" /></motion.label>
            <motion.label variants={field} className="wide">Message<textarea name="message" rows={5} required maxLength={2000} placeholder="Tell me about the role or project…" /></motion.label>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button layout className={`btn submit ${sent ? 'done' : ''}`} variants={field}
        type={sent ? 'button' : 'submit'} disabled={state.status === 'sending'}
        onClick={sent ? () => setState({ status: 'idle', msg: '' }) : undefined}
        whileTap={{ scale: 0.97 }} transition={{ layout: { duration: 0.5, ease } }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={state.status} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}>
            {sent ? '✓ Message sent — send another?' : state.status === 'sending' ? 'Sending…' : 'Send message →'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      {state.msg && <p className={`form-msg ${state.status}`} role="status">{state.msg}</p>}
    </motion.form>
  );
}

// Tilted social pills that drop into the panel; drag them around for fun.
const pills = [
  { label: 'Hire me!', href: `mailto:${contact.email}?subject=Job%20opportunity`, x: 34, y: 8, r: -6 },
  { label: '👋', x: 70, y: 6, r: 12 },
  { label: 'GitHub', href: contact.github, x: 8, y: 34, r: 14 },
  { label: 'LinkedIn', href: contact.linkedin, x: 48, y: 36, r: -4 },
  { label: 'Email', href: `mailto:${contact.email}`, x: 14, y: 62, r: -10 },
  { label: 'Résumé', href: '/Shrikant_Rathod_CV_FullStack.pdf', x: 44, y: 64, r: 8 },
  { label: 'Call', href: `tel:${contact.phone.replace(/\s/g, '')}`, x: 74, y: 40, r: -14 },
];

function Pills() {
  const box = useRef(null), dragged = useRef(false);
  const inView = useInView(box, { once: true, margin: '-60px' });
  return (
    <motion.div className="pills" ref={box} variants={blurIn}>
      {pills.map((p, i) => (
        <motion.a key={p.label} className="social-pill" href={p.href}
          target={p.href?.startsWith('http') ? '_blank' : undefined} rel="noopener"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          // watch the panel, not the pill: pills start clipped above it, so their own whileInView never fires
          initial="hidden" animate={inView ? 'show' : 'hidden'}
          variants={{
            hidden: { y: -320, rotate: 0, opacity: 0 },
            show: { y: 0, rotate: p.r, opacity: 1, transition: { type: 'spring', stiffness: 160, damping: 13, delay: 0.4 + i * 0.09 } },
          }}
          drag dragConstraints={box} dragElastic={0.2} whileDrag={{ scale: 1.08, zIndex: 5 }}
          onDragStart={() => { dragged.current = true; }}
          onClick={e => { if (dragged.current || !p.href) e.preventDefault(); dragged.current = false; }}>
          {p.label}
        </motion.a>
      ))}
    </motion.div>
  );
}

export default function App() {
  const [entered, setEntered] = useState(() => !!location.hash);
  const enter = () => { setEntered(true); scrollTo(0, 0); };
  return (
    <>
      <Background />
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
      <section className="intro" data-scene="sphere">
        <div className="intro-text">
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
        </div>
        <Portrait />
      </section>
      <div className="marquee"><LogoRow items={featured} /></div>
      <main>
        <Section id="work" index="01" title="Selected work" scene="wave">
          <div className="projects">{projects.map((p, i) => <Project key={p.name} p={p} i={i} />)}</div>
        </Section>

        <Section id="stack" index="02" title="Tech stack" scene="helix">
          <motion.div className="logo-rows" {...reveal}>
            <LogoRow items={featured} />
            <LogoRow items={featured2} reverse />
          </motion.div>
          {/* bento grid: cards fade in from a soft blur, one after another */}
          <motion.div className="bento" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
            <motion.div className="card bento-intro" variants={blurIn}>
              <h3>Wanna see<br />my toolkit?</h3>
              <p>The languages, frameworks and tools I use to ship production apps.</p>
              <a className="btn pill small" href="#contact">Let’s talk →</a>
            </motion.div>
            {skills.map(s => (
              <motion.div className="card" key={s.group} variants={blurIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}>
                <h4>{s.group}</h4>
                <div className="tags">{s.items.map(t => <Tag key={t} name={t} />)}</div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section id="about" index="03" title="About & credentials" scene="torus">
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

        <Section id="contact" index="04" title="Let’s build something" scene="stars">
          <ContactForm />
          <motion.div className="connect" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}>
            <motion.div className="card connect-card" variants={blurIn}>
              <h3>Let’s connect<br />and chat</h3>
              <ul className="contact-list">
                <li><span>Email</span><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
                <li><span>Phone</span><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
                <li><span>Based in</span>{contact.location}</li>
              </ul>
            </motion.div>
            <Pills />
          </motion.div>
        </Section>
      </main>
      <footer>© 2026 Shrikant Rathod · Built with MongoDB, Express, React &amp; Node</footer>
    </motion.div>
  );
}
