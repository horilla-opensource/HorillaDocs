import json5 from "json5"; // Import the JSON5 parser
import fs from "fs"; // Node.js file system module
import { fileURLToPath, URL } from "node:url"; // URL utilities from Node.js
import { logPlugin } from "./vitepress-plugin-log"; // Import the custom plugin
import { defineConfig } from "vitepress";

// Read and parse the JSON5 files for the sidebars
const techSidebarPathv2 = "./docs/technical/v2.0/sidebar.json5";
const technicalSidebarv2 = json5.parse(
  fs.readFileSync(techSidebarPathv2, "utf8")
);

// const fSidebarPathv1 = './docs/functional/nav.json5';
// const fSidebarv1 = json5.parse(fs.readFileSync(fSidebarPathv1, 'utf8'));

const funcSidebarPathv1 = "./docs/functional/v1.0/sidebar.json5";
const funcSidebarv1 = json5.parse(fs.readFileSync(funcSidebarPathv1, "utf8"));

// Export the VitePress configuration
export default defineConfig({
  cleanUrls: true,
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL("./theme/components/NavLayout.vue", import.meta.url)
          ),
        },
        {
          find: /^.*\/VPNavBarMenu\.vue$/,
          replacement: fileURLToPath(
            new URL("./theme/components/VPNavBarMenu.vue", import.meta.url)
          ),
        },
        {
          find: /^.*\/VPCarbonAds\.vue$/,
          replacement: fileURLToPath(
            new URL("./theme/components/VPCarbonAds.vue", import.meta.url)
          ),
        },
      ],
    },
  },

  title: "Horilla Docs",
  lastUpdated: true,
  optimizeDeps: {
    include: ["vitepress/theme"],
  },
  server: {
    watch: {
      usePolling: true, // Enables polling for file changes
    },
  },
  themeConfig: {
    carbonAds: {
      link: "blah",
    },
    search: {
      provider: "local",
    },
    logo: {
      light: "/logo-icon.png",
      dark: "/horilla-logo-dark.png",
    },
    // Navigation bar configuration
    nav: [
      {
        link: "https://horilla.com",
        text: "Home",
      },
      {
        link: "https://github.com/horilla-opensource/horilla",
        text: '<span class="git-icon"><span>',
      },
      {
        link: "/technical/v2.0/",
        text: "Tech Docs",
        activeMatch: "/functional/",
      },
      {
        text: '<span id="activeVersion" >v2.0</span>',
        items: [{ text: "v2.0", link: "/technical/v2.0/" }],
        activeMatch: "/technical/",
      },
      {
        text: '<span id="activeVersion" >v1.0</span>',
        items: [
          // { text: 'v1.0', link: '/functional/v1.0/' },
          { text: "v1.0", link: "/functional/v1.0/" },
        ],
        activeMatch: "/functional/",
      },
    ],

    // Sidebar configuration
    sidebar: {
      "/": funcSidebarv1,
      "/functional/v1.0/": funcSidebarv1,
      "/technical/v2.0/": technicalSidebarv2,
    },

    // Add plugins
    plugins: [logPlugin()],
  },
});
