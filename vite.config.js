import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url"
import vue from '@vitejs/plugin-vue'
import electron from "vite-plugin-electron"
import { join, resolve } from "path"
import externalGlobals from 'rollup-plugin-external-globals'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', 
  plugins: [
    vue(),
    electron({
      main: {
        entry: "electron/main.js",
        vite: withDebug({
          build: {
            outDir: "dist/electron/main"
          }
        })
        // entries: ['./electron/ipc.js']
      },
      // ipc: {
      //   input: join(__dirname, "./electron/ipc.js"),
      // },
      // ipc: {
      //   input: {
      //     // You can configure multiple preload here
      //     index: join(__dirname, "electron/ipc.js")
      //   },
      //   vite: {
      //     build: {
      //       // For Debug
      //       sourcemap: "inline",
      //       outDir: "./dist-electron"
      //     }
      //   }
      // },
      // utils: {
      //   input: {
      //     // You can configure multiple preload here
      //     index: join(__dirname, "electron/utils")
      //   },
      //   vite: {
      //     build: {
      //       // For Debug
      //       sourcemap: "inline",
      //       outDir: "./dist-electron"
      //     }
      //   }
      // },
      // Enables use of Node.js API in the Renderer-process
      renderer: {}
    })
  ],
  rollupOptions: {
    external: ['vue', 'element-plus'],
    plugins: [
      externalGlobals({
        vue: 'Vue',
        'element-plus': 'ElementPlus'
      })
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${resolve(__dirname, 'src/styles/variables.less')}";`
      }
    }
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT
  }
})

function withDebug(config) {
  if (process.env.VSCODE_DEBUG) {
    if (!config.build) config.build = {};
    config.build.sourcemap = true;
    config.plugins = (config.plugins || []).concat({
      name: "electron-vite-debug",
      configResolved(config) {
        const index = config.plugins.findIndex(
          (p) => p.name === "electron-main-watcher"
        );
        // At present, Vite can only modify plugins in configResolved hook.
        (config.plugins).splice(index, 1);
      },
    });
  }
  return config;
}