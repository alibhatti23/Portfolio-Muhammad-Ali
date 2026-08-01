# Muhammad Ali Sajid Portfolio — AI Agent Context

## Project Overview

**Name:** Muhammad Ali Sajid
**Type:** Static portfolio website with AI-powered RAG chat feature
**Stack:** Hugo 0.163.2 (extended) + hugo-PaperMod-master theme + Vercel deployment + Node.js API functions
**Repository:** `D:/Developing/Muhammad-Ali/`
**Live Domain:** alibhatti.online
**GitHub:** https://github.com/alibhatti23/Portfolio-Muhammad-Ali

---

## About the Person

**Muhammad Ali Sajid** is a Shopify Developer and Founder of **Creatify** — a freelance Shopify agency based in Multan, Pakistan. He is also an **AFA (Affiliate Financial Accountant)** through the CMA pathway (17 papers completed) and a BS Accounting & Finance student at **Bahauddin Zakariya University (BZU), Multan**.

- **Role:** Shopify Developer, Founder of Creatify, AFA
- **Location:** Multan, Pakistan
- **Email:** contact@alibhatti.online
- **WhatsApp:** +923123626704
- **LinkedIn:** https://www.linkedin.com/in/muhammad-ali-sajid/
- **Instagram:** @ali.bhatti_ig
- **Availability:** Open for new Shopify projects

**Stats:** 500+ Shopify stores built, 3 international brand clients, 17 CMA papers done, 22+ blog articles.

---

## Project Type & Purpose

Personal portfolio, blog, and services showcase. Also features an AI-powered chat assistant (RAG-based) that answers visitor questions about Ali's background, projects, skills, and services.

Two main parts:
1. **Hugo Static Site** — Portfolio pages, blog posts, projects, achievements, services, contact page
2. **Vercel Serverless API** — RAG chat endpoint (`/api/chat`) powered by Gemini AI and Pinecone vector search

---

## Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                           BROWSER                                  │
│  Portfolio (alibhatti.online)     Chat (/chat/)                   │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
     ┌────────▼──────────────┐    ┌───────────▼───────────┐
     │   Hugo Static Site    │    │  Vercel Serverless    │
     │   (vercel.json)       │    │  API Functions        │
     │   hugo --gc --minify  │    │  /api/chat.js         │
     └───────────────────────┘    │  /api/personal.js     │
                                   │  /api/health.js       │
                                   │  /api/ping.js         │
                                   └───────────┬───────────┘
                                               │
                              ┌────────────────┼────────────────┐
                              │                │                │
                     ┌────────▼────────┐ ┌────▼────┐  ┌────────▼────┐
                     │  Gemini API     │ │Pinecone │  │  Local      │
                     │  (Embeddings +  │ │(Vector  │  │  Fallback   │
                     │   Generation)  │ │ Search) │  │ (embeddings │
                     └─────────────────┘ └─────────┘  │  .json)     │
                                                       └─────────────┘
```

### Technology Stack

| Layer | Technology |
|-------|------------|
| Static Site Generator | Hugo 0.163.2 (extended) |
| Theme | hugo-PaperMod-master (bundled under `themes/hugo-PaperMod-master/`) |
| Deployment | Vercel (`vercel.json` — `hugo --gc --minify`) |
| API Runtime | Vercel Serverless Functions (Node.js) |
| AI - Embeddings | Google Gemini Embedding API (`gemini-embedding-001`) |
| AI - Generation | Google Gemini 2.5 Flash / Flash Lite |
| Vector Search | Pinecone (optional, local fallback available) |
| Contact Form | Formspree (`https://formspree.io/f/xojgaooq`) |
| Search UI | Fuse.js with keyboard shortcut overlay (Ctrl+K or /) |
| Styling | Custom CSS (shadcn/ui-inspired palette) |

---

## Directory Structure

