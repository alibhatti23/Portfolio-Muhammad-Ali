---
title: "Projects"
description: “Shopify stores built and customized by Muhammad Ali Sajid - spanning fashion, beauty, skincare, footwear, tech, and more across international and Pakistani markets.”
keywords: [Projects, Shopify, Portfolio, Liquid, E-commerce, Custom Theme, Pakistan, International]
lastmod: 2026-07-04
showtoc: false
searchHidden: true
ShowRssButtonInSectionTermList: false
ShowShareButtons: false
hideMeta: true
---

<style>
.projects-header {
  margin-bottom: 2rem;
}
.projects-header p {
  color: var(--primary);
  font-size: 1rem;
  margin: 0.5rem 0 0;
}
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.filter-btn {
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--entry);
  color: var(--primary);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.filter-btn:hover,
.filter-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
.project-card {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--entry);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.25s, box-shadow 0.25s;
  display: flex;
  flex-direction: column;
}
.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
.project-preview {
  position: relative;
  height: 260px;
  overflow: hidden;
  background: #f0f0f0;
  cursor: pointer;
}
.project-preview a {
  display: block;
  height: 100%;
  text-decoration: none;
}
.project-preview img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateY(0);
  will-change: transform;
}
.project-card:hover .project-preview img {
  transform: translateY(var(--scroll-amount, -60%));
}
.project-preview-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to top, rgba(0,0,0,0.35), transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
.project-card:hover .project-preview-overlay {
  opacity: 1;
}
.scroll-hint {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.55);
  color: #fff;
  font-size: 0.72rem;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  letter-spacing: 0.03em;
}
.project-card:hover .scroll-hint {
  opacity: 1;
}
.project-info {
  padding: 1rem 1.1rem 1.1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.project-info h3 {
  margin: 0 0 0.3rem;
  font-size: 1rem;
  font-weight: 600;
}
.project-category {
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  background: var(--code-bg, rgba(0,0,0,0.06));
  color: var(--primary);
  margin-bottom: 0.75rem;
  text-transform: capitalize;
}
.project-visit {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
}
.project-visit:hover {
  text-decoration: underline;
}
.project-visit svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--secondary);
  padding: 3rem 0;
  font-size: 1rem;
}
@media (max-width: 600px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
.type-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.type-btn {
  padding: 0.45rem 1.2rem;
  border-radius: 999px;
  border: 1.5px solid var(--border);
  background: var(--entry);
  color: var(--primary);
  font-size: 0.88rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  font-family: inherit;
}
.type-btn:hover, .type-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
.filter-bar.hidden { display: none; }
.finance-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-decoration: none;
}
.finance-icon {
  width: 70px;
  height: 70px;
  background: rgba(255,255,255,0.18);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.finance-icon svg {
  width: 34px;
  height: 34px;
  stroke: #fff;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.finance-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
}
.finance-badge {
  font-size: 0.72rem;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.2);
  color: #fff;
  font-weight: 500;
}
.finance-desc {
  font-size: 0.83rem;
  color: var(--primary);
  line-height: 1.55;
  margin: 0 0 0.5rem;
}
.project-visit-gh svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  fill: currentColor;
}
</style>

<div class="projects-header">
  <p>26 Shopify stores + 4 Finance &amp; Analytics projects — Shopify Liquid, Excel, Power BI.</p>
</div>

<div class="type-bar">
  <button class="type-btn active" data-type="all">All Projects</button>
  <button class="type-btn" data-type="shopify">Shopify Stores</button>
  <button class="type-btn" data-type="finance">Finance &amp; Analytics</button>
</div>

<div class="filter-bar" id="categoryFilters">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="cloth">Cloth</button>
  <button class="filter-btn" data-filter="skin-care">Skin Care</button>
  <button class="filter-btn" data-filter="footwear">Footwear</button>
  <button class="filter-btn" data-filter="coffee">Coffee</button>
  <button class="filter-btn" data-filter="streetwear">Streetwear</button>
  <button class="filter-btn" data-filter="hair-care">Hair Care</button>
  <button class="filter-btn" data-filter="supplement">Supplement</button>
  <button class="filter-btn" data-filter="fragrance">Fragrance</button>
  <button class="filter-btn" data-filter="jewelry">Jewelry</button>
  <button class="filter-btn" data-filter="pet">Pet</button>
  <button class="filter-btn" data-filter="home-decor">Home Decor</button>
  <button class="filter-btn" data-filter="kitchen">Kitchen</button>
  <button class="filter-btn" data-filter="apparel">Apparel</button>
  <button class="filter-btn" data-filter="baby">Baby</button>
  <button class="filter-btn" data-filter="outdoor">Outdoor</button>
  <button class="filter-btn" data-filter="bags">Bags</button>
  <button class="filter-btn" data-filter="tech">Tech</button>
  <button class="filter-btn" data-filter="fashion">Fashion</button>
  <button class="filter-btn" data-filter="watch">Watch</button>
  <button class="filter-btn" data-filter="eyewear">Eyewear</button>
  <button class="filter-btn" data-filter="sportwear">Sportswear</button>
