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
    // preview appears by itself once this site's headers allow framing (see TEXT_TO_SQL_PREVIEW.md)
    embed: 'https://g52-web.vercel.app/',
    stack: ['Python', 'FastAPI', 'SQL', 'NLP', 'LLMs'],
    points: [
      'Turns plain-English questions into SQL so non-technical users can query a database without writing code.',
      'Validation and hallucination checks block incorrect or unsafe queries before they run.',
      'FastAPI backend handles query execution, error handling and result formatting.',
      'Separate Admin and User interfaces with role-based access.',
    ],
    live: 'https://g52-web.vercel.app/',
  },
  {
    name: 'Plane+: Time Tracking & AI Search',
    kind: 'Open-source extension · Django + React',
    embed: 'https://prathamesh250205.github.io/plane-time-tracking-search/demo/',
    stack: ['Python', 'Django', 'TypeScript', 'React', 'PostgreSQL', 'Docker', 'ONNX', 'Semantic search', 'GitHub Actions'],
    points: [
      'Extended Plane, a large open-source Jira alternative (Django + React monorepo), with per-task time tracking and a person × day timesheet.',
      'New PostgreSQL tables and REST APIs with owner-only edits; timesheet totals by member, task and day are aggregated in SQL.',
      'Self-hosted semantic search microservice (bge-small-en-v1.5 via ONNX): “the app feels sluggish” finds “slow dashboard”, and no data leaves the server.',
      'Embeddings cached by content hash, so a search re-embeds only new or changed tasks, with no background jobs.',
      '16 API contract tests with a fake embedder, and a GitHub Actions pipeline that builds the Docker image; deployed with Docker Compose.',
    ],
    live: 'https://prathamesh250205.github.io/plane-time-tracking-search/demo/',
    code: 'https://github.com/Prathamesh250205/plane-time-tracking-search',
  },
];

export const skills = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL'] },
  { group: 'Frontend', items: ['React', 'HTML', 'CSS', 'Framer Motion'] },
  { group: 'Backend & APIs', items: ['Node.js', 'Express.js', 'FastAPI', 'Django', 'REST', 'JWT', 'Google OAuth', 'Rate limiting'] },
  { group: 'Databases', items: ['MongoDB', 'Atlas Vector Search', 'PostgreSQL', 'SQL'] },
  { group: 'AI & NLP', items: ['RAG', 'Gemini API', 'OCR', 'Text-to-SQL', 'Prompt engineering'] },
  { group: 'DevOps & Tools', items: ['Git', 'GitHub', 'GitHub Actions', 'Docker', 'Vercel', 'LiteLLM', 'Razorpay'] },
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
