export const contact = {
  email: 'snrathod988@gmail.com',
  phone: '+91 93568 96903',
  linkedin: 'https://www.linkedin.com/in/shrikant-rathod-8969snr99/',
  github: 'https://github.com/shrikant-r09',
  location: 'Kolhapur, Maharashtra',
};

export const projects = [
  {
    name: 'StudyMate AI',
    kind: 'AI-powered study assistant · MERN',
    embed: 'https://studymate-ai-tutor.vercel.app/', // live landing page shown in the card (site allows framing)
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini', 'Atlas Vector Search', 'Docker', 'LiteLLM', 'Razorpay'],
    points: [
      'RAG tutor that answers only from a student’s own notes and cites the source page — Gemini embeddings + Atlas Vector Search.',
      'Uploads PDF, Word, PowerPoint, text and images, with Gemini OCR for handwritten and scanned notes.',
      'Quiz generator with server-side validation and auto-grading; flags weak topics when the last three attempts average under 70%.',
      'Token billing on an atomic usage ledger; Razorpay (card, UPI, QR) verified with HMAC signatures.',
      'JWT + Google OAuth, password reset, rate limiting; Dockerized LiteLLM proxy pools API keys and retries failures.',
    ],
    live: 'https://studymate-ai-tutor.vercel.app/login',
    code: 'https://github.com/Study-Mate-AI/StudyMate-AI',
  },
  {
    name: 'AI Text-to-SQL System',
    kind: 'Final-year major project · FastAPI',
    // add  embed: 'https://g52-web.vercel.app/',  once the site allows framing (it sends X-Frame-Options: DENY today)
    stack: ['Python', 'FastAPI', 'SQL', 'NLP', 'LLMs'],
    points: [
      'Turns plain-English questions into SQL so non-technical users can query a database without writing code.',
      'Validation and hallucination checks block incorrect or unsafe queries before they run.',
      'FastAPI backend handles query execution, error handling and result formatting.',
      'Separate Admin and User interfaces with role-based access.',
    ],
    live: 'https://g52-web.vercel.app/',
  },
];

export const skills = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL'] },
  { group: 'Frontend', items: ['React', 'HTML', 'CSS', 'Framer Motion'] },
  { group: 'Backend & APIs', items: ['Node.js', 'Express.js', 'FastAPI', 'REST', 'JWT', 'Google OAuth', 'Rate limiting'] },
  { group: 'Databases', items: ['MongoDB', 'Atlas Vector Search', 'SQL'] },
  { group: 'AI & NLP', items: ['RAG', 'Gemini API', 'OCR', 'Text-to-SQL', 'Prompt engineering'] },
  { group: 'DevOps & Tools', items: ['Git', 'GitHub', 'Docker', 'Vercel', 'LiteLLM', 'Razorpay'] },
  { group: 'Data Analysis', items: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Tableau', 'Excel', 'Power BI'] },
];

export const certs = [
  { date: '2026', title: 'Data Analysis with Python', by: 'IBM · Cognitive Class' },
  { date: '2026', title: 'Data Analytics Job Simulation', by: 'Deloitte Australia · Forage' },
  { date: '2025', title: 'Data Science Workshop', by: 'Techfest 2025 · IIT Bombay' },
  { date: 'Aug 2025', title: 'Mini Data Analytics Bootcamp', by: 'MLSA · 4 days, 2 projects' },
];

export const leadership = [
  { title: 'E-Cell, DYPCET', text: 'Led video and promotional content for Eureka, Illuminate and the Inspire Program; contributed to First-Year Orientation.' },
  { title: 'Photography Club, DYPCET', text: 'Coordinated club activities and photography workshops for students.' },
];
