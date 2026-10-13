import { chromium } from "playwright";

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const sections = ["about", "skills", "work", "certifications", "experience", "achievements", "contact"];
  for (const s of sections) {
    const el = await page.$(`#${s}`);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({ path: `public/screenshots/section-${s}.png` });
      console.log(`Captured section: ${s}`);
    }
  }
  await browser.close();
  console.log("Finished capturing sections.");
}

capture().catch(console.error);
