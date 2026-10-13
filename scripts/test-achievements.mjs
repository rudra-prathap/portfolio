import { chromium } from "playwright";

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const el = await page.$("#achievements");
  const box = await el.boundingBox();
  console.log("Achievements box:", box);

  // Scroll to start of achievements
  await page.evaluate((top) => window.scrollTo(0, top), box.y);
  await page.waitForTimeout(600);
  await page.screenshot({ path: "public/screenshots/achievements-start.png" });

  // Scroll 500px down
  await page.evaluate((top) => window.scrollTo(0, top + 500), box.y);
  await page.waitForTimeout(600);
  await page.screenshot({ path: "public/screenshots/achievements-scroll.png" });

  await browser.close();
  console.log("Done");
}

test().catch(console.error);
