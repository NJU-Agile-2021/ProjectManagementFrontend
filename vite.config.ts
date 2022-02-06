import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import type { ConfigEnv, UserConfigExport } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { injectHtml, minifyHtml } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'
import WindiCSS from 'vite-plugin-windicss'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  console.log(env)
  return defineConfig({
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    plugins: [
      vue(),
      minifyHtml(),
      injectHtml({
        injectData: {
          title: env['VITE_APP_TITLE'],
        },
      }),
      WindiCSS(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: mode == 'development',
      }),
    ],
    server: {
      port: parseInt(env['VITE_PORT']),
    },
  })
}
