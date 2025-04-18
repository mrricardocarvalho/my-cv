import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // Or @vitejs/plugin-react if you use that

// https://vitejs.dev/config/
export default defineConfig({
  // Configure the base path for deployment
  base: '/my-cv/',
  plugins: [react()],
  build: {
    outDir: 'docs' // <<< CHANGE output directory to 'docs'
  }  
})
