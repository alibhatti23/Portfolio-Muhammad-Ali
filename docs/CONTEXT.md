# Muhammad Ali Sajid Portfolio — AI Agent Context

## Project Overview

**Name:** Muhammad Ali Sajid (`Muhammad Ali`)
**Type:** Static portfolio website with AI-powered RAG chat feature
**Stack:** Hugo v0.163.2 (extended) + hugo-PaperMod-master + Vercel deployment + Node.js API functions
**Repository:** `/home/Muhammad Ali Sajid/Documents/Projects/Portfolio/`
**Live URL:** 

---

## Project Type & Purpose

This is a personal portfolio, blog, and certification showcase for **Muhammad Ali Sajid** — Affiliate Financial Accountant & Web Developer from Multan, Pakistan. The site also features an AI-powered chat assistant (RAG-based) that answers questions about Ali's background, projects, skills, certifications, and experience.

The project consists of two main parts:
1. **Hugo Static Site** — Portfolio pages, blog posts, certifications, tools/setup page, contact page
2. **Vercel Serverless API** — RAG chat endpoint (`/api/chat`) powered by Gemini AI and Pinecone vector search

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BROWSER                                     │
│  Portfolio Site (ahmadx.dev)     Chat Interface (ahmadx.dev/chat/) │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
     ┌────────▼───────────────┐    ┌──────────▼────────────┐
     │   Hugo Static Site     │    │  Vercel Serverless   │
     │   (vercel.json)        │    │  API Functions       │
     │   hugo --gc --minify   │    │  /api/chat.js        │
     └────────────────────────┘    │  /api/health.js      │
                                    │  /api/ping.js        │
                                    └──────────┬────────────┘
                                               │
                              ┌────────────────┼────────────────┐
                              │                │                │
                     ┌────────▼────────┐ ┌────▼────┐  ┌─────────▼────┐
                     │  Gemini API     │ │ Pinecone│  │ Local       │
                     │  (Embeddings +  │ │ (Vector │  │ Fallback    │
                     │   Generation)  │ │ Search) │  │ (embeddings │
                     └─────────────────┘ └─────────┘  │  .json)     │
                                                     └─────────────┘
