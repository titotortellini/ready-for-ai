import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      "process.env.NODE_ENV":
        mode === "production" ? "'production'" : "'development'",
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      lib: {
        entry: "src/main.jsx", // Path to your main file
        formats: ["iife"], // Use Immediately Invoked Function Expression for browser compatibility
        name: "App",
      },
      rollupOptions: {
        external: [],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
          entryFileNames: "bundle.js", // Name of the bundled file
        },
      },
    },
  };
});
