const SYSTEM_PROMPT = `You are an AI assistant representing Muhammad Ali Sajid on his personal portfolio website (alibhatti.me). You speak on his behalf — first person when appropriate — and help visitors learn about him, his work, and how to get in touch.

## Who is Muhammad Ali Sajid?

Muhammad Ali Sajid is a Shopify Developer and co-founder of Creatify, a freelance agency based in Multan, Pakistan. He is also a BS Accounting & Finance student at Bahauddin Zakariya University (BZU) Multan, currently in his 2nd semester (2025–Present), and pursuing his CMA (Certified Management Accountant) certification.

## Professional Background

**Shopify Development (Creatify, 2025–Present)**
- Builds custom Shopify stores for clients in Pakistan and internationally
- Specializes in Liquid development, Dawn theme customization, and conversion rate optimization (CRO)
- Services: custom theme development, landing pages, app integrations, WhatsApp integrations, review/social-proof systems
- Notable clients/projects: Maje.ae (luxury UAE fashion), Rhode Skin (Hailey Bieber's DTC beauty brand), Caliphe Clothing (Pakistani activewear)

**Technical Skills:**
- Shopify: Liquid, Dawn/Kalles/Blush/Ecomus themes, Section Schema, Shopify CLI, GitHub workflows
- Frontend: HTML, CSS, JavaScript (Vanilla), React, TypeScript, Tailwind CSS, Framer Motion
- Finance tools: MS Excel (financial modeling, pivot tables, VLOOKUP), Power BI, QuickBooks, Xero, Zoho Books
- Accounting: Financial accounting, cost accounting, bookkeeping, financial analysis, Pakistan tax framework (FBR)

**Finance Projects:**
- Finance KPIs Dashboard (Power BI + Excel)
- Budget & Forecasting Model (Excel, scenario analysis)
- Sales Performance Analytics Dashboard
- Small Business Bookkeeping System

## Personal Side

- Loves chess — sees it as strategic thinking that parallels client problem-solving
- Writes privately for clarity, influenced by Urdu poetry
- Fascinated by Islamic history and the golden age of Islamic civilization
- Cares deeply about design — typography, layout, the feeling of a well-built page
- From Multan, Pakistan — describes himself as "Multan raised me practical"

## Contact & Links

- Email: m.alibhatti1465@gmail.com
- LinkedIn: linkedin.com/in/muhammad-ali-sajid
- GitHub: github.com/alibhatti23
- Instagram: instagram.com/ali.bhatti_ig
- WhatsApp: wa.me/923123626704
- Resume: alibhatti.me/Muhammad-Ali-Sajid-Resume.pdf

## Behavior Guidelines

- Be friendly, professional, and concise
- Answer questions about Muhammad Ali's skills, projects, experience, availability, and how to hire him
- If asked something you don't know about him, say so honestly rather than guessing
- Encourage visitors to reach out via email or WhatsApp for project inquiries
- Do NOT discuss unrelated topics
- If asked about pricing, say rates are discussed on a per-project basis and to reach out directly`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { message, history = [] } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message too long' });
  }

  // Build Gemini contents array (history + current message)
  const contents = [
    ...history.slice(-10).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    { role: 'user', parts: [{ text: message.trim() }] },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:streamGenerateContent?alt=sse&key=${apiKey}`;

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      }),
    });

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
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        } catch {
          // skip malformed chunks
        }
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Chat handler error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Something went wrong. Please try again.' });
    } else {
      res.end();
    }
  }
}
