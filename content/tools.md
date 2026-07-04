---
title: "Tools & Setup"
description: "The exact software, tools, and workflow Muhammad Ali Sajid uses daily for Shopify development, financial modeling, and running Creatify."
keywords: [Tools, Setup, VS Code, Shopify, Figma, Postman, Excel, Power BI, Hugo, Vercel, Developer Setup]
lastmod: 2026-07-04
showtoc: false
searchHidden: true
hideMeta: true
ShowBreadCrumbs: false
ShowShareButtons: false
---

<style>
.post-title, .post-description { display: none; }
.tools-page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.4rem;
}
.tools-page-sub {
  font-size: 1rem;
  color: var(--primary);
  margin: 0 0 2rem;
  line-height: 1.6;
}
.setup-img {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 2.5rem;
  border: 1px solid var(--border);
  display: block;
}
.tools-section-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 2.5rem 0 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border);
}
.tools-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}
.tool-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem 1.2rem;
  background: var(--entry);
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: box-shadow 0.2s, transform 0.2s;
}
.tool-card:hover {
  box-shadow: 0 4px 14px rgba(0,0,0,0.09);
  transform: translateY(-2px);
}
.tool-icon-wrap {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.tool-icon-wrap img {
  width: 26px;
  height: 26px;
  filter: brightness(0) invert(1);
  display: block;
}
.tool-body { flex: 1; min-width: 0; }
.tool-body h4 {
  margin: 0 0 0.2rem;
  font-size: 0.97rem;
  font-weight: 600;
}
.tool-body p {
  margin: 0 0 0.5rem;
  font-size: 0.84rem;
  color: var(--primary);
  line-height: 1.6;
}
.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.tool-tag {
  font-size: 0.72rem;
  padding: 0.12rem 0.5rem;
  border-radius: 4px;
  background: rgba(180,83,9,0.1);
  color: var(--accent);
  font-weight: 500;
}
.ext-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
}
.ext-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  background: var(--entry);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.83rem;
  font-weight: 500;
}
.ext-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
@media (max-width: 600px) {
  .tool-card { flex-direction: row; }
  .tool-icon-wrap { width: 40px; height: 40px; }
}
</style>

<h1 class="tools-page-title">Tools &amp; Setup</h1>
<p class="tools-page-sub">Every tool I rely on daily — for Shopify development, financial modeling, and running Creatify. Chosen for one reason: they don't slow me down.</p>

<img class="setup-img" src="/assets/desktop.webp" alt="Muhammad Ali Sajid's workspace setup" loading="lazy">

<p class="tools-section-label">Shopify Development</p>

<div class="tools-grid">

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#007ACC;">
      <img src="https://cdn.simpleicons.org/visualstudiocode" alt="VS Code" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Visual Studio Code</h4>
      <p>My primary editor for everything — Shopify Liquid, JavaScript, CSS, and HTML. Extensions I run: Shopify Liquid (syntax highlighting + linting), Prettier (auto-formatting), GitLens (inline git blame and history), and Liquid Snippets. Fast, lightweight, and endlessly customizable.</p>
      <div class="tool-tags"><span class="tool-tag">Editor</span><span class="tool-tag">Liquid</span><span class="tool-tag">JS</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#181717;">
      <img src="https://cdn.simpleicons.org/github" alt="GitHub" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>GitHub</h4>
      <p>Version control for every client theme and personal project. I use GitHub to manage Shopify theme branches, review diffs before pushing live, and maintain clean commit history for every client store. Also where all my open-source finance projects live.</p>
      <div class="tool-tags"><span class="tool-tag">Version Control</span><span class="tool-tag">Collaboration</span><span class="tool-tag">Open Source</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#96BF48;">
      <img src="https://cdn.simpleicons.org/shopify" alt="Shopify" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Shopify Partner Dashboard</h4>
      <p>The official hub for managing client stores, development stores, and theme submissions. Essential for any Shopify developer running multiple client accounts. I use it daily — creating dev environments, previewing themes before go-live, and managing Creatify client access.</p>
      <div class="tool-tags"><span class="tool-tag">Client Management</span><span class="tool-tag">Dev Stores</span><span class="tool-tag">Theme Preview</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#F24E1E;">
      <img src="https://cdn.simpleicons.org/figma" alt="Figma" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Figma</h4>
      <p>Industry-standard design tool for reviewing client mockups and translating designs into Shopify Liquid code. I use it to inspect spacing, typography, and color values before writing a single line of CSS. Also useful for wireframing custom sections before development.</p>
      <div class="tool-tags"><span class="tool-tag">Design Review</span><span class="tool-tag">UI Inspection</span><span class="tool-tag">Mockups</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#FF6C37;">
      <img src="https://cdn.simpleicons.org/postman" alt="Postman" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Postman</h4>
      <p>API testing and debugging for Shopify's Admin REST API and GraphQL API. I use it whenever I'm building custom integrations, testing webhook payloads, or automating store operations like bulk product updates and order management.</p>
      <div class="tool-tags"><span class="tool-tag">API Testing</span><span class="tool-tag">REST</span><span class="tool-tag">GraphQL</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#4285F4;">
      <img src="https://cdn.simpleicons.org/googlechrome" alt="Chrome DevTools" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Chrome DevTools</h4>
      <p>The browser's built-in developer console — indispensable for inspecting Shopify themes live. I use it to debug CSS overrides, check responsive breakpoints, profile page load performance, and test JavaScript in real-time on client stores without committing changes.</p>
      <div class="tool-tags"><span class="tool-tag">Debugging</span><span class="tool-tag">CSS Inspection</span><span class="tool-tag">Performance</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#458CF5;">
      <img src="https://cdn.simpleicons.org/googlesearchconsole" alt="Search Console" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Google Search Console + Analytics</h4>
      <p>Core tools for Shopify store SEO and performance tracking. Search Console reveals which keywords pages rank for, detects indexing issues, and flags Core Web Vitals problems. Analytics tracks user behavior, conversion funnels, and traffic sources to optimize store revenue — not just traffic.</p>
      <div class="tool-tags"><span class="tool-tag">SEO</span><span class="tool-tag">Analytics</span><span class="tool-tag">CRO</span></div>
    </div>
  </div>

