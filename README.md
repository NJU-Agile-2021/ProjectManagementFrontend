# Agile-Project-Dashboard

## Features

### 开发依赖库

- 开发框架： `vue3 + vue-router + vuex`
- 静态编译强类型语言：`typescript`
- 构建工具：`vite2`
- http 请求: `axios`
- ui 库: `element-plus`
- 代码检查: `eslint+eslint-typescript`
- 格式化: `prettier`
- CI/CD：`Github workflow + qingfuwu`

### 开发插件

- `Eslint`
- `Prettier`
- `Volar`

## Notes

### 配置保存文件时的自动修复

#### VScode

按照推荐下载`Eslint`和`Prettier`插件

#### WebStorm

在`File | Settings | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint`中勾选`Run Eslint --fix on save`

## Project setup and usage

### 运行

```bash
npm install
npm run dev
```

### 打包

```bash
npm run build
```

### 部署

[字节跳动轻服务平台](https://qingfuwu.cn/dashboard) | [轻服务文档](https://qingfuwu.cn/docs/nodejs/)

`GitHub`设置`Secrets`，添加`QINGFUWU_SERVICE_ID`项为你的**服务 ID**，添加`QINGFUWU_TOKEN_ID`项为你的[个人访问凭证](https://qingfuwu.cn/docs/openapi/personaltoken2.html#%E8%8E%B7%E5%8F%96%E4%B8%AA%E4%BA%BA%E8%AE%BF%E9%97%AE%E5%87%AD%E8%AF%81)

```bash
echo "页面托管部署"
# 分别是service_id token_id 打包文件 部署信息
curl -X POST https://open.qingfuwu.cn/v1/services/$1/hosting/versions \
  -H "Authorization:Bearer $2" \
  -F "file=@./$3" \
  -F "change_log=$4"
```

### Git 提交规范

参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `mod` 不确定分类的修改
- `wip` 开发中
- `types` 类型修改
