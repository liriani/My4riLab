import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { pageMeta, SITE_ORIGIN, siteRoutes, type PageMeta } from "./src/data/seo";

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The built index.html with one page's title, description and share tags. */
function withMeta(shell: string, meta: PageMeta) {
  const url = SITE_ORIGIN + (meta.path === "/" ? "/" : meta.path);
  const tags = [
    ...(meta.notFound ? [] : [`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`]),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="By4ri" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    ...(meta.noindex ? [`<meta name="robots" content="noindex" />`] : []),
  ];
  return shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);
}

/**
 * GitHub Pages has no SPA fallback: a deep link like /projects/creators-fit is
 * answered by 404.html with an HTTP 404, so crawlers treat it as missing. Pages
 * does serve /name from name.html, so each route gets its own entry (with its
 * own title and description) and returns 200. Unknown paths still fall through
 * to 404.html, a real 404. Indexable routes are listed in sitemap.xml.
 */
function routeEntries(): Plugin {
  let outDir = "dist";
  return {
    name: "route-entries",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const shell = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
      const write = (file: string, html: string) => {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
      };

      for (const route of siteRoutes) {
        const html = withMeta(shell, pageMeta(route));
        write(path.join(outDir, route === "/" ? "index.html" : `${route.slice(1)}.html`), html);
        // /projects and /lab are also folders; an index covers hosts that prefer the folder.
        if (route === "/projects" || route === "/lab") write(path.join(outDir, route.slice(1), "index.html"), html);
      }
      write(path.join(outDir, "404.html"), withMeta(shell, pageMeta("/404")));

      const urls = siteRoutes
        .filter((route) => !pageMeta(route).noindex)
        .map((route) => `  <url><loc>${SITE_ORIGIN}${route === "/" ? "/" : route}</loc></url>`);
      write(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  // The site is served from the custom domain by4ri.com (see public/CNAME),
  // so it lives at the domain root. Without a custom domain, GitHub Pages would
  // serve it from /My4riLab/ instead: build with BASE_PATH=/My4riLab/ for that.
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), tailwindcss(), routeEntries()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "8443"),
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "8443"),
  },
});
