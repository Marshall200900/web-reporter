import { build, defineConfig } from 'vite'
import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    build: {
        lib: {
            entry: path.resolve(__dirname, './configurator/src/reporter/src/main.ts'),
            name: 'Reporter'
        },
        outDir: path.resolve(__dirname, 'dist-reporter'),
    },
})
