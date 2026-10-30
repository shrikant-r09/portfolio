import {
  SiJavascript, SiTypescript, SiPython, SiReact, SiHtml5, SiCss, SiFramer, SiNodedotjs, SiExpress,
  SiFastapi, SiJsonwebtokens, SiGoogle, SiMongodb, SiGooglegemini, SiGit, SiGithub, SiDocker,
  SiVercel, SiRazorpay, SiPandas, SiNumpy, SiScikitlearn, SiFlutter, SiDart, SiMysql,
  SiDjango, SiPostgresql, SiOnnx, SiGithubactions, SiClaude,
} from 'react-icons/si';
import {
  TbApi, TbGauge, TbDatabaseSearch, TbBrain, TbScan, TbMessageCode, TbPlugConnected,
  TbChartLine, TbChartBar, TbFileSpreadsheet, TbChartPie, TbLanguage, TbCode,
} from 'react-icons/tb';

// Tech name (as written in data.js) → [icon, official brand color].
// null color = brand is black/near-black, so it follows the theme's text color instead.
const icons = {
  JavaScript: [SiJavascript, '#F7DF1E'], TypeScript: [SiTypescript, '#3178C6'], Python: [SiPython, '#3776AB'],
  SQL: [SiMysql, '#4479A1'],
  React: [SiReact, '#61DAFB'], HTML: [SiHtml5, '#E34F26'], CSS: [SiCss, '#1572B6'], 'Framer Motion': [SiFramer, '#0055FF'],
  'Node.js': [SiNodedotjs, '#5FA04E'], 'Express.js': [SiExpress, null], Express: [SiExpress, null], FastAPI: [SiFastapi, '#009688'],
  REST: [TbApi, '#FF6C37'], JWT: [SiJsonwebtokens, '#FB015B'], 'Google OAuth': [SiGoogle, '#4285F4'], 'Rate limiting': [TbGauge, '#F59E0B'],
  MongoDB: [SiMongodb, '#47A248'], 'Atlas Vector Search': [TbDatabaseSearch, '#00ED64'],
  RAG: [TbBrain, '#A78BFA'], 'Gemini API': [SiGooglegemini, '#8E75B2'], Claude: [SiClaude, '#D97757'], Gemini: [SiGooglegemini, '#8E75B2'], OCR: [TbScan, '#38BDF8'],
  'Text-to-SQL': [SiMysql, '#4479A1'], 'Prompt engineering': [TbMessageCode, '#F472B6'], NLP: [TbLanguage, '#34D399'], LLMs: [TbBrain, '#A78BFA'],
  Git: [SiGit, '#F05032'], GitHub: [SiGithub, null], Docker: [SiDocker, '#2496ED'], Vercel: [SiVercel, null],
  LiteLLM: [TbPlugConnected, '#22D3EE'], Razorpay: [SiRazorpay, '#3395FF'],
  Pandas: [SiPandas, '#E70488'], NumPy: [SiNumpy, '#4DABCF'], Matplotlib: [TbChartLine, '#11557C'], 'Scikit-learn': [SiScikitlearn, '#F7931E'],
  Tableau: [TbChartBar, '#E97627'], Excel: [TbFileSpreadsheet, '#217346'], 'Power BI': [TbChartPie, '#F2C811'],
  Flutter: [SiFlutter, '#02569B'], Dart: [SiDart, '#0175C2'],
  Django: [SiDjango, '#44B78B'], PostgreSQL: [SiPostgresql, '#4169E1'], ONNX: [SiOnnx, null], 'GitHub Actions': [SiGithubactions, '#2088FF'],
  'Semantic search': [TbDatabaseSearch, '#00ED64'],
};

export const iconFor = name => icons[name] || [TbCode, null];
