# Muhammad Ali Sajid Portfolio (Hugo + PaperMod)

Static portfolio, blog, and certification showcase for Muhammad Ali Sajid. Built with Hugo and a customized PaperMod theme featuring a bespoke #131418 palette, keyboard-driven search, and interactive project/certification grids.

## Live Site
- Production: [alibhatti.me](https://alibhatti.me)
- Base URL in config: `https://alibhatti.me` (update `hugo.yaml` if you fork).

## Stack at a Glance
- Hugo **0.163.2** (extended) with PaperMod theme bundled locally under `themes/PaperMod`.
- Custom styling: JetBrains Mono + Work Sans + Noto Nastaliq Urdu, tailored light/dark palettes (`assets/css/core/theme-vars.css`, `assets/css/extended/*.css`).
- Search overlay powered by Fuse.js with keyboard shortcuts (`Ctrl+K` or `/`) and JSON index output (`outputs.home` includes `index.json`).
- On-page UX details: code copy buttons, tailored syntax highlighting for light mode, smooth scroll-to-top, and tag/category icons.
- Deployment ready for Vercel via `vercel.json` (`hugo --gc --minify`).

## Feature Highlights
- **Profile landing**: PaperMod profile mode with resume link, social icons, and hero buttons (blogs, tools, resume).
- **Projects grid**: Responsive cards with tech tags and live/GitHub links (`content/projects.md`, images in `static/assets/projects`).
- **Certifications & achievements**: Tabbed gallery with modal zoom, verification links, and achievements timeline (`content/certifications.md`, assets in `static/assets/certification`).
- **Tools/setup page**: Long-form write-up of daily tooling with inline imagery (`content/tools.md`).
- **Blog library**: Rich posts spanning AWS CCP series, web dev, shell scripting, and more (`content/posts/*`).
- **Multilingual typography support**: Urdu-friendly typography via `assets/css/extended/urdu-font.css` (use `.urdu` class or `lang="ur"`).
- **SEO & social**: Canonical links, OG/Twitter metadata, JSON-LD for homepage and posts (`layouts/partials/extend_head.html`).

## Project Structure
- `hugo.yaml` — global config, menus, profile buttons, social links, and site metadata.
- `content/` — pages (`about.md`, `projects.md`, `tools.md`, `certifications.md`, `search.md`) and posts under `posts/`.
- `layouts/` — theme overrides: header/footer, search modal, tag icons, robots.txt.
- `assets/css/` — core theme variables, common styles, and extended overrides (light-mode code, Urdu font, blank stub).
- `static/` — published assets (favicons, profile images, project and certification media, resume PDF, SVG icons).
- `archetypes/default.md` — default front matter for `hugo new`.
- `scripts/import-aws-articles.sh` — helper to batch-import AWS CCP notes and assets.
- `quickScript.sh` — local automation to sync Obsidian posts, git commit, and push (paths assume the original workstation; adjust before use).

## Getting Started
Prerequisites: Hugo extended ≥ 0.140.2 installed locally.

1) Install dependencies
```bash
# Theme is vendored; no npm install required
hugo version
```
2) Run the site locally (drafts enabled)
```bash
hugo server -D --bind 0.0.0.0 --baseURL http://localhost:1313
```
3) Build production assets
```bash
hugo --gc --minify
# Output goes to ./public
```

## Content Workflow
- New post: `hugo new posts/my-title.md` (archetype sets `draft: true`; flip to `false` when ready).
- Images: place under `static/assets/...`; reference with absolute paths such as `/assets/projects/your-image.webp`.
- Menus/profile buttons: edit `menu.main` and `params.profileMode.buttons` in `hugo.yaml`.
- Tags/categories: add in front matter; tag icons for `life`, `tech`, and `web` are defined in `layouts/_default/terms.html`.
- Search: `index.json` is generated automatically; Fuse.js overlay lives in `layouts/partials/extend_footer.html` and opens via `Ctrl+K` or `/`.

## Styling Notes
- Primary palette is defined in `assets/css/core/theme-vars.css`; adjust there to retheme both light and dark modes.
- Light-mode syntax highlighting and inline code colors live in `assets/css/extended/code-light.css`.
- Urdu/Nastaliq support is opt-in via `.urdu` class or `lang="ur"` wrappers.
- Additional tweaks for layout, headers, posts, archives, and scrollbar are in `assets/css/common/` and `assets/css/includes/`.

## Deployment
- Vercel is configured through `vercel.json` with pinned `HUGO_VERSION=0.140.2` and build command `hugo --gc --minify`.
- The repo expects the PaperMod theme to be present in `themes/PaperMod`; since it is vendored, no submodule init is required.
- Set `HUGO_ENV=production` or rely on Vercel defaults for minified output and sitemap/robots generation.

## Automation Helpers
- `quickScript.sh` rsyncs posts from an Obsidian vault, stages, commits, and pushes. Paths and notification icon are workstation-specific; tailor before use.

## Troubleshooting
- If the search overlay does not populate, ensure `outputs.home` includes `JSON` in `hugo.yaml` and that `public/index.json` exists after a build.
- Broken images usually mean assets were placed outside `static/assets`; relocate or fix paths to start with `/assets/...`.
- On forks, update `baseURL` in `hugo.yaml` and redeploy to regenerate canonical/meta tags correctly.