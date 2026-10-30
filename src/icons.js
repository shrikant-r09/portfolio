import {
  SiJavascript, SiTypescript, SiPython, SiReact, SiHtml5, SiCss, SiFramer, SiNodedotjs, SiExpress,
  SiFastapi, SiJsonwebtokens, SiGoogle, SiMongodb, SiGooglegemini, SiGit, SiGithub, SiDocker,
  SiVercel, SiRazorpay, SiPandas, SiNumpy, SiScikitlearn, SiFlutter, SiDart,
} from 'react-icons/si';
import {
  TbSql, TbApi, TbGauge, TbDatabaseSearch, TbBrain, TbScan, TbMessageCode, TbPlugConnected,
  TbChartLine, TbChartBar, TbFileSpreadsheet, TbChartPie, TbLanguage, TbCode,
} from 'react-icons/tb';

// Tech name (as written in data.js) → icon. Unlisted names fall back to a generic code icon.
const icons = {
  JavaScript: SiJavascript, TypeScript: SiTypescript, Python: SiPython, SQL: TbSql,
  React: SiReact, HTML: SiHtml5, CSS: SiCss, 'Framer Motion': SiFramer,
  'Node.js': SiNodedotjs, 'Express.js': SiExpress, Express: SiExpress, FastAPI: SiFastapi,
  REST: TbApi, JWT: SiJsonwebtokens, 'Google OAuth': SiGoogle, 'Rate limiting': TbGauge,
  MongoDB: SiMongodb, 'Atlas Vector Search': TbDatabaseSearch,
  RAG: TbBrain, 'Gemini API': SiGooglegemini, Gemini: SiGooglegemini, OCR: TbScan,
  'Text-to-SQL': TbSql, 'Prompt engineering': TbMessageCode, NLP: TbLanguage, LLMs: TbBrain,
  Git: SiGit, GitHub: SiGithub, Docker: SiDocker, Vercel: SiVercel, LiteLLM: TbPlugConnected, Razorpay: SiRazorpay,
  Pandas: SiPandas, NumPy: SiNumpy, Matplotlib: TbChartLine, 'Scikit-learn': SiScikitlearn,
  Tableau: TbChartBar, Excel: TbFileSpreadsheet, 'Power BI': TbChartPie,
  Flutter: SiFlutter, Dart: SiDart,
};

export const iconFor = name => icons[name] || TbCode;
