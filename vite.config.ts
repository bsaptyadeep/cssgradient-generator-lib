import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            include: ["src"],
            exclude: ["src/main.tsx", "src/App.tsx", "src/vite-env.d.ts"]
        })
    ],
    server: {
        port: 5173
    },
    build: {
        lib: {
          entry: path.resolve(__dirname, "src/index.ts"),
          name: "GradientEditor",
          fileName: (format) => `index.${format}.js`,
          formats: ["es", "umd"]
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
    }
})