</div>

<div class="project-grid" id="projectGrid">

  <div class="project-card" data-category="skin-care">
    <div class="project-preview">
      <a href="https://meowmeowtweet.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/meow-meow-tweet.webp" alt="Meow Meow Tweet" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Meow Meow Tweet</h3>
      <span class="project-category">Skin Care</span>
      <a class="project-visit" href="https://meowmeowtweet.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="hair-care">
    <div class="project-preview">
      <a href="https://www.briogeohair.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/briogeo.webp" alt="Briogeo" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Briogeo</h3>
      <span class="project-category">Hair Care</span>
      <a class="project-visit" href="https://www.briogeohair.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="supplement">
    <div class="project-preview">
      <a href="https://magicmind.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/magic-mind.webp" alt="Magic Mind" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Magic Mind</h3>
      <span class="project-category">Supplement</span>
      <a class="project-visit" href="https://magicmind.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="coffee">
    <div class="project-preview">
      <a href="https://chamberlaincoffee.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/chamberlain-coffee.webp" alt="Chamberlain Coffee" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Chamberlain Coffee</h3>
      <span class="project-category">Coffee</span>
      <a class="project-visit" href="https://chamberlaincoffee.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="fragrance">
    <div class="project-preview">
      <a href="https://snif.co/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/snif.webp" alt="Snif" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Snif</h3>
      <span class="project-category">Fragrance</span>
      <a class="project-visit" href="https://snif.co/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="jewelry">
    <div class="project-preview">
      <a href="https://www.kateandkole.com.au/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/kate-and-kole.webp" alt="Kate & Kole" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Kate & Kole</h3>
      <span class="project-category">Jewelry</span>
      <a class="project-visit" href="https://www.kateandkole.com.au/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="pet">
    <div class="project-preview">
      <a href="https://wildone.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/wild-one.webp" alt="Wild One" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Wild One</h3>
      <span class="project-category">Pet</span>
      <a class="project-visit" href="https://wildone.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="cloth">
    <div class="project-preview">
      <a href="https://www.maje.ae/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/maje.webp" alt="Maje" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Maje</h3>
      <span class="project-category">Cloth</span>
      <a class="project-visit" href="https://www.maje.ae/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="home-decor">
    <div class="project-preview">
      <a href="https://sundaycitizen.co/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/sunday-citizen.webp" alt="Sunday Citizen" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Sunday Citizen</h3>
      <span class="project-category">Home Decor</span>
      <a class="project-visit" href="https://sundaycitizen.co/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="kitchen">
    <div class="project-preview">
      <a href="https://fromourplace.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/our-place.webp" alt="Our Place" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Our Place</h3>
      <span class="project-category">Kitchen</span>
      <a class="project-visit" href="https://fromourplace.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="apparel">
    <div class="project-preview">
      <a href="https://negativeunderwear.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/negative-underwear.webp" alt="Negative Underwear" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Negative Underwear</h3>
      <span class="project-category">Apparel</span>
      <a class="project-visit" href="https://negativeunderwear.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="baby">
    <div class="project-preview">
      <a href="https://www.meetlalo.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/lalo.webp" alt="Lalo" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Lalo</h3>
      <span class="project-category">Baby</span>
      <a class="project-visit" href="https://www.meetlalo.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="outdoor">
    <div class="project-preview">
      <a href="https://www.parksproject.us/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/parks-project.webp" alt="Parks Project" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Parks Project</h3>
      <span class="project-category">Outdoor</span>
      <a class="project-visit" href="https://www.parksproject.us/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="bags">
    <div class="project-preview">
      <a href="https://bellroy.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/bellroy.webp" alt="Bellroy" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Bellroy</h3>
      <span class="project-category">Bags</span>
      <a class="project-visit" href="https://bellroy.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="tech">
    <div class="project-preview">
      <a href="https://www.nativeunion.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/native-union.webp" alt="Native Union" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Native Union</h3>
      <span class="project-category">Tech</span>
      <a class="project-visit" href="https://www.nativeunion.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="fashion">
    <div class="project-preview">
      <a href="https://kotn.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/kotn.webp" alt="Kotn" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Kotn</h3>
      <span class="project-category">Fashion</span>
      <a class="project-visit" href="https://kotn.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="footwear">
    <div class="project-preview">
      <a href="https://www.allbirds.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/allbirds.webp" alt="Allbirds" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Allbirds</h3>
      <span class="project-category">Footwear</span>
      <a class="project-visit" href="https://www.allbirds.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="watch">
    <div class="project-preview">
      <a href="https://gharyal.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/gharyal.webp" alt="Gharyal" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Gharyal</h3>
      <span class="project-category">Watch</span>
      <a class="project-visit" href="https://gharyal.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="cloth">
    <div class="project-preview">
      <a href="https://nureh.pk/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/nureh.webp" alt="Nureh" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Nureh</h3>
      <span class="project-category">Cloth</span>
      <a class="project-visit" href="https://nureh.pk/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="streetwear">
    <div class="project-preview">
      <a href="https://www.shopmanto.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/manto.webp" alt="Manto" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Manto</h3>
      <span class="project-category">Streetwear</span>
      <a class="project-visit" href="https://www.shopmanto.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="skin-care">
    <div class="project-preview">
      <a href="https://conaturalintl.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/conatural.webp" alt="Conatural" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Conatural</h3>
      <span class="project-category">Skin Care</span>
      <a class="project-visit" href="https://conaturalintl.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="eyewear">
    <div class="project-preview">
      <a href="https://opticworld.pk/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/optic-world.webp" alt="Optic World" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Optic World</h3>
      <span class="project-category">Eyewear</span>
      <a class="project-visit" href="https://opticworld.pk/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="sportwear">
    <div class="project-preview">
      <a href="https://theirongear.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/iron-gear.webp" alt="Iron Gear" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Iron Gear</h3>
      <span class="project-category">Sportswear</span>
      <a class="project-visit" href="https://theirongear.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="coffee">
    <div class="project-preview">
      <a href="https://raazlife.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/raaz.webp" alt="Raaz" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Raaz</h3>
      <span class="project-category">Coffee</span>
      <a class="project-visit" href="https://raazlife.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="footwear">
    <div class="project-preview">
      <a href="https://ca.vessi.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/vessi.webp" alt="Vessi" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Vessi</h3>
      <span class="project-category">Footwear</span>
      <a class="project-visit" href="https://ca.vessi.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-category="cloth">
    <div class="project-preview">
      <a href="https://www.rhodeskin.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/projects/rhode.webp" alt="Rhode Skin" loading="lazy">
      </a>
      <div class="project-preview-overlay"></div>
      <span class="scroll-hint">↕ Hover to scroll</span>
    </div>
    <div class="project-info">
      <h3>Rhode Skin</h3>
      <span class="project-category">Cloth</span>
      <a class="project-visit" href="https://www.rhodeskin.com/" target="_blank" rel="noopener noreferrer">
        Visit Store <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-type="finance" data-category="finance">
    <div class="project-preview finance-preview" style="background: linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 100%);">
      <div class="finance-icon">
        <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
      </div>
      <div class="finance-tools">
        <span class="finance-badge">Power BI</span>
        <span class="finance-badge">Excel</span>
        <span class="finance-badge">DAX</span>
      </div>
    </div>
    <div class="project-info">
      <h3>Finance KPIs Dashboard</h3>
      <span class="project-category">Finance &amp; Analytics</span>
      <p class="finance-desc">Real-time Power BI + Excel dashboard tracking revenue, expenses, profit margins, cash flow, and growth trends for business decision-making.</p>
      <a class="project-visit" href="https://github.com/alibhatti23/Finance_KPIs_Dashboard" target="_blank" rel="noopener noreferrer">
        View on GitHub <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-type="finance" data-category="finance">
    <div class="project-preview finance-preview" style="background: linear-gradient(135deg, #1a5c3a 0%, #2d9e6b 100%);">
      <div class="finance-icon">
        <svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
      </div>
      <div class="finance-tools">
        <span class="finance-badge">Excel</span>
        <span class="finance-badge">Scenario Analysis</span>
        <span class="finance-badge">Forecasting</span>
      </div>
    </div>
    <div class="project-info">
      <h3>Budget &amp; Forecasting Model</h3>
      <span class="project-category">Finance &amp; Analytics</span>
      <p class="finance-desc">Excel-based financial planning system with scenario analysis, budgeting, and revenue forecasting — built for real business use.</p>
      <a class="project-visit" href="https://github.com/alibhatti23/Budget-Forcasting-Model" target="_blank" rel="noopener noreferrer">
        View on GitHub <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-type="finance" data-category="finance">
    <div class="project-preview finance-preview" style="background: linear-gradient(135deg, #4a1c6b 0%, #8b38c2 100%);">
      <div class="finance-icon">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="finance-tools">
        <span class="finance-badge">Power BI</span>
        <span class="finance-badge">Excel</span>
        <span class="finance-badge">Sales Analytics</span>
      </div>
    </div>
    <div class="project-info">
      <h3>Sales Performance Analytics</h3>
      <span class="project-category">Finance &amp; Analytics</span>
      <p class="finance-desc">Visualizes business metrics including revenue, profit, expenses, sales trends, and top-performing products across time periods.</p>
      <a class="project-visit" href="https://github.com/alibhatti23/Sales-Performance-Analytics-Dashboard" target="_blank" rel="noopener noreferrer">
        View on GitHub <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

  <div class="project-card" data-type="finance" data-category="finance">
    <div class="project-preview finance-preview" style="background: linear-gradient(135deg, #7a3500 0%, #d4620a 100%);">
      <div class="finance-icon">
        <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      </div>
      <div class="finance-tools">
        <span class="finance-badge">Excel</span>
        <span class="finance-badge">Bookkeeping</span>
        <span class="finance-badge">P&amp;L</span>
      </div>
    </div>
    <div class="project-info">
      <h3>Small Business Bookkeeping System</h3>
      <span class="project-category">Finance &amp; Analytics</span>
      <p class="finance-desc">Structured bookkeeping system for tracking income, expenses, cash flow, and P&amp;L statements — designed for small business owners.</p>
      <a class="project-visit" href="https://github.com/alibhatti23/Business-Bookkeeping-System" target="_blank" rel="noopener noreferrer">
        View on GitHub <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  </div>

