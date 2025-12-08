import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/",   // 👈 सिर्फ ये रखना है
  plugins: [react()],
})