```
Muhammad-Ali/
├── api/                          # Vercel serverless API functions
│   ├── chat.js                   # Main RAG chat handler
│   ├── personal.js               # Personal info endpoint (rewrite: /personal)
│   ├── health.js                 # Health check endpoint
│   ├── ping.js                   # Ping endpoint
│   ├── embeddings.json           # Pre-computed vector embeddings
│   ├── knowledge.json            # RAG knowledge chunks
│   ├── generate-embeddings.js    # Script to regenerate embeddings
│   ├── upload-to-pinecone.js     # Script to upload to Pinecone
│   └── package.json              # Dependencies (Pinecone SDK)
│
├── assets/css/                   # Custom CSS stylesheets
│   ├── core/
│   │   ├── theme-vars.css        # CSS custom properties (light/dark palettes)
│   │   ├── reset.css             # CSS reset
│   │   ├── zmedia.css            # Responsive utilities
│   │   └── license.css
│   ├── common/                   # Component-specific styles
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── post-single.css       # Blog post styling
│   │   ├── post-entry.css        # Post card styling
│   │   ├── archive.css
│   │   ├── profile-mode.css      # Profile landing page
│   │   ├── terms.css
│   │   ├── search.css
│   │   └── 404.css
│   ├── extended/
│   │   ├── code-light.css        # Light mode syntax highlighting
│   │   └── urdu-font.css         # Urdu/Nastaliq typography support
│   └── includes/
│       ├── bg-pattern.css        # Background pattern
│       ├── scroll-bar.css        # Custom scrollbar
│       ├── chroma-styles.css     # Syntax highlighting colors
│       └── chroma-mod.css
│
├── content/                      # Hugo content (markdown)
│   ├── about.md                  # About page: profile card, work, skills, education
│   ├── projects.md               # Projects: 26 Shopify stores + 4 Finance projects
│   ├── achievements.md           # Achievements/certifications page
│   ├── services.md               # Services/Hire Me page (/services/)
│   ├── tools.md                  # Developer setup and tooling
│   ├── contact.md                # Contact page with Formspree form + WhatsApp
│   ├── chat.md                   # AI chat page (layout: "chat")
│   ├── search.md                 # Search page
│   ├── categories/               # Auto-generated category pages
│   └── posts/                    # Blog posts organized by category
│       ├── Excel/                # Excel / finance articles
│       ├── Shopify/              # Shopify development articles
│       ├── HTML-5/               # HTML/web development articles
│       ├── Islamic/              # Islamic history articles
│       │   └── Quran/            # Quran-related posts
│       ├── seo/                  # SEO articles
│       └── assets/               # Post media assets
│
├── layouts/                      # Hugo template overrides
│   ├── _default/
│   │   ├── baseof.html           # Base HTML template
│   │   ├── chat.html             # Chat page layout
│   │   ├── list.html             # List/section pages
│   │   ├── single.html           # Single post template
│   │   ├── search.html           # Search page template
│   │   ├── sitemap.xml           # Custom sitemap template
│   │   └── terms.html            # Tag/category term pages
│   └── partials/
│       ├── header.html           # Site header with nav menu and theme toggle
│       ├── footer.html           # Site footer with code copy buttons
│       ├── head.html             # Head element partial
│       ├── extend_head.html      # Custom head: SEO, JSON-LD, Google Fonts
│       ├── extend_footer.html    # Reading progress bar, WhatsApp float button, Fuse.js search
│       ├── post_meta.html        # Post metadata display
│       ├── svg.html              # SVG icons partial
│       ├── urdu_digits.html      # Urdu digit conversion
│       ├── templates/            # Partial templates directory
│       └── _markup/              # Goldmark render hooks
│
├── static/                       # Static assets (served at root)
│   ├── assets/
│   │   ├── profile-1.webp        # Profile photo
│   │   ├── desktop.webp          # Setup/desktop screenshot
│   │   ├── fav.ico               # Favicon
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── apple-touch-icon.png
│   │   └── projects/             # Project preview screenshots (26 Shopify + 4 Finance)
│   ├── llms.txt                  # AI crawler context file
│   └── Muhammad-Ali-Sajid-Resume.pdf
│
├── themes/
│   └── hugo-PaperMod-master/     # Bundled PaperMod theme (NOT a git submodule)
│
├── docs/
│   └── CONTEXT.md                # This file
│
├── hugo.yml                      # Hugo configuration (menus, params, outputs)
├── vercel.json                   # Vercel build configuration
└── .gitignore
```

