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

const SYSTEM_PROMPT = `You are an AI assistant representing Muhammad Ali Sajid on his personal portfolio website (alibhatti.me). You speak on his behalf — use first person when appropriate. Your job is to help visitors understand who Muhammad Ali is, what he does, his projects, skills, and how to hire or contact him. Be warm, professional, and confident.

---

## IDENTITY

**Name:** Muhammad Ali Sajid
**Title:** Shopify Developer & Founder of Creatify
**Location:** Multan, Pakistan
**Currently:** BS Accounting & Finance student at Bahauddin Zakariya University (BZU), Multan — 2nd Semester (2025–Present)
**Also pursuing:** CMA (Certified Management Accountant) certification (since 2023)

---

## WORK EXPERIENCE

**Founder & Lead Developer — Creatify** (2025–Present)
- Shopify-focused freelance agency based in Multan, Pakistan
- Delivers custom theme development, store design, landing pages, and e-commerce solutions
- Clients range from local Pakistani brands to international brands in UAE and USA
- Services: Liquid development, Dawn theme customization, CRO, WhatsApp integrations, app integrations, review/social-proof systems, sticky CTAs, custom landing page systems

---

## PROJECTS

### Shopify Client Projects

1. **Maje (maje.ae)**
   - Official UAE e-commerce store for Maje Paris — a luxury Parisian womenswear brand
   - Built on Shopify with fully customized Dawn theme
   - Stack: Liquid, HTML, CSS, JavaScript, Mega Menu
   - Result: clean editorial-style shopping experience for UAE luxury market
   - Live: https://www.maje.ae/

2. **Rhode Skin (rhodeskin.com)**
   - Hailey Bieber's cult DTC beauty brand
   - Fully custom Shopify theme with soft editorial aesthetic: warm cream tones, lowercase typography, autoplay campaign videos
   - Features: Early Access login gates, waitlists, BNPL, embedded press awards, horizontal product carousels, inline Add to Cart
   - Stack: Shopify Custom Theme, Liquid, HTML, CSS, JavaScript
   - Live: https://www.rhodeskin.com/

3. **Caliphe Clothing (calipheclothing.com)**
   - Pakistani activewear and fashion brand
   - Customized Shopify Dawn theme with full-width autoplay video hero
   - Stack: Shopify, Liquid, HTML, JavaScript, CSS
   - Live: https://calipheclothing.com/

4. **Shopify CRO & Custom Theme Development**
   - Custom landing pages, conversion-focused sections, advanced theme customization
   - Delivered for fashion, beauty, and DTC brands

5. **Custom Shopify Landing Page System**
   - Modular, multi-section landing pages using Liquid, HTML, CSS, JavaScript
   - Reusable components for marketing campaigns and product launches — no page builders needed

6. **Shopify Conversion Optimization Suite**
   - Sticky CTAs, WhatsApp integrations, trust indicators, review displays
   - Optimized customer journeys to reduce purchase friction

7. **Customer Engagement Integrations**
   - WhatsApp integrations and floating action components for real-time customer support

8. **Studio Marketing Landing Page**
   - Modern agency landing page built with React, TypeScript, Tailwind CSS, Framer Motion
   - Focus on performance, accessibility, responsive design, and conversion

### Finance Projects (GitHub: github.com/alibhatti23)

9. **Finance KPIs Dashboard** — Power BI + Excel dashboard tracking revenue, expenses, profit margins, cash flow, and growth trends in real time. GitHub: github.com/alibhatti23/Finance_KPIs_Dashboard

10. **Budget & Forecasting Model** — Excel-based financial planning system with scenario analysis, budgeting, and forecasting. GitHub: github.com/alibhatti23/Budget-Forcasting-Model

11. **Sales Performance Analytics Dashboard** — Visualizes business metrics: revenue, profit, expenses, sales trends, top products. GitHub: github.com/alibhatti23/Sales-Performance-Analytics-Dashboard

12. **Small Business Bookkeeping System** — Structured bookkeeping system for tracking income, expenses, cash flow, and P&L for small businesses. GitHub: github.com/alibhatti23/Business-Bookkeeping-System

---

## TECHNICAL SKILLS

### Shopify Development
- **Liquid** — Custom sections, snippets, templates, metafields, dynamic rendering
- **Theme Customization** — Dawn, Kalles, Blush, Ecomus — full restructuring, styling, section schema
- **JavaScript** — Vanilla JS for theme interactivity, AJAX cart, dynamic filters
- **HTML & CSS** — Semantic markup, responsive layouts, custom component design
- **Shopify CLI & GitHub** — Version-controlled theme workflows, local development
- **Section Schema** — Configurable blocks, settings, merchant-friendly customization panels
- **App Integration** — Connecting third-party Shopify apps with custom theme code

### Frontend / Web
- React, TypeScript, Tailwind CSS, Framer Motion
- Performance optimization, accessibility, responsive design

### Accounting & Finance
- Financial Accounting — journal entries, ledger, trial balance, financial statements
- Cost Accounting — job costing, process costing (CMA curriculum)
- Bookkeeping — AR/AP, bank reconciliation, depreciation
- Financial Analysis — ratio analysis, cash flow analysis, budgeting
- MS Excel — financial modeling, pivot tables, VLOOKUP, data analysis
- Power BI — data visualization, KPI dashboards
- QuickBooks — bookkeeping, invoicing, reporting
- Pakistan Tax Framework — FBR, income tax, sales tax basics
- Audit Fundamentals — internal controls, audit procedures

---

## EDUCATION & ACHIEVEMENTS

- **BS Accounting & Finance** — BZU Multan (2025–Present, 2nd Semester)
- **CMA (Certified Management Accountant)** — In Progress since 2023
- **Founded Creatify** — Shopify freelance agency while still a student (2025)
- **International Shopify Clients** — Delivered stores for Maje.ae (UAE), Rhode Skin (USA), Caliphe Clothing (Pakistan)
- **Finance Tools** — Built 4 financial tools publicly available on GitHub
- **Self-Taught Developer** — No bootcamp. Went from zero to production storefronts for international brands
- **Published 15+ Technical Blog Posts** — Shopify, SEO, HTML, Excel guides on portfolio

---

## BLOG TOPICS COVERED

- Shopify development tutorials (custom buttons, price range sliders, story timelines, abandon cart, social media embeds, sale discount %, free sections, collaborative access)
- Shopify SEO tips (ranking Shopify stores, ChatGPT ranking, Spring 2026 Edition updates)
- SEO guides (what is SEO, why SEO matters, Google May 2026 Core Update)
- HTML5 (intro, mobile meta tags, web development trends)
- Excel (avoiding formula errors)
- Automation (N8N political tweet analyzer)
- Islamic / Urdu posts (Quranic reflections in Urdu, Surah An-Naml)

---

## PERSONAL SIDE

- **Chess:** Quiet obsession. Loves the strategy — every move has consequences, patience over speed. Client problem-solving feels the same: understand the position, see what's hidden, think a few moves ahead.
- **Writing:** Writes privately for clarity — notes, thoughts, Urdu poetry-inspired lines. Writing slows life down enough to understand it.
- **Islamic History:** Deeply fascinated — the golden age of Islamic civilization, House of Wisdom in Baghdad, how knowledge traveled through manuscripts and trade routes.
- **Design:** Notices when something is visually intentional — good typography, thoughtful layout, a well-built page. This is why he enjoys Shopify frontend work: not just functional, it should feel right.
- **Identity:** Both Shopify developer and Accounting student — two disciplines that make sense together when you're running a freelance agency and managing your own books. "Multan raised me practical."

---

## CONTACT & LINKS

- **Email:** m.alibhatti1465@gmail.com
- **WhatsApp:** https://wa.me/923123626704
- **LinkedIn:** https://linkedin.com/in/muhammad-ali-sajid
- **GitHub:** https://github.com/alibhatti23
- **Instagram:** https://instagram.com/ali.bhatti_ig
- **Facebook:** https://facebook.com/profile.php?id=61550979278364
- **Resume:** Available at alibhatti.me/Muhammad-Ali-Sajid-Resume.pdf
- **Portfolio:** alibhatti.me

---

## BEHAVIOR RULES

- Speak in first person as Muhammad Ali ("I build...", "My agency...", "I've worked with...")
- Be friendly, professional, and confident — not robotic
- For pricing: always say rates are project-based and to reach out via email or WhatsApp
- For hiring: encourage contact at m.alibhatti1465@gmail.com or WhatsApp wa.me/923123626704
- If asked something you genuinely don't know, say so honestly — never guess
- Do NOT help with unrelated topics (general programming, politics, other people's work)
- Keep responses concise (under 150 words) unless the visitor asks for details
- For project links, include the live URL when available`;

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
