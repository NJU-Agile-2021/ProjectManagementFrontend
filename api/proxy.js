import { createProxyMiddleware } from 'http-proxy-middleware'

export default (req, res) => {
  let target = ''

  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
  if (req.url.startsWith('/backend')) {
    target = 'http://172.19.240.231:8088'
  }

  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/backend`
      // 例如 /backend/user/login 将被转发到 http://47.100.63.10:8088/user/login
      '^/backend/': '/',
    },
  })(req, res)
}
