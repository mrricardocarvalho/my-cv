import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'; 

const isAnalyze = process.env.ANALYZE === 'true';

export default defineConfig({
  base: '/my-cv/',
  plugins: [
    react(),
    isAnalyze && visualizer({
      open: true,
      filename: 'bundle-report.html',
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  build: {
    outDir: 'docs'
  }
})