---

## Hugo Configuration (`hugo.yml`)

**Key settings:**
- **Base URL:** (empty — Vercel sets it automatically)
- **Theme:** `hugo-PaperMod-master`
- **Hugo Version Required:** 0.163.2 (pinned in `vercel.json`)
- **Default Theme:** `auto` (light/dark based on system preference)
- **Google Analytics:** G-BXW83X7QGX
- **Minify:** Enabled (`minifyOutput: true`)
- **RobotsTXT:** Enabled
- **Custom CSS:** `css/extended/urdu-font.css`, `css/extended/code-light.css`
- **`buildFuture: false`** — posts with future dates are hidden until that date

**Menu Items (nav):** About · Projects · Services · Achievements · Blog · Categories · Contact · Chat · Search

**Profile Mode (homepage):**
- Title: "Muhammad Ali Sajid"
- Subtitle: "Shopify Developer · Co-founder of Creatify · AFA"
- Image: `/assets/profile-1.webp` (120×120)
- Buttons: blogs `/posts/`, tools `/tools/`, resume (PDF)

**Social Icons:** GitHub, LinkedIn, Instagram, Facebook, WhatsApp, Email

**Important:** `ignoreLogs: "warning-goldmark-raw-html"` silences raw HTML warnings.

---

## CSS Styling System

### Theme Variables (`assets/css/core/theme-vars.css`)

shadcn/ui-inspired palette:

**Light Mode:**
```css
--background: #ffffff (or cream variant)
--foreground: #0a0a0a
--primary: #18181b
--secondary: #f4f4f5  (muted grey — nearly invisible on cream, avoid for text)
--accent: #ea580c     (orange — primary CTA color)
--border: #e4e4e7
```

**Dark Mode:**
```css
--background: #0a0a0a
--foreground: #fafafa
--primary: #fafafa
--secondary: #27272a
--accent: #1d4ed8     (blue — primary CTA color in dark mode)
--border: #27272a
```

**Critical rule:** `var(--secondary)` is a muted grey — nearly invisible on the cream/white background. Always use `var(--primary)` for visible text/icons. Use `var(--accent)` for CTA buttons and highlights.

### PaperMod Link Color Override

PaperMod's global CSS sets `.post-content a { color: var(--primary) }`, which overrides button text colors. Any button with custom text color MUST use `color: #fff !important` (and also on `:hover`, `:visited`, `:active` states).

---

## Content Pages

### 1. About (`/about/`)
- Profile card: photo, name, role, bio, available badge, social links
- Stats bar: 500+ Shopify Stores, 3 International Brands, 17 CMA Papers Done, 22+ Blog Articles
- Work experience: Creatify (2025–present, Founder), Finance Tools & Analytics (GitHub open source)
- Skills grid: Shopify Dev, Frontend, Accounting & Finance, Tools & Platforms
- Education: BS Accounting & Finance (BZU Multan), AFA via CMA pathway (17 papers)
- Beyond Work: Chess, Writing, Islamic History, Design
- Contact links at bottom

### 2. Projects (`/projects/`)
- **26 Shopify stores** filterable by category (cloth, skin-care, footwear, coffee, fragrance, jewelry, pet, home-decor, kitchen, apparel, baby, outdoor, bags, tech, fashion, watch, eyewear, sportswear, streetwear)
- **4 Finance & Analytics** projects (Power BI + Excel)
- Two-level filter: Type (All / Shopify / Finance) → Category
- Hover-to-scroll preview images
- **Shopify stores include:** Meow Meow Tweet, Briogeo, Magic Mind, Chamberlain Coffee, Snif, Kate & Kole, Wild One, Maje, Sunday Citizen, Our Place, Negative Underwear, Lalo, Parks Project, Bellroy, Native Union, Kotn, Allbirds, Gharyal, Nureh, Manto, Conatural, Optic World, Iron Gear, Raaz, Vessi, Rhode Skin
- **Finance projects:** Finance KPIs Dashboard, Budget & Forecasting Model, Sales Performance Analytics, Small Business Bookkeeping System (all on GitHub: alibhatti23)

