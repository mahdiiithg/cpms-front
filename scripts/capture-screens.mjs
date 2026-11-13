import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const OUT = '/cursor/stores/self/media/evolution';
const ART = '/opt/cursor/artifacts';
const URL = 'http://localhost:3010/';

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(ART, { recursive: true });

const viewports = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1920', width: 1920, height: 1080 },
  { name: '390', width: 390, height: 844 },
];

async function shot(page, file) {
  const full = path.join(OUT, file);
  await page.screenshot({ path: full, fullPage: false });
  fs.copyFileSync(full, path.join(ART, file));
  console.log('saved', full);
}

async function shotFull(page, file) {
  const full = path.join(OUT, file);
  await page.screenshot({ path: full, fullPage: true });
  fs.copyFileSync(full, path.join(ART, file));
  console.log('saved', full);
}

const browser = await chromium.launch({ headless: true });

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on('pageerror', (err) => console.error('PAGEERROR', vp.name, err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('CONSOLE', vp.name, msg.text());
  });

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1200);

  await shot(page, `hero-${vp.name}.png`);
  await shotFull(page, `full-${vp.name}.png`);

  // Demo interaction at 1440
  if (vp.name === '1440') {
    await page.locator('#demo').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await shot(page, `demo-1440.png`);

    const handover = page.getByRole('tab', { name: /Hand over|واگذاری|تحويل/i }).first();
    if (await handover.count()) {
      await handover.click();
      await page.waitForTimeout(1800);
      await shot(page, `demo-handover-1440.png`);
    }

    // Language FA RTL
    await page.evaluate(() => window.scrollTo(0, 0));
    const fa = page.getByRole('button', { name: 'FA' }).first();
    await fa.click();
    await page.waitForTimeout(800);
    await shot(page, `hero-fa-rtl-1440.png`);
    const dir = await page.evaluate(() => document.documentElement.dir);
    console.log('FA dir=', dir);

    const ar = page.getByRole('button', { name: 'AR' }).first();
    await ar.click();
    await page.waitForTimeout(800);
    await shot(page, `hero-ar-rtl-1440.png`);
    console.log(
      'AR dir=',
      await page.evaluate(() => document.documentElement.dir),
    );

    await page.getByRole('button', { name: 'EN' }).first().click();
    await page.waitForTimeout(400);
  }

  if (vp.name === '390') {
    const menu = page.getByRole('button', { name: /Open menu|Close menu/i });
    if (await menu.count()) {
      await menu.click();
      await page.waitForTimeout(500);
      await shot(page, `mobile-menu-390.png`);
    }
  }

  await context.close();
}

await browser.close();
console.log('done');
