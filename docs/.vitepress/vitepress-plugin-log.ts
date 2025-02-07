// vitepress-plugin-log.ts

import { Plugin } from 'vite';

export function logPlugin(): Plugin {
    return {
        name: 'vitepress-log-plugin',

        configResolved(config) {
            console.log('VitePress config resolved:', config);
        },

        configureServer(server) {
            console.log('VitePress server running...');
        },

        transform(code, id) {
            console.log(`Transforming file: ${id}`);
            return code;
        },
    };
}