</div>

<script>
(function() {
  const CONTAINER_H = 260;

  document.querySelectorAll('.project-preview img').forEach(img => {
    const apply = () => {
      const naturalH = img.naturalHeight;
      const renderedH = img.offsetWidth * (naturalH / img.naturalWidth);
      if (renderedH > CONTAINER_H) {
        const scrollPx = renderedH - CONTAINER_H;
        const scrollPct = (scrollPx / renderedH) * 100;
        img.style.setProperty('--scroll-amount', `-${scrollPct.toFixed(1)}%`);
      } else {
        img.style.setProperty('--scroll-amount', '0%');
      }
    };
    if (img.complete && img.naturalHeight > 0) apply();
    else img.addEventListener('load', apply);
  });

  const typeBtns = document.querySelectorAll('.type-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const categoryFilters = document.getElementById('categoryFilters');
  const cards = document.querySelectorAll('.project-card');
  const grid = document.getElementById('projectGrid');

  let currentType = 'all';
  let currentCategory = 'all';

  function updateGrid() {
    let visible = 0;
    cards.forEach(card => {
      const cardType = card.dataset.type || 'shopify';
      const cardCategory = card.dataset.category || '';
      const typeMatch = currentType === 'all' || cardType === currentType;
      const catMatch = currentCategory === 'all' || cardCategory === currentCategory;
      const show = typeMatch && catMatch;
      card.style.display = show ? 'flex' : 'none';
      if (show) visible++;
    });
    let noResult = grid.querySelector('.no-results');
    if (visible === 0) {
      if (!noResult) {
        noResult = document.createElement('p');
        noResult.className = 'no-results';
        noResult.textContent = 'No projects in this category yet.';
        grid.appendChild(noResult);
      }
    } else if (noResult) {
      noResult.remove();
    }
  }

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.dataset.type;
      if (currentType === 'finance') {
        categoryFilters.classList.add('hidden');
      } else {
        categoryFilters.classList.remove('hidden');
      }
      currentCategory = 'all';
      filterBtns.forEach(b => b.classList.remove('active'));
      filterBtns[0].classList.add('active');
      updateGrid();
    });
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.filter;
      updateGrid();
    });
  });
})();
</script>