```

### Technology Stack

| Layer | Technology |
|-------|------------|
| Static Site Generator | Hugo 0.140.2 (extended) |
| Theme | PaperMod (bundled locally under `themes/PaperMod`) |
| Deployment | Vercel (`vercel.json` with `hugo --gc --minify`) |
| API Runtime | Vercel Serverless Functions (Node.js) |
| AI - Embeddings | Google Gemini Embedding API (`gemini-embedding-001`) |
| AI - Generation | Google Gemini 2.5 Flash / Flash Lite |
| Vector Search | Pinecone (optional, with local fallback) |
| Search UI | Fuse.js with keyboard shortcut overlay (Ctrl+K or /) |
| Styling | Custom CSS (shadcn/ui-inspired palette) |

---

## Directory Structure

```
Portfolio/
├── api/                         # Vercel serverless API functions (Node.js)
│   ├── chat.js                  # Main RAG chat handler (467 lines)
│   ├── health.js                # Health check endpoint
│   ├── ping.js                  # Ping endpoint
│   ├── embeddings.json          # Pre-computed vector embeddings (~248 vectors)
│   ├── knowledge.json           # RAG knowledge chunks (248 entries)
│   ├── generate-embeddings.js    # Script to generate embeddings
│   ├── upload-to-pinecone.js    # Script to upload to Pinecone
│   ├── package.json             # Dependencies (Pinecone SDK)
│   ├── chat.js                  # Main RAG chat handler
│   └── node_modules/
│
├── assets/css/                  # Custom CSS stylesheets
│   ├── core/
│   │   ├── theme-vars.css       # CSS custom properties (light/dark palettes)
│   │   ├── reset.css            # CSS reset
│   │   ├── zmedia.css           # Responsive utilities
│   │   └── license.css
│   ├── common/                  # Component-specific styles
│   │   ├── header.css           # Header styling
│   │   ├── footer.css           # Footer styling
│   │   ├── post-single.css      # Blog post styling
│   │   ├── post-entry.css       # Post card styling
│   │   ├── archive.css          # Archive page styling
│   │   ├── profile-mode.css     # Profile landing page
│   │   ├── terms.css            # Tag/category icons
│   │   ├── search.css           # Search page
│   │   └── 404.css
│   ├── extended/                # Theme overrides
│   │   ├── code-light.css       # Light mode syntax highlighting
│   │   └── urdu-font.css        # Urdu/Nastaliq typography support
│   └── includes/
│       ├── bg-pattern.css       # Background pattern
│       ├── scroll-bar.css       # Custom scrollbar
│       ├── chroma-styles.css    # Syntax highlighting colors
│       └── chroma-mod.css
│
├── content/                     # Hugo content (markdown)
│   ├── about.md                 # About page with profile card, work experience
│   ├── projects.md              # Projects grid with 7 project cards
│   ├── certifications.md        # Tabbed gallery (certifications + achievements)
│   ├── tools.md                 # Developer setup and tooling write-up
│   ├── contact.md               # Contact page with social links
│   ├── chat.md                  # Chat page (layout: "chat")
│   ├── search.md                # Search page
│   ├── categories/              # Auto-generated category pages
│   └── posts/                   # Blog posts (organized by category)
│       ├── aws-ccp/             # AWS Certified Cloud Practitioner series (18 posts)
│       ├── shell-scripting/     # Shell scripting articles
│       ├── web-dev/             # Web development articles
│       ├── databases/           # Database articles
│       ├── life/                # Personal/life articles
│       ├── quantum-computing/    # Quantum computing articles
│       ├── system-design/       # System design articles
│       ├── urdu/                # Urdu language articles
│       ├── vmware-archlinux-installation.md
│       └── setup-mpd-and-rmpc.md
│
├── layouts/                     # Hugo template overrides
│   ├── _default/
│   │   ├── baseof.html          # Base HTML template
│   │   ├── terms.html           # Tag/category term pages
│   │   └── search.html          # Search page template
│   ├── partials/
│   │   ├── header.html          # Site header with nav menu and theme toggle
│   │   ├── footer.html          # Site footer with code copy buttons
│   │   ├── head.html            # Head element partial
│   │   ├── extend_head.html     # Custom head additions (SEO, JSON-LD, fonts)
│   │   ├── extend_footer.html   # Search modal + API warmup script
│   │   ├── post_meta.html       # Post metadata display
│   │   └── urdu_digits.html     # Urdu digit conversion
│   └── chat/                    # Chat page layout (if exists)
│
├── static/assets/               # Published static assets
│   ├── profile-1.webp           # Profile image
│   ├── desktop.webp             # Setup screenshot
│   ├── opengraph.webp           # OG image for social sharing
│   ├── fav.ico                  # Favicon
│   ├── favicon-16x16.png        # Small favicon
│   ├── favicon-32x32.png        # Medium favicon
│   ├── apple-touch-icon.png     # Apple touch icon
│   ├── projects/                # Project screenshots
│   │   ├── hyprflux.webp
│   │   ├── sehatscan.webp
│   │   ├── hisaabscore.webp
│   │   ├── raf-sp.webp
│   │   ├── uam-tracker.webp
│   │   ├── mindosis.webp
│   │   └── codinghawks.webp
│   ├── certification/           # Certification badges/images (22 certifications)
│   │   ├── aws-cpp.jpg
│   │   ├── calico.jpg
│   │   ├── meta-frontend-developer.jpg
│   │   └── ... (19 more)
│   └── Ahmad-Hassan-Resume.pdf  # Resume PDF
│
├── resources/                   # Hugo generated resources
│   └── _gen/                   # Generated assets (processed images, etc.)
│
├── themes/PaperMod/             # Bundled PaperMod theme (git submodule)
│   ├── assets/
│   ├── layouts/
│   ├── i18n/
│   ├── static/
│   └── theme.toml
│
├── hugo.yaml                    # Hugo configuration (baseURL, menus, params, outputs)
├── vercel.json                  # Vercel build configuration
├── .env                         # Environment variables (GEMINI_API_KEY, PINECONE_API_KEY)
├── .gitignore                   # Git ignore rules
├── quickScript.sh               # Local automation script (sync Obsidian → git → push)
├── scripts/
│   └── import-aws-articles.sh  # Batch import AWS CCP notes from Obsidian
├── archetypes/
│   └── default.md              # Default front matter template for `hugo new`
├── dev-server.js               # Local development server helper
└── docs/
    └── CONTEXT.md              # This file — AI agent context documentation
