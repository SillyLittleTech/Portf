import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SECURITY_HEADERS } from "./security-headers.config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ADMIN_ASSETS_DIR = resolve(__dirname, "admin-assets");
const TOOLS_DIR = resolve(__dirname, "src/tools");

const TOOL_SLUGS = ["visualizeme", "convert"] as const;

const TOOL_HTML_INPUTS: Record<string, string> = Object.fromEntries(
  TOOL_SLUGS.map((slug) => [
    `tools/${slug}.html`,
    resolve(TOOLS_DIR, `${slug}.html`),
  ]),
);

const TOOL_ASSET_DIRECTORIES = [
  {
    source: resolve(TOOLS_DIR, "json"),
    relative: ["tools", "json"],
  },
];

function copyDirectory(source: string, destination: string) {
  if (!existsSync(destination)) {
    mkdirSync(destination, { recursive: true });
  }
  for (const entry of readdirSync(source)) {
    const sourcePath = join(source, entry);
    const destinationPath = join(destination, entry);
    const stats = statSync(sourcePath);
    if (stats.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      copyFileSync(sourcePath, destinationPath);
    }
  }
}

function copyAdminAssets(): Plugin {
  let resolvedOutDir = "";
  let projectRoot = process.cwd();
  return {
    name: "copy-admin-assets",
    apply: "build",
    configResolved(config) {
      resolvedOutDir = config.build.outDir;
      projectRoot = config.root;
    },
    generateBundle() {
      if (!existsSync(ADMIN_ASSETS_DIR)) {
        this.warn("admin-assets directory not found; skipping copy.");
        return;
      }
      const targetDir = resolve(projectRoot, resolvedOutDir, "admin-assets");
      copyDirectory(ADMIN_ASSETS_DIR, targetDir);
    },
  };
}

function copyToolAssets(): Plugin {
  let resolvedOutDir = "";
  let projectRoot = process.cwd();
  return {
    name: "copy-tool-assets",
    apply: "build",
    configResolved(config) {
      resolvedOutDir = config.build.outDir;
      projectRoot = config.root;
    },
    generateBundle() {
      const targetRoot = resolve(projectRoot, resolvedOutDir);
      for (const directory of TOOL_ASSET_DIRECTORIES) {
        if (!existsSync(directory.source)) {
          continue;
        }
        const destination = resolve(targetRoot, ...directory.relative);
        if (!existsSync(destination)) {
          mkdirSync(destination, { recursive: true });
        }
        copyDirectory(directory.source, destination);
      }
    },
  };
}

function serveSecurityHeaders(): Plugin {
  return {
    name: "serve-security-headers",
    configurePreviewServer(server) {
      server.middlewares.use((_req, res, next) => {
        // Apply security headers from master config
        for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
          res.setHeader(key, value);
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  // ---------------------------------------------------------------------------
  // BASE PATH – read this if your site loads a blank page after deploying
  // ---------------------------------------------------------------------------
  // Vite rewrites every asset URL (JS chunks, CSS, fonts, images) at build time
  // to be relative to the `base` value below.  When the value is wrong, the
  // browser requests assets from the wrong path and the page is blank.
  //
  // SCENARIO A – root domain / subdomain  (e.g. https://yourname.github.io or
  //               https://portfolio.example.com)
  //   Leave VITE_BASE_URL unset.  `base` defaults to "/" and everything works
  //   as-is.  No changes needed here or in the build script.
  //
  // SCENARIO B – GitHub Pages repo sub-path  (e.g. https://org.github.io/Portf
  //               or a custom domain like https://projects.example.com/Portf/)
  //   Set VITE_BASE_URL to the sub-path, INCLUDING the leading and trailing
  //   slash (e.g. "/Portf/").  The `build:pages` script in package.json does
  //   this automatically for the default showcase deployment.  If your repo has
  //   a different name, update the value in:
  //     • the `build:pages` script in package.json
  //     • the VITE_BASE_URL env var in .github/workflows/github-pages.yml
  //
  // SCENARIO C – any other prefix  (e.g. Cloudflare Pages, Netlify, custom CDN)
  //   Pass VITE_BASE_URL=/<your-prefix>/ to the build command, or hard-code the
  //   value here if it never changes.  The router in
  //   src/utils/navigation.ts reads import.meta.env.BASE_URL at runtime and
  //   strips the prefix automatically, so no other files need changing.
  // ---------------------------------------------------------------------------
  base: process.env.VITE_BASE_URL ?? "/",
  plugins: [
    react(),
    copyAdminAssets(),
    copyToolAssets(),
    serveSecurityHeaders(),
  ],
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  server: {
    proxy: {
      "/__remote-data": {
        // Template default for remote data proxy. Point this at your data host
        // or set VITE_REMOTE_DATA_URL in production builds.
        target: "https://data.example.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/__remote-data/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ...TOOL_HTML_INPUTS,
      },
    },
  },
});
