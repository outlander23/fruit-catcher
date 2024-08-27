import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/fruit-catcher/', // Replace with your repository name
  plugins: [react()],
});