```

---

## Hugo Configuration (`hugo.yaml`)

**Key settings:**
- **Base URL:** `https://ahmadx.dev`
- **Theme:** PaperMod (vendored locally)
- **Hugo Version Required:** ≥ 0.140.2 (extended)
- **Default Theme:** `auto` (light/dark based on system preference + localStorage)
- **Menu Items:** About, Projects, Certs, Blog, Categories, Contact, Chat, Search
- **Output Formats:** HTML, RSS, JSON (JSON for search index)
- **Google Analytics:** G-2GLY0PDB4W
- **Minify:** Enabled (`minifyOutput: true`)
- **RobotsTXT:** Enabled
- **Custom CSS Assets:** `css/extended/urdu-font.css`, `css/extended/code-light.css`

**Params relevant to styling:**
- `defaultTheme: auto` — enables light/dark mode switching
- Theme toggle is enabled (`disableThemeToggle: false`)
- Code copy buttons are enabled
- Profile mode is enabled with custom buttons (blogs, tools, resume)

---

## CSS Styling System

### Theme Variables (`assets/css/core/theme-vars.css`)

The site uses a **shadcn/ui-inspired color palette** with custom property names:

**Light Mode Palette:**
```css
--background: #ffffff
--foreground: #0a0a0a
--card: #ffffff
--primary: #18181b
--secondary: #f4f4f5
--muted: #f4f4f5
--accent: #ea580c (chart-1 orange)
--border: #e4e4e7
--code-block-bg: #f4f4f5
--code-block-border: #e4e4e7
```

**Dark Mode Palette:**
```css
--background: #0a0a0a
--foreground: #fafafa
--card: #0a0a0a
--primary: #fafafa
--secondary: #27272a
--muted: #18181b
--accent: #1d4ed8 (chart-1 blue)
--border: #27272a
--code-block-bg: #0a0a0a
--code-block-border: #27272a
```

### Key CSS Files

| File | Purpose |
|------|---------|
| `core/theme-vars.css` | CSS custom properties for both light/dark modes |
| `core/reset.css` | CSS reset |
| `common/header.css` | Header/nav styling |
| `common/footer.css` | Footer styling |
| `common/post-single.css` | Blog post content styling |
| `common/post-entry.css` | Post card styling |
| `common/archive.css` | Archive page |
| `common/profile-mode.css` | Profile landing page |
| `common/terms.css` | Tag/category icons (life, tech, web) |
| `extended/code-light.css` | Light mode syntax highlighting |
| `extended/urdu-font.css` | Urdu Nastaliq typography (`.urdu` class) |
| `includes/bg-pattern.css` | Background pattern overlay |
| `includes/scroll-bar.css` | Custom scrollbar styling |

### Background Pattern

The base template (`layouts/_default/baseof.html`) conditionally adds a `.bg-pattern` div on non-post pages:
```html
{{ if not (and .IsPage (eq .Section "posts")) }}<div class="bg-pattern"></div>{{ end }}
```

The pattern is defined in `assets/css/includes/bg-pattern.css`.

