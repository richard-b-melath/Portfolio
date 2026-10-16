import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { vitePluginSmtp } from "./src/server/vitePluginSmtp";

// Generates static fallback files in dist so /card works on any static host out-of-the-box
const spaFallbackPlugin = () => ({
  name: "spa-fallback-plugin",
  closeBundle() {
    const distDir = path.resolve(__dirname, "dist");
    const indexHtml = path.resolve(distDir, "index.html");
    if (fs.existsSync(indexHtml)) {
      // 1. Create dist/card/index.html and dist/card.html
      const cardDir = path.resolve(distDir, "card");
      if (!fs.existsSync(cardDir)) {
        fs.mkdirSync(cardDir, { recursive: true });
      }
      fs.copyFileSync(indexHtml, path.resolve(cardDir, "index.html"));
      fs.copyFileSync(indexHtml, path.resolve(distDir, "card.html"));

      // 2. Create dist/404.html (for GitHub Pages & generic static hosts)
      fs.copyFileSync(indexHtml, path.resolve(distDir, "404.html"));
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      vitePluginSmtp(env),
      spaFallbackPlugin(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
