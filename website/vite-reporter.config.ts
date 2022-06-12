import { build, defineConfig } from 'vite'
import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte({
        emitCss: false,
    })],
    build: {
        lib: {
            entry: path.resolve(__dirname, './src/reporter/src/main.ts'),
            name: 'Reporter',
            formats: ['umd'],
        },
        outDir: path.resolve(__dirname, 'dist-reporter'),
    },
})
