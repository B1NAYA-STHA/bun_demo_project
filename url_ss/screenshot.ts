import { chromium } from "playwright";

(async () => {
  // Get URL from command argument
  const url = process.argv[2];

  if (!url) {
    console.error("Please provide a correct URL.");
    process.exit(1);
  }

  // Launch browser in headless mode
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Open the URL and wait until everything loads
  await page.goto(url, { waitUntil: "networkidle" });

  // Create file name using the hostname
  const fileName = new URL(url).hostname.replace(/\W+/g, "_") + ".png";
  const filePath = `url_ss/screenshots/${fileName}`;

  // Take full page screenshot
  await page.screenshot({
    path: filePath,
    fullPage: true,
  });

  console.log(`Screenshot saved at: ${filePath}`);

  await browser.close();
  
})();
