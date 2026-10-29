// Express app: runs locally via server.js, and as a Vercel serverless function in production.
import express from 'express';
import mongoose from 'mongoose';

const Message = mongoose.models.Message || mongoose.model('Message', new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 200 },
  message: { type: String, required: true, maxlength: 2000 },
}, { timestamps: true }));

let conn; // reused across serverless invocations
const connect = () => (conn ??= mongoose.connect(process.env.MONGODB_URI));

const app = express();
app.use(express.json({ limit: '10kb' }));

// ponytail: in-memory rate limit, per instance only; use Upstash/Redis if spam becomes real
const hits = new Map();
app.post('/api/contact', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 60_000);
  if (recent.length >= 3) return res.status(429).json({ error: 'Too many messages, try again in a minute.' });
  hits.set(ip, [...recent, now]);

  const { name, email, message } = req.body || {};
  if (![name, email, message].every(v => typeof v === 'string' && v.trim()))
    return res.status(400).json({ error: 'All fields are required.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Please enter a valid email.' });
  if (!process.env.MONGODB_URI)
    return res.status(503).json({ error: 'Contact form is not configured yet. Please email me directly.' });

  try {
    await connect();
    await Message.create({ name: name.trim(), email: email.trim(), message: message.trim() });
    res.status(201).json({ ok: true });
  } catch (e) {
    conn = undefined;
    console.error(e);
    res.status(500).json({ error: 'Could not send right now. Please email me directly.' });
  }
});

export default app;