### 3. Achievements (`/achievements/`)
- Certifications and achievements showcase

### 4. Services (`/services/`)
- Hire Me / Services page
- 6 service cards: Shopify Theme Development, Landing Pages, CRO, App Integrations, Finance Tools, Store Setup
- 4-step process section
- "Why Work With Me" section
- CTA box with email and WhatsApp buttons

### 5. Contact (`/contact/`)
- Formspree AJAX form (endpoint: `https://formspree.io/f/xojgaooq`)
- Fields: Name, Email, Subject (dropdown), Message, honeypot
- Success/error states
- Email CTA: contact@alibhatti.online
- WhatsApp CTA: +923123626704

### 6. Chat (`/chat/`)
- Layout: `"chat"`
- AI RAG chat assistant powered by Gemini + Pinecone
- WhatsApp float button is hidden on this page (JS check: `window.location.pathname !== '/chat/'`)

### 7. Tools (`/tools/`)
- Developer setup write-up

### 8. Search (`/search/`)
- Fuse.js powered, keyboard shortcut Ctrl+K or `/`

---

## Blog Posts Structure

Posts are under `content/posts/` organized by category:

| Category | Path | Notes |
|----------|------|-------|
| Shopify | `posts/Shopify/` | Shopify dev tutorials, free sections, tips |
| Excel | `posts/Excel/` | Excel finance articles |
| HTML/Web | `posts/HTML-5/` | Web dev articles |
| Islamic | `posts/Islamic/` | Islamic history; Quran sub-folder |
| SEO | `posts/seo/` | SEO tutorials |
| Assets | `posts/assets/` | Shared media assets for posts |

**Important timezone note:** Site timezone is Pakistan (UTC+5). Hugo's `buildFuture: false` means a post dated today in UTC+5 might not publish until tomorrow UTC. Always set `lastmod` 1 day before the target publish date to be safe.

---

## Extend Footer (`layouts/partials/extend_footer.html`)

Three features are injected here:

### 1. Reading Progress Bar
- `<div id="reading-progress-bar">` — fixed top bar, `opacity: 0` default
- JS activates it only on blog post pages: checks `path.indexOf('/posts/') === 0` AND `document.querySelector('article.post-single')`
- Cannot use Hugo template conditions here due to `partialCached` caching (see Critical Notes)

