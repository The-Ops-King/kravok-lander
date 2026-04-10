import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/kravok-lander/' : '/',
  server: { port: 3333, strictPort: true, open: true },
});
