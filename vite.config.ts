import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Using relative base './' ensures the bundle works seamlessly on GitHub Pages
// whether hosted at https://<user>.github.io/<repo>/ or a custom domain.
export default defineConfig({
  plugins: [react()],
  base: './',
});
