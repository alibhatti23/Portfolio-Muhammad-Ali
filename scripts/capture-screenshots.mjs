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

async function capture(browser, store) {
  const outPath = path.join(OUTPUT_DIR, `${store.name}.webp`);
  if (fs.existsSync(outPath)) {
    console.log(`  skipping (exists): ${store.name}`);
    return;
  }
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1440, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36');
    try {
      await page.goto(store.url, { waitUntil: 'networkidle2', timeout: 45000 });
    } catch {
      // fallback: just wait for DOM
      await page.goto(store.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    }
    // wait for images/content to settle
    await new Promise(r => setTimeout(r, 3000));
    // dismiss cookie banners
    await page.keyboard.press('Escape');
    await page.screenshot({ path: outPath, fullPage: true, type: 'webp', quality: 80 });
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

  // Run 3 at a time to avoid overwhelming network
  for (let i = 0; i < stores.length; i += 3) {
    const batch = stores.slice(i, i + 3);
    await Promise.all(batch.map(s => capture(browser, s)));
  }

  await browser.close();
  console.log('\nDone! All screenshots saved.');
})();
