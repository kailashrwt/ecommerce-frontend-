import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/",   // FINAL — Only slash, nothing else
  plugins: [react()],
})