</div>

<p style="font-size:0.88rem; color:var(--primary); margin: 0.5rem 0 0.25rem; font-weight:600;">Browser Extensions</p>
<div class="ext-list">
  <span class="ext-item"><span class="ext-dot" style="background:#E0442B;"></span>uBlock Origin — ad &amp; tracker blocker</span>
  <span class="ext-item"><span class="ext-dot" style="background:#96BF48;"></span>Koala Inspector — Shopify store analyzer</span>
  <span class="ext-item"><span class="ext-dot" style="background:#FF6B6B;"></span>ColorZilla — color picker from any webpage</span>
  <span class="ext-item"><span class="ext-dot" style="background:#4285F4;"></span>WhatFont — identify fonts on any site</span>
</div>

<p class="tools-section-label">Finance &amp; Analytics</p>

<div class="tools-grid">

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#217346;">
      <img src="https://cdn.simpleicons.org/microsoftexcel" alt="Excel" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Microsoft Excel</h4>
      <p>The backbone of my financial work. I use it for financial modeling, budgeting, cost analysis, variance reporting, and building management accounting schedules. Pivot tables, advanced formulas (INDEX/MATCH, XLOOKUP, array formulas), and data validation are all part of my daily workflow. Essential for CMA-level analysis.</p>
      <div class="tool-tags"><span class="tool-tag">Financial Modeling</span><span class="tool-tag">Budgeting</span><span class="tool-tag">CMA</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#F2C811;">
      <img src="https://cdn.simpleicons.org/powerbi" alt="Power BI" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Microsoft Power BI</h4>
      <p>Business intelligence suite for building interactive financial dashboards, KPI tracking, and management reporting. I use it to turn raw Excel data into visual reports clients and managers can actually read. All 4 of my public finance projects on GitHub were built with Power BI + Excel together.</p>
      <div class="tool-tags"><span class="tool-tag">Dashboards</span><span class="tool-tag">KPIs</span><span class="tool-tag">Data Viz</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#13B5EA;">
      <img src="https://cdn.simpleicons.org/xero" alt="Xero" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Xero</h4>
      <p>Cloud-based accounting platform for bookkeeping, accounts payable/receivable, payroll, and financial statement generation. Clean interface and real-time financial data sync make it the go-to for managing Creatify's own books and advising clients on financial reporting setup.</p>
      <div class="tool-tags"><span class="tool-tag">Bookkeeping</span><span class="tool-tag">Invoicing</span><span class="tool-tag">Cloud Accounting</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#E42527;">
      <img src="https://cdn.simpleicons.org/zoho" alt="Zoho Books" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Zoho Books</h4>
      <p>Cost-effective accounting solution for small to mid-sized businesses — handles invoicing, tax compliance (including Pakistan FBR requirements), bank reconciliation, and financial reporting. Good Shopify integration means I can bridge e-commerce and accounting data for clients.</p>
      <div class="tool-tags"><span class="tool-tag">Accounting</span><span class="tool-tag">Tax</span><span class="tool-tag">SMB</span></div>
    </div>
  </div>

