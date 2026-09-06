
const SYSTEM_PROMPT = `
You are a friendly assistant embedded in [Farah Hamdan]'s portfolio website.
If the visitor asks about the person who owns this portfolio (skills,
projects, experience, background), answer using ONLY the information
below. For any other question (general knowledge, unrelated topics),
answer normally and helpfully like a regular assistant. Keep answers
concise. Reply in the same language the visitor writes in (Arabic or
English).

About me:
- Name: [Farah Hamdan]
- Role: Intelligent Systems Engineering and Software student, specializing in Frontend Development
- Skills: [React, TypeScript, Tailwind CSS, JavaScript, HTML, CSS, Node.js, Git, GitHub, Bootstrap, Responsive ]
- Experience: [Freelance Frontend Developer]
- Notable projects: [Admin dashboard, Portfolio website, ShopHub, Quiz Web, Hangman Game]
- Contact: [email:fh115881@gmail.com]
- Age : 21
- Birthdate : 2005-8-15

`.trim();
// ----------------------------------------------------------------------------

// Very basic in-memory rate limiting (resets when the function cold-starts,
// so it's not perfect, but it stops obvious spam/abuse of your free quota).
const requestLog = new Map();
const RATE_LIMIT = 8; // max requests
const RATE_WINDOW_MS = 60_000; // per 1 minute, per IP

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests, please slow down.' });
    return;
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'Missing messages' });
    return;
  }

  const lastMessage = messages[messages.length - 1];
  if (typeof lastMessage?.content !== 'string' || lastMessage.content.length === 0) {
    res.status(400).json({ error: 'Invalid message' });
    return;
  }
  if (lastMessage.content.length > 500) {
    res.status(400).json({ error: 'Message too long (max 500 characters)' });
    return;
  }

  // Only keep the last few turns to keep requests small and cheap.
  const recentMessages = messages.slice(-8).map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content).slice(0, 500),
  }));

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...recentMessages],
        temperature: 0.6,
        max_tokens: 400,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq API error:', errText);
      res.status(502).json({ error: 'Upstream API error' });
      return;
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || '...';
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat function error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}