### 2. WhatsApp Floating Button
- `<a id="wa-float-btn" href="https://wa.me/923123626704">` — `display: none` default
- JS shows it on all pages EXCEPT `/chat/`: `if (window.location.pathname !== '/chat/')`
- Position: fixed bottom-right, 52px circle, WhatsApp green (#25D366)

### 3. Fuse.js Search Modal
- Keyboard shortcut Ctrl+K or `/`
- Results limited to 6 matches, threshold 0.3
- Background: API warmup ping on each session

---

## RAG Chat API (`api/chat.js`)

### Architecture
1. **Greeting Detection** — Hardcoded warm response for greetings (no API call)
2. **Rate Limit** — 10 requests per IP per 60s
3. **Cache** — Response cache (50 entries, 10min TTL)
4. **Embedding** — Gemini embedding API (`gemini-embedding-001`)
5. **Vector Search** — Pinecone, or local `embeddings.json` fallback
6. **Generation** — Gemini 2.5 Flash (streaming)

### System Prompt Persona
- Speaks as Muhammad Ali Sajid in first person
- Portfolio domain: alibhatti.me
- Warm, professional, concise (1–3 paragraphs)
- Always includes relevant URLs for projects/services

### Rate Limiting
- Window: 60 seconds, max 10 requests per IP

### API Endpoints & Rewrites

| Endpoint | File | Purpose |
|----------|------|---------|
| `/api/chat` | `api/chat.js` | RAG chat (POST, streaming) |
| `/api/health` | `api/health.js` | Health check (GET) |
| `/api/ping` | `api/ping.js` | Ping (GET) |
| `/personal` | `api/personal.js` | Personal info endpoint (GET) |

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `GEMINI_API_KEY` | Google Gemini API (required) |
| `PINECONE_API_KEY` | Pinecone vector DB (optional — local fallback works) |

---

## SEO & Metadata

### JSON-LD Structured Data (`layouts/partials/extend_head.html`)
1. **Homepage** — `Person` + `WebSite` graph (with SearchAction)
2. **Blog Posts** — `BlogPosting` schema
3. **Projects Page** — `ItemList` with 7 featured items (Maje, Rhode Skin, Caliphe Clothing, 4 Finance GitHub repos)

### Meta Tags
- `robots: index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` (production only)
- Instagram creator meta: `@ali.bhatti_ig`

### Fonts (non-render-blocking)
- **JetBrains Mono** — code
- **Work Sans** — body/UI
- **Noto Nastaliq Urdu** — Urdu language support (`.urdu` class / `lang="ur"`)

---

## Deployment

### Vercel Configuration (`vercel.json`)
```json
{
  "buildCommand": "hugo --gc --minify",
  "outputDirectory": "public",
  "build": {
    "env": {
      "HUGO_VERSION": "0.163.2"
    }
  }
}
```

No rewrites in vercel.json — API routes work via Vercel's default `/api/*.js` routing.

### Build Process
1. Vercel installs Hugo 0.163.2
2. Runs `hugo --gc --minify`
3. Output: `./public`
4. Vercel serves static files + Node.js API functions from `api/`

### Theme Handling
PaperMod is **not a git submodule** — it's a full local copy under `themes/hugo-PaperMod-master/`. No submodule init needed.

---

## Critical Implementation Notes

### 1. Goldmark HTML Block Rule (CRITICAL)
Goldmark ends a type-6 HTML block (starting with `<div>`, `<p>`, etc.) at the **first blank line**. After a blank line, content with 4-space indentation is treated as a code block.

**Fix:** Never put blank lines inside `<div>` containers in `.md` files. Blank lines only between top-level HTML sections.

```markdown
<!-- WRONG — blank line inside div = code block -->
<div class="grid">

<div class="card">
Content
</div>
</div>

<!-- CORRECT — no blank lines inside -->
<div class="grid">
<div class="card">
Content
</div>
</div>
```

`<style>` and `<script>` blocks (type 1) end at their closing tag — blank lines inside them are fine.

### 2. partialCached Limitation (CRITICAL)
`baseof.html` uses `partialCached "footer.html" . .Layout .Kind (.Param "hideFooter") (.Param "ShowCodeCopyButtons")`. All single pages share `.Kind = "page"` → same cache key → Hugo template conditions using `.RelPermalink` or `.Section` inside the cached partial evaluate **only once** (for the first page rendered).

**Fix:** Use JavaScript DOM/URL conditions instead of Hugo template conditions for page-specific behavior in `extend_footer.html`.

### 3. Button Text Color Override
PaperMod's `.post-content a { color: var(--primary) }` overrides button `color: #fff`. Always add `!important` to color properties on buttons, including `:hover`, `:visited`, `:active` states.

### 4. Pakistan Timezone & Dates
Server timezone is UTC; Pakistan is UTC+5. For posts to publish on a given local day, set `date`/`lastmod` to the previous UTC day. When `buildFuture: false` is set (which it is), a date of today in PKT may be in the future in UTC.

### 5. CSS Variable Gotcha
`var(--secondary)` is a muted grey — nearly invisible on the light cream background. For any visible text or icons, use `var(--primary)`. Use `var(--accent)` for CTA actions and highlights.

### 6. Case-Sensitive Paths on Vercel
Vercel serves on Linux (case-sensitive). File names must be lowercase and match `slug:` frontmatter exactly. E.g., `content/services.md` with `slug: services` → `/services/`.

### 7. partialCached vs extend_footer
`extend_footer.html` is called via `partial "extend_footer.html" .` (not partialCached), so Hugo template conditions work normally there. Only the parent `footer.html` partial is cached.