</div>

<p class="tools-section-label">Productivity &amp; Communication</p>

<div class="tools-grid">

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#000000;">
      <img src="https://cdn.simpleicons.org/notion" alt="Notion" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Notion</h4>
      <p>Command center for everything — client project management, task tracking, SOPs for recurring Shopify tasks, study notes for CMA, and a running knowledge base. I track every active client store, deliverable, deadline, and invoice status in one workspace. Replaces 5 separate apps.</p>
      <div class="tool-tags"><span class="tool-tag">Project Management</span><span class="tool-tag">Knowledge Base</span><span class="tool-tag">SOPs</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#4A154B;">
      <img src="https://cdn.simpleicons.org/slack" alt="Slack" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Slack</h4>
      <p>Real-time communication for client updates, design team coordination, and staying connected to the Shopify developer community. Channels keep project conversations organized so nothing falls through the cracks between email threads and WhatsApp messages.</p>
      <div class="tool-tags"><span class="tool-tag">Team Communication</span><span class="tool-tag">Client Updates</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#0F9D58;">
      <img src="https://cdn.simpleicons.org/googleworkspace" alt="Google Workspace" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Google Workspace</h4>
      <p>Professional email (Gmail), document collaboration (Docs/Sheets), and client-facing reports (Slides). Everything shared with clients goes through Google Workspace — clean, professional, and accessible from any device without compatibility issues.</p>
      <div class="tool-tags"><span class="tool-tag">Email</span><span class="tool-tag">Documents</span><span class="tool-tag">Client Sharing</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#7C3AED;">
      <img src="https://cdn.simpleicons.org/obsidian" alt="Obsidian" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Obsidian</h4>
      <p>Local-first knowledge management for notes that don't belong in Notion — private thoughts, research rabbit holes, Liquid code snippets, and CMA study notes. The bi-directional linking shows connections between ideas I'd otherwise miss. Files stay on my machine, not a server.</p>
      <div class="tool-tags"><span class="tool-tag">Note-taking</span><span class="tool-tag">Knowledge Graph</span><span class="tool-tag">Local-first</span></div>
    </div>
  </div>

</div>

<p class="tools-section-label">This Website</p>

<div class="tools-grid">

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#FF4088;">
      <img src="https://cdn.simpleicons.org/hugo" alt="Hugo" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Hugo</h4>
      <p>Static site generator that builds this entire portfolio in under 2 seconds. No database, no PHP, no WordPress bloat — just HTML, CSS, and Markdown. Pages load fast everywhere because there's nothing dynamic to process. Hugo's template system (Go templates) is expressive enough to build anything complex while staying simple for content updates.</p>
      <div class="tool-tags"><span class="tool-tag">Static Sites</span><span class="tool-tag">Go Templates</span><span class="tool-tag">Fast Builds</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#404040;">
      <img src="https://cdn.simpleicons.org/vercel" alt="Vercel" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Vercel</h4>
      <p>Deployment and hosting platform — connected directly to GitHub so every git push triggers an automatic rebuild and deploy. Global CDN means the site loads fast from Pakistan, UAE, or anywhere else clients browse from. Also hosts the serverless API function powering the AI chat on this site.</p>
      <div class="tool-tags"><span class="tool-tag">Hosting</span><span class="tool-tag">CDN</span><span class="tool-tag">Serverless</span></div>
    </div>
  </div>

  <div class="tool-card">
    <div class="tool-icon-wrap" style="background:#FF6B35;">
      <img src="https://cdn.simpleicons.org/google" alt="Gemini AI" loading="lazy">
    </div>
    <div class="tool-body">
      <h4>Google Gemini API</h4>
      <p>Powers the AI chat assistant on this site — a custom-built serverless function using Gemini 2.5 Flash that answers visitor questions about my work, skills, and how to hire me. Built with streaming SSE responses, rate limiting, response caching, and a full system prompt covering all my projects and experience.</p>
      <div class="tool-tags"><span class="tool-tag">AI</span><span class="tool-tag">Serverless API</span><span class="tool-tag">SSE Streaming</span></div>
    </div>
  </div>

</div>
