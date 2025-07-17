import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001", // this concats at the beginning of /api
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 👈 alias @ to /src
    },
  },
});
