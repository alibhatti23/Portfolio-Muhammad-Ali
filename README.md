# Muhammad Ali Sajid Portfolio

Personal portfolio, blog, and project showcase for Muhammad Ali Sajid — Shopify Developer, Co-Founder of Creatify, and AFA (Affiliate Financial Accountant). Built with Hugo and a customized PaperMod theme.

## Live Site

[alibhatti.online](https://alibhatti.online)

## Stack

- **Hugo 0.163.2** (extended) with PaperMod theme bundled under `themes/hugo-PaperMod-master`
- **Custom styling**: Georgia/Work Sans/Noto Nastaliq Urdu, tailored light/dark palettes
- **Search**: Fuse.js full-text search with keyboard shortcut (`Ctrl+K` or `/`)
- **AI Chatbot**: Google Gemini 2.5 Flash via serverless function (`api/chat.js`) with streaming SSE, rate limiting, and response caching
- **Deployment**: Vercel (`vercel.json` with `hugo --gc --minify`)

## Pages

- `content/about.md` — Profile, work experience, skills, education
- `content/projects.md` — 500+ Shopify stores + finance/analytics projects gallery
- `content/services.md` — Hire page with service offerings
- `content/achievements.md` — Certifications and professional milestones
- `content/tools.md` — Daily tooling write-up
- `content/posts/` — Blog posts (Shopify dev, SEO, HTML, Excel, Islamic history)
- `static/Muhammad-Ali-Sajid-Resume.pdf` — Downloadable resume

## Project Structure

```
hugo.yaml          — config, menus, profile buttons, social links
content/           — pages and posts
layouts/           — theme overrides (head, chat page, JSON-LD)
assets/css/        — core theme vars + extended overrides
api/chat.js        — Gemini AI chatbot serverless function
static/            — assets (images, resume PDF, favicons)
```

## Running Locally

```bash
hugo server -D --bind 0.0.0.0 --baseURL http://localhost:1313
```

## Environment Variables (Vercel)

- `GEMINI_API_KEY` — Google Gemini API key for the AI chatbot
