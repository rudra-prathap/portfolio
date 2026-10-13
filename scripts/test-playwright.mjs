import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function runTests() {
  const screenshotsDir = path.resolve("public/screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors = [];

  // 1. Desktop test at 1440x900
  console.log("=== Testing Desktop (1440x900) ===");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  desktopPage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`Desktop Console Error: ${msg.text()}`);
    }
  });

  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(1000);

  const desktopScrollWidth = await desktopPage.evaluate(
    () => document.documentElement.scrollWidth
  );
  const desktopInnerWidth = await desktopPage.evaluate(() => window.innerWidth);
  const desktopHasOverflow = desktopScrollWidth > desktopInnerWidth;

  console.log(`Desktop innerWidth: ${desktopInnerWidth}, scrollWidth: ${desktopScrollWidth}`);
  console.log(`Desktop Horizontal Overflow: ${desktopHasOverflow ? "FAIL" : "PASS (0px overflow)"}`);

  const desktopScreenshot = path.join(screenshotsDir, "desktop-1440x900.png");
  await desktopPage.screenshot({ path: desktopScreenshot, fullPage: false });
  console.log(`Saved desktop screenshot to ${desktopScreenshot}`);

  await desktopContext.close();

  // 2. Mobile test at 390x844
  console.log("\n=== Testing Mobile (390x844) ===");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`Mobile Console Error: ${msg.text()}`);
    }
  });

  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);

  const mobileScrollWidth = await mobilePage.evaluate(
    () => document.documentElement.scrollWidth
  );
  const mobileInnerWidth = await mobilePage.evaluate(() => window.innerWidth);
  const mobileHasOverflow = mobileScrollWidth > mobileInnerWidth;

  console.log(`Mobile innerWidth: ${mobileInnerWidth}, scrollWidth: ${mobileScrollWidth}`);
  console.log(`Mobile Horizontal Overflow: ${mobileHasOverflow ? "FAIL" : "PASS (0px overflow)"}`);

  const mobileScreenshot = path.join(screenshotsDir, "mobile-390x844.png");
  await mobilePage.screenshot({ path: mobileScreenshot, fullPage: false });
  console.log(`Saved mobile screenshot to ${mobileScreenshot}`);

  await mobileContext.close();
  await browser.close();

  console.log("\n=== Console Errors Report ===");
  if (consoleErrors.length === 0) {
    console.log("PASS: 0 console errors detected!");
  } else {
    console.log(`Detected ${consoleErrors.length} errors:`, consoleErrors);
  }

  if (desktopHasOverflow || mobileHasOverflow || consoleErrors.length > 0) {
    process.exit(1);
  } else {
    console.log("\nALL PLAYWRIGHT TESTS PASSED!");
  }
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
