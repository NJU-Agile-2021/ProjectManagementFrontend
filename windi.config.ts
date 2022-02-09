import { defineConfig } from 'vite-plugin-windicss'
import animationPlugin from '@windicss/plugin-animations'
// const animationPlugin = require('@windicss/plugin-animations')
function range(size: number, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt)
}

export default defineConfig({
  shortcuts: {
    'content-container': 'container mx-auto',
    'app-border': 'border-gray-200 dark:border-dark-300',
  },
  darkMode: 'class',
  safelist: [
    range(3).map((i) => `p-${i}`), // p-1 to p-3
    range(10).map((i) => `mt-${i}`), // mt-1 to mt-10
  ],
  plugins: [
    animationPlugin({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        animationDelaySpeed: 1000,
      },
    }),
  ],
  theme: {
    fontFamily: {
      element:
        "'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',\n" +
        "  'Microsoft YaHei', '微软雅黑', Arial, sans-serif",
    },
    boxShadow: {
      form: '0 0 0 4px rgb(255 255 255 / 15%)',
    },
    textColor: (theme) => ({
      ...theme('colors'),
      primary: 'var(--el-text-color-primary)',
      secondary: 'var(--el-text-color-secondary)',
      regular: 'var(--el-text-color-regular)',
      brand: 'var(--el-color-primary)',
    }),
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: 'var(--el-color-primary)',
    }),
  },
})
