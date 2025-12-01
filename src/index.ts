import { serve } from "bun";
import index from "./index.html";

let counter = 0;

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
    "/api/counter": {
        async GET() {
          return Response.json({ count: counter });
        },
        async POST(req) {
          const body = await req.json();
          if (body.action === "increment") counter++;
          else if (body.action === "decrement") counter--;
          else if (body.action === "reset") counter = 0;

          return Response.json({ count: counter });
        },
    }
  }
});

console.log(`🚀 Server running at ${server.url}`);
