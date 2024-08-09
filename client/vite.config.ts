import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, //permet à Vite d'utiliser votre adresse IP locale
    port: 5174, //port de votre serveur
  },

  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        serviceWorker: path.resolve(__dirname, 'src/service-worker.js'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
