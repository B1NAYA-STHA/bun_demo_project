import { serve } from "bun";
import { chromium } from "playwright";
import indexHtml from "./index.html";


const server = serve({
  port: 3000,
  routes: {
    // Serve frontend
    "/*": indexHtml,

    // Screenshot API route
    "/screenshot": async (req: Request) => {
      if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      try {
        const data = await req.json();
        const url: string | undefined = data.url;

        if (!url) {
          return new Response(JSON.stringify({ error: "URL is required" }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        const fileName = new URL(url).hostname.replace(/\W+/g, "_") + ".png";
        const filePath = `demo_bun_project\\src\\screenshots/${fileName}`;

        console.log("Navigating to:", url);

        console.log("Saving screenshot to:", filePath);

        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "networkidle"});
        await page.screenshot({ path: filePath, fullPage: true });
        
        console.log("Screenshot saved successfully!");

        await browser.close();

        return new Response(JSON.stringify({ message: "Screenshot saved", path: filePath }), {
          headers: { "Content-Type": "application/json" },
        });

      } catch (err) {
        console.error("Screenshot failed:", err);
        return new Response(JSON.stringify({ error: (err as Error).message }), {
          headers: { "Content-Type": "application/json" },
        });
      }
    },
  },
});

console.log(`Server running at http://localhost:3000`);