---

## Content Pages

### 1. About (`content/about.md`)
- Profile card with image, name, role, bio, and social links
- Work experience timeline (VieroMind, BinaryBytes, Digistartup)
- Open source projects section
- Technical skills grid
- Achievements list
- "Beyond Code" section about Arch Linux/Hyprland setup
- Contact information

### 2. Projects (`content/projects.md`)
- 7 project cards in responsive grid (auto-fit, minmax 320px)
- Each card: image, title, description, tech tags, links (GitHub/Live)
- Projects: HyprFlux, SehatScan, HisaabScore, RAF-SP, UAM Tracker, MindOasis, CodingHawks

### 3. Certifications (`content/certifications.md`)
- **Tabbed interface** (Certifications / Achievements)
- 22 certification cards with modal zoom functionality
- Verification links to Credly, Coursera, etc.
- 9 achievement items with descriptions and dates
- Modal overlay with close on click/Escape key

### 4. Tools (`content/tools.md`)
- Long-form write-up of daily software/tools
- Sections: Software, Applications, Theme, Website
- Setup screenshot image
- Categories: OS (Arch Linux btw), WM (Hyprland), Terminal (foot, Zsh), Editor (Neovim, VSCodium), etc.

### 5. Contact (`content/contact.md`)
- Minimal centered layout
- Email CTA button
- Social links grid (GitHub, LinkedIn, X, LeetCode)
- Location display (Multan, Pakistan)

### 6. Chat (`content/chat.md`)
- Layout set to `"chat"`
- Custom styling for chat interface
- Embeds the RAG chat API

### 7. Search (`content/search.md`)
- Uses PaperMod's search layout
- Fuse.js powered with JSON index

---

## Blog Posts Structure

Blog posts are organized under `content/posts/` with subdirectories by category:

| Category | Path | Post Count | Examples |
|----------|------|------------|----------|
| AWS CCP | `posts/aws-ccp/` | ~18 | Cloud Computing, IAM, EC2, S3, Security, Databases, etc. |
| Shell Scripting | `posts/shell-scripting/` | ~2 | MPD & R MPC setup |
| Web Dev | `posts/web-dev/` | ~2 | - |
| Databases | `posts/databases/` | ~2 | - |
| Life | `posts/life/` | ~2 | - |
| Quantum Computing | `posts/quantum-computing/` | ~1 | - |
| System Design | `posts/system-design/` | ~2 | - |
| Urdu | `posts/urdu/` | ~2 | Urdu language posts |
| Root | `posts/` | ~2 | VMware ArchLinux installation, MPD setup |

AWS CCP series posts cover all exam topics with study notes and images.

---

## RAG Chat API (`api/chat.js`)

### Architecture

The chat API implements a **Retrieval-Augmented Generation (RAG)** pattern:

1. **Query Enhancement** — Detects follow-up patterns and prepends previous context
2. **Embedding** — Queries Gemini embedding API (`gemini-embedding-001`)
3. **Vector Search** — Searches Pinecone (or local fallback) for relevant knowledge chunks
4. **Generation** — Streams response from Gemini 2.5 Flash

### Performance Optimizations

| Optimization | Description |
|-------------|-------------|
| Float32Arrays | 10-50% faster vector math |
| Embedding Cache | LRU cache, 100 entries, 30min TTL |
| Query Result Cache | 50 entries, 10min TTL |
| Lazy Pinecone Init | Initializes on first use |
| Local Fallback | Brute-force search if Pinecone fails |
| Reduced Chunks | 5 retrieved chunks (vs 8) |
| Smaller Stream Chunks | 2 words per chunk (vs 3) |
| API Warmup | Background warmup on page load |

### Caching Strategy

```
Query → Check Query Cache → [HIT] → Return cached result
            ↓ [MISS]
      Check Embedding Cache → [HIT] → Use cached embedding
            ↓ [MISS]
      Gemini Embedding API → Cache embedding
            ↓
      Pinecone Query (or local fallback)
            ↓
      Cache result → Build System Prompt → Gemini Generation → Stream Response
```

