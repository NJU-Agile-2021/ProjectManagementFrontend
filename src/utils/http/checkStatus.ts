import { errorNotify } from '../log'

export function checkStatus(status: number, msg: string): void {
  let errMessage = msg

  switch (status) {
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
    case 403:
      errMessage = msg || '很抱歉，您无法访问该资源，可能是因为没有相应权限或者登录已失效'
      // userStore.logout()
      break
    // 404请求不存在
    case 404:
      errMessage = '很抱歉，资源未找到'
      break
    default:
  }

  if (errMessage) {
    errorNotify(errMessage)
  }
}
