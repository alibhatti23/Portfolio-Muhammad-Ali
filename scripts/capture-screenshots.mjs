import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'static', 'assets', 'projects');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const stores = [
  { name: 'meow-meow-tweet', url: 'https://meowmeowtweet.com/' },
  { name: 'briogeo', url: 'https://www.briogeohair.com/' },
  { name: 'magic-mind', url: 'https://magicmind.com/' },
  { name: 'chamberlain-coffee', url: 'https://chamberlaincoffee.com/' },
  { name: 'snif', url: 'https://snif.co/' },
  { name: 'kate-and-kole', url: 'https://www.kateandkole.com.au/' },
  { name: 'wild-one', url: 'https://wildone.com/' },
  { name: 'maje', url: 'https://www.maje.ae/' },
  { name: 'sunday-citizen', url: 'https://sundaycitizen.co/' },
  { name: 'our-place', url: 'https://fromourplace.com/' },
  { name: 'negative-underwear', url: 'https://negativeunderwear.com/' },
  { name: 'lalo', url: 'https://www.meetlalo.com/' },
  { name: 'parks-project', url: 'https://www.parksproject.us/' },
  { name: 'bellroy', url: 'https://bellroy.com/' },
  { name: 'native-union', url: 'https://www.nativeunion.com/' },
  { name: 'kotn', url: 'https://kotn.com/' },
  { name: 'allbirds', url: 'https://www.allbirds.com/' },
  { name: 'gharyal', url: 'https://gharyal.com/' },
  { name: 'nureh', url: 'https://nureh.pk/' },
  { name: 'manto', url: 'https://www.shopmanto.com/' },
  { name: 'conatural', url: 'https://conaturalintl.com/' },
  { name: 'optic-world', url: 'https://opticworld.pk/' },
  { name: 'iron-gear', url: 'https://theirongear.com/' },
  { name: 'raaz', url: 'https://raazlife.com/' },
  { name: 'vessi', url: 'https://ca.vessi.com/' },
  { name: 'rhode-skin', url: 'https://www.rhodeskin.com/' },
];

// Selectors commonly used by cookie/popup banners
const DISMISS_SELECTORS = [
  '[id*="cookie"] button', '[class*="cookie"] button',
  '[id*="consent"] button', '[class*="consent"] button',
  '[id*="gdpr"] button', '[class*="gdpr"] button',
  '[aria-label*="Accept"]', '[aria-label*="Close"]',
  'button[class*="accept"]', 'button[class*="close"]',
  'button[class*="dismiss"]', 'button[class*="decline"]',
  '.cc-accept', '.cc-btn', '#onetrust-accept-btn-handler',
  '.js-cookie-accept', '[data-testid="cookie-accept"]',
];

async function dismissBanners(page) {
  for (const sel of DISMISS_SELECTORS) {
    try {
      const el = await page.$(sel);
      if (el) { await el.click(); await new Promise(r => setTimeout(r, 400)); }
    } catch {}
  }
  await page.keyboard.press('Escape');
}

async function capture(browser, store, force = false) {
  const outPath = path.join(OUTPUT_DIR, `${store.name}.webp`);
  if (!force && fs.existsSync(outPath)) {
    console.log(`  skipping (exists): ${store.name}`);
    return;
  }
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1440, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36');
    // Block ads/trackers to speed up and reduce visual noise
    await page.setRequestInterception(true);
    page.on('request', req => {
      const url = req.url();
      if (['image/gif', 'font'].includes(req.resourceType()) && !url.includes(store.url)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    try {
      await page.goto(store.url, { waitUntil: 'networkidle2', timeout: 45000 });
    } catch {
      await page.goto(store.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    }

    // Let hero images & fonts load
    await new Promise(r => setTimeout(r, 4000));
    // Try to dismiss cookie/popup banners
    await dismissBanners(page);
    await new Promise(r => setTimeout(r, 800));
    // Scroll to top to ensure hero is visible
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({ path: outPath, fullPage: true, type: 'webp', quality: 85 });
    console.log(`  ✓ ${store.name}`);
  } catch (err) {
    console.log(`  ✗ ${store.name}: ${err.message}`);
  } finally {
    await page.close();
  }
}

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  console.log(`Capturing ${stores.length} stores → ${OUTPUT_DIR}\n`);

  const force = process.argv.includes('--force');
  if (force) console.log('Force mode: re-capturing all screenshots\n');

  // Run 2 at a time (slower but more reliable for JS-heavy sites)
  for (let i = 0; i < stores.length; i += 2) {
    const batch = stores.slice(i, i + 2);
    await Promise.all(batch.map(s => capture(browser, s, force)));
  }

  await browser.close();
  console.log('\nDone! All screenshots saved.');
})();
