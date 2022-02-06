export function getObjectURL(file: File | Blob) {
  return (
    URL.createObjectURL(file) || // mozilla(firefox)
    webkitURL.createObjectURL(file) // webkit or chrome
  )
}

/**
 * 读取文件内容
 * @param file 文件对象
 * @param raw 是否转换成base64编码
 * @returns 文件内容
 */
export function readFileContent(file: File, raw = true) {
  return new Promise((resolve: (content: FileReader['result']) => void, reject) => {
    const reader = new FileReader()
    if (raw) {
      reader.readAsText(file)
    } else {
      reader.readAsDataURL(file)
    }
    reader.onload = function () {
      // 图片转base64完成后返回reader对象
      resolve(reader.result)
    }
    reader.onerror = reject
  })
}

export function downloadFile(filename: string, content: string) {
  const uri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
  const link = document.createElement('a')
  link.href = uri
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
