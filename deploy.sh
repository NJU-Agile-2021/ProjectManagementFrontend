#!/bin/bash
set -e

echo "页面托管部署"
# 分别是service_id token_id 打包文件 部署信息
# https://qingfuwu.cn/docs/openapi/sdk/hosting.html#%E9%A1%B5%E9%9D%A2%E6%89%98%E7%AE%A1%E9%83%A8%E7%BD%B2
curl -X POST https://open.qingfuwu.cn/v1/services/$service_id/hosting/versions \
  -H "Authorization:Bearer $token_id" \
  -F "file=@./$file" \
  -F "change_log=$comment"

echo "获取页面托管信息"
RESULT=$(curl -X GET https://open.qingfuwu.cn/v1/services/$service_id/hosting -H "Authorization:Bearer $token_id")

# for Feishu message
echo "::set-output name=message::${RESULT}"
