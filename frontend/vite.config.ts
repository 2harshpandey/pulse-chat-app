import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const compatEnv: Record<string, string> = {
    NODE_ENV: mode,
  };

  for (const [key, value] of Object.entries(env)) {
    if (key.startsWith('REACT_APP_')) compatEnv[key] = value;
  }

  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
    },
    preview: {
      port: 3000,
      host: true,
    },
    build: {
      outDir: 'build',
    },
    define: {
      'process.env': compatEnv,
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      globals: true,
    },
  };
});
