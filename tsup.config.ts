import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@tanstack/react-query',
    'react-router',
    'react-hook-form',
    'zod',
    'zustand',
    'tailwindcss'
  ],
  treeshake: true,
  splitting: false,
  sourcemap: true,
  minify: process.env.NODE_ENV === 'production'
});