### Knowledge Base (`api/knowledge.json`)

248 knowledge chunks across categories:
- `about` — Biography, work, open source, competitive programming, writing, beyond code
- `contact` — Contact information
- `skills` — Technical skills and stack
- `project` — All 7 projects with descriptions
- `certification` — Cloud/AI certs, frontend/databases certs, programming certs
- `achievement` — Competition wins, GitHub stars, rankings
- `blog` — Blog article links and topics

### System Prompt Persona

The AI responds as "Ahmad Hassan" with rules:
- First person perspective ("I", "my", "me")
- Conversational, warm, professional
- Concise responses (1-3 paragraphs, up to 4 for detailed)
- Markdown formatting with **bold**, [links](url), bullet lists
- ALWAYS include relevant URLs when mentioning projects/certs
- **SAVAGE MODE** for relationship status questions
- Low relevance detection with graceful fallback

### Rate Limiting

- Window: 60 seconds
- Max requests: 10 per IP per window
- Implemented via in-memory Map

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/chat` | POST | RAG chat with streaming response |
| `/api/health` | GET | Health check |
| `/api/ping` | GET | Ping response |

### Vercel Rewrites (`vercel.json`)

```json
{ "source": "/api/chat", "destination": "/api/chat.js" }
{ "source": "/api/health", "destination": "/api/health.js" }
{ "source": "/api/ping", "destination": "/api/ping.js" }
{ "source": "/personal", "destination": "/api/personal.js" }
```

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `GEMINI_API_KEY` | Google Gemini API key (required) |
| `PINECONE_API_KEY` | Pinecone vector database key (optional, local fallback available) |
| `HUGO_VERSION` | Pinned to `0.140.2` in vercel.json |
| `GO_VERSION` | Pinned to `1.20.6` in vercel.json |

---

## SEO & Metadata

### JSON-LD Structured Data

The site implements comprehensive JSON-LD schemas:

1. **Homepage (`extend_head.html`)** — Person + WebSite graph
2. **Blog Posts** — BlogPosting schema with author, date, word count
3. **Projects Page** — ItemList with SoftwareSourceCode entries for each project

### Open Graph & Twitter

- `twitter:creator` — @ahmad9059x
- `twitter:site` — @ahmad9059x
- OG image — `/assets/opengraph.webp`

### Meta Tags

- Canonical links
- `robots` — `index, follow, max-image-preview:large`
- Keywords from `hugo.yaml` params

### Fonts

Three Google Font families loaded (non-render-blocking):
- **JetBrains Mono** — Monospace font for code
- **Work Sans** — Sans-serif for body text
- **Noto Nastaliq Urdu** — For Urdu language support

---

## Search Functionality

### Implementation

- **Fuse.js** loaded from CDN (`cdn.jsdelivr.net/npm/fuse.js@7.0.0`)
- **JSON Index** — Hugo generates `/index.json` (configured in `outputs.home`)
- **Keyboard Shortcut** — `Ctrl+K` or `/` opens search modal
- **Result Navigation** — Arrow keys + Enter

### Search Modal (`layouts/partials/extend_footer.html`)

- Backdrop blur overlay
- Input field with ESC to close
- Results limited to 6 matches
- Fuse.js `threshold: 0.3` (tight matching)
- Keyboard navigation support

---

## Deployment

### Vercel Configuration (`vercel.json`)

```json
{
  "build": {
    "env": {
      "HUGO_VERSION": "0.140.2",
      "GO_VERSION": "1.20.6"
    }
  },
  "buildCommand": "hugo --gc --minify",
  "rewrites": [
    { "source": "/api/chat", "destination": "/api/chat.js" },
    ...
  ]
}
```

### Build Process

1. Vercel installs Hugo 0.140.2 and Go 1.20.6
2. Runs `hugo --gc --minify`
3. Output goes to `./public`
4. Vercel serves static files + API functions

### Theme Handling

PaperMod is vendored under `themes/PaperMod/` — no submodule initialization needed.

---

## Utilities & Scripts

### `quickScript.sh`
Local automation script that:
1. Rsyncs posts from Obsidian vault to `content/posts/`
2. Git add + commit with timestamp
3. Git push

**Note:** Paths are workstation-specific; must be adjusted before use.

### `scripts/import-aws-articles.sh`
Batch-imports AWS CCP notes and assets from Obsidian vault.

### `dev-server.js`
Local development server helper (not frequently used — prefer `hugo server`).

---

## Key Implementation Details

### PaperMod Profile Mode

The homepage uses PaperMod's `profileMode` feature with:
- Custom title, subtitle, image
- Image dimensions: 120x120px
- Buttons linking to blogs, tools, and resume PDF

### Custom Theme Toggle

Header includes a theme toggle button (moon/sun icons) that:
- Persists preference in `localStorage` under `pref-theme`
- Respects `prefers-color-scheme` media query
- Handles `light`, `dark`, and `auto` modes

### Code Copy Buttons

Post pages include copy buttons on code blocks:
- Clipboard API with fallback to `execCommand`
- Visual feedback (checkmark icon) for 2 seconds
- Styled differently for light/dark modes

### Urdu Font Support

Opt-in via `.urdu` class or `lang="ur"` attribute:
- Uses Noto Nastaliq Urdu font
- RTL direction
- Custom line-height (2.1)
- Special styling for post titles and descriptions

### API Warmup

Every page load triggers a background API warmup:
- Sends a greeting message to `/api/chat`
- Uses `sessionStorage` to ensure single warmup per session
- Detects localhost vs production for API URL

---

## Environment & Configuration

### Local Development

```bash
hugo server -D --bind 0.0.0.0 --baseURL http://localhost:1313
```

### Production Build

```bash
hugo --gc --minify
# Output: ./public
```

### API Keys

- `.env` file (gitignored) contains actual keys
- Vercel environment variables set in dashboard
- Local development: keys from `.env`
- Production: keys from Vercel config

---

## Dependencies

### Hugo (no npm install needed)

Hugo is the only required tool for the static site. The PaperMod theme is vendored locally.

### API (Node.js)

Located in `api/package.json`:
```json
{
  "dependencies": {
    "@pinecone-database/pinecone": "^^version"
  }
}
```

---

## Important Notes for AI Agents

1. **CSS Variable Mapping** — When editing styles, use `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--border`, `--muted-foreground` for theming compatibility.

2. **Theme Toggle** — Theme state is managed via `localStorage` and `data-theme` attributes. The dark mode class is `dark` on `<body>`.

3. **Search Index** — Generated at build time via Hugo's `outputs.home` config. If search breaks, ensure JSON output is configured.

4. **API Rewrites** — All `/api/*` routes are rewritten to `/*.js` files via `vercel.json`. The actual files are at root level (`api/chat.js` → `/api/chat`).

5. **Pinecone is Optional** — The chat API falls back to local brute-force search over `embeddings.json` if Pinecone is unavailable or not configured.

6. **Knowledge JSON** — `api/knowledge.json` is gitignored. It's used to generate `embeddings.json`. If you need to regenerate embeddings, run `node generate-embeddings.js`.

7. **Hugo Version** — Requires v0.125.7 minimum (stated in PaperMod theme.toml). Site config requires 0.140.2+.

8. **Content Organization** — Posts use front matter with `draft: true` by default (via archetype). Categories and tags are auto-generated from front matter.

9. **JSON-LD** — Only home and post pages have structured data. Projects page also has ItemList schema.

10. **Background Pattern** — The `.bg-pattern` div is only added on non-post pages (home, about, projects, etc.) to avoid cluttering blog posts.