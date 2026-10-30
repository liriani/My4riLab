import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  // The site is served from the custom domain by4ri.com (see public/CNAME),
  // so it lives at the domain root. Without a custom domain, GitHub Pages would
  // serve it from /My4riLab/ instead: build with BASE_PATH=/My4riLab/ for that.
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), tailwindcss()],
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
