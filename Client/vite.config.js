import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    server: {
        headers: {
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin",
        },
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""), // remove base path
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(
                path.dirname(new URL(import.meta.url).pathname),
                "./src"
            ),
        },
    },
});
