import { defineConfig } from "vite";

// There are the vite setting used when running "npm run build"
export default defineConfig({
    build: {
        outDir: "_site",
        cssCodeSplit: false,
        emptyOutDir: false,
        rollupOptions: {
            input: {
                main: "src/main.ts",
                styles: "src/scss/main.scss"
            },
            output: {
                entryFileNames: "assets/main.js", // Renames main.ts and places it in the 'assets' folder
                assetFileNames: "assets/[name].[ext]", // Keep the asset name the same and places it in the 'assets' folder
            }
        },
    },
});