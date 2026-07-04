// Rate limiter: 10 requests per 60 seconds per IP
const rateLimitMap = new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60_000;
  const maxReqs = 10;
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }
  const entry = rateLimitMap.get(ip);
  if (now - entry.start > windowMs) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }
  if (entry.count >= maxReqs) return false;
  entry.count++;
  return true;
}
// Clean rate limit map every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.start > 120_000) rateLimitMap.delete(ip);
  }
}, 300_000);

// Simple response cache
const responseCache = new Map();
const CACHE_TTL = 10 * 60_000; // 10 minutes
function getCached(key) {
  const entry = responseCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) { responseCache.delete(key); return null; }
  return entry.value;
}
function setCache(key, value) {
  if (responseCache.size > 50) {
    const oldest = [...responseCache.entries()].sort((a, b) => a[1].ts - b[1].ts)[0];
    responseCache.delete(oldest[0]);
  }
  responseCache.set(key, { value, ts: Date.now() });
}

const GREETINGS = new Set(['hi', 'hello', 'hey', 'salam', 'assalam', 'assalamu', 'السلام', 'helo', 'hii', 'hiii', 'yo', 'sup', 'howdy']);
function isGreeting(msg) {
  const normalized = msg.trim().toLowerCase().replace(/[!?.،,]+$/, '');
  return GREETINGS.has(normalized) || normalized.length < 6 && GREETINGS.has(normalized);
}

const SYSTEM_PROMPT = `You are an AI assistant representing Muhammad Ali Sajid on his personal portfolio website. You speak on his behalf — use first person when appropriate — and help visitors learn about him, his work, skills, and how to hire him.

## About Muhammad Ali Sajid

Muhammad Ali Sajid is a Shopify Developer and co-founder of Creatify, a freelance agency based in Multan, Pakistan. He is a BS Accounting & Finance student at Bahauddin Zakariya University (BZU) Multan (2025–Present, 2nd semester), pursuing CMA (Certified Management Accountant) certification.

## Professional Work

**Shopify Development (Creatify, 2025–Present)**
- Builds custom Shopify stores for local and international clients
- Specializes in Liquid development, Dawn theme customization, conversion rate optimization (CRO)
- Services: custom theme dev, landing pages, app integrations, WhatsApp integrations, review/social-proof systems
- Notable clients: Maje.ae (luxury UAE fashion), Rhode Skin (Hailey Bieber's DTC beauty brand), Caliphe Clothing (Pakistani activewear)

**Technical Skills**
- Shopify: Liquid, Dawn/Kalles/Blush/Ecomus themes, Section Schema, Shopify CLI, GitHub workflows
- Frontend: HTML, CSS, JavaScript (Vanilla), React, TypeScript, Tailwind CSS
- Finance tools: MS Excel (financial modeling, pivot tables, VLOOKUP), Power BI, QuickBooks, Xero, Zoho Books
- Accounting: Financial accounting, cost accounting, bookkeeping, financial analysis, Pakistan tax framework (FBR)

**Finance Projects**
- Finance KPIs Dashboard (Power BI + Excel)
- Budget & Forecasting Model (Excel, scenario analysis)
- Sales Performance Analytics Dashboard
- Small Business Bookkeeping System

## Education & Achievements
- BS Accounting & Finance — BZU Multan (2025–Present)
- Pursuing CMA certification
- Self-taught developer — built real client stores for international brands
- Co-founded Creatify agency while still a student
- 15+ technical blog posts on Shopify, SEO, HTML, Excel

## Personal Side
- From Multan, Pakistan — "Multan raised me practical"
- Loves chess — strategic thinking mirrors client problem-solving
- Interested in Islamic history and golden age of Islamic civilization
- Writes Urdu blog posts — influenced by Urdu poetry and Quranic reflection
- Cares deeply about design: typography, layout, well-built pages

## Contact & Links
- Email: m.alibhatti1465@gmail.com
- WhatsApp: wa.me/923123626704
- LinkedIn: linkedin.com/in/muhammad-ali-sajid
- GitHub: github.com/alibhatti23
- Instagram: instagram.com/ali.bhatti_ig
- Resume: available on portfolio site

## Behavior Rules
- Be friendly, professional, concise
- Answer questions about Muhammad Ali's skills, projects, experience, availability, and how to hire him
- If asked about pricing, say rates are discussed per-project — contact via email or WhatsApp
- If something is outside your knowledge, say so honestly — don't guess
- Do NOT discuss unrelated topics (politics, general coding help not related to Muhammad Ali, etc.)
- Keep responses under 200 words unless the visitor asks for detail`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const { message, history = [] } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }
  if (message.length > 1000) {
    return res.status(400).json({ error: 'Message too long (max 1000 characters)' });
  }

  // Quick greeting response
  if (isGreeting(message)) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const greeting = "Assalamu Alaikum! 👋 I'm Ali's AI assistant. Ask me anything about Muhammad Ali Sajid — his Shopify work, skills, projects, or how to get in touch!";
    res.write(`data: ${JSON.stringify({ text: greeting })}\n\n`);
    res.write('data: [DONE]\n\n');
    return res.end();
  }

  // Cache check (skip if has history — context-dependent)
  const cacheKey = message.trim().toLowerCase();
  if (history.length === 0) {
    const cached = getCached(cacheKey);
    if (cached) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.write(`data: ${JSON.stringify({ text: cached })}\n\n`);
      res.write('data: [DONE]\n\n');
      return res.end();
    }
  }

  const contents = [
    ...history.slice(-8).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    { role: 'user', parts: [{ text: message.trim() }] },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.7,
          topP: 0.9,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }),
    });

    clearTimeout(timeout);

    if (!upstream.ok) {
      const err = await upstream.json().catch(() => ({}));
      console.error('Gemini error:', JSON.stringify(err));
      const msg = err?.error?.message || 'AI service error. Please try again.';
      return res.status(502).json({ error: msg });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            fullResponse += text;
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        } catch { /* skip malformed chunks */ }
      }
    }

    // Cache single-turn responses
    if (history.length === 0 && fullResponse) {
      setCache(cacheKey, fullResponse);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    clearTimeout(timeout);
    console.error('Chat handler error:', err);
    if (err.name === 'AbortError') {
      if (!res.headersSent) return res.status(504).json({ error: 'Request timed out. Please try again.' });
    }
    if (!res.headersSent) {
      res.status(500).json({ error: 'Something went wrong. Please try again.' });
    } else {
      res.end();
    }
  }
}
