import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'
import {fileURLToPath} from "node:url";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@generic': fileURLToPath(new URL('./src/generic', import.meta.url)),
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        globals: false,
        css: true,
    },
})
