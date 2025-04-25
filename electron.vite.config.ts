import path from "node:path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    publicDir: path.resolve("resources"),
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      "process.platform": JSON.stringify(process.platform),
    },
    resolve: {
      alias: {
        "@renderer": path.resolve("src/renderer/src"),
      },
    },
    css: {
      postcss: "./postcss.config.mjs",
    },
    plugins: [tailwindcss(), react()],
  },
});
