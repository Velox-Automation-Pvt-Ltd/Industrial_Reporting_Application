import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';
import flowbiteReact from 'flowbite-react/plugin/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src'),
    },
  },

  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.tsx?$/,
    exclude: [],
  },

  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-tsx',
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: 'tsx',
              contents: await fs.readFile(args.path, 'utf8'),
            }));
          },
        },
      ],
    },
  },

  // ✅ Set custom output directory for build

  build: {
    outDir: '../backend/src/main/resources/static',
    emptyOutDir: true, // clears the folder before build
  },

  plugins: [svgr(), react(), flowbiteReact(), tailwindcss()],
});
