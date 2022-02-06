/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * App Title
   */
  readonly VITE_APP_TITLE: string
  /**
   * Dev server port number
   * type could only be string|boolean|undefined
   * otherwise it will conflict with importMeta.d.ts
   * On the other hand, this can be solved by opening skipLibCheck option in the global declaration
   * https://sunboyzgz.github.io/2021/05/20/typescript-global/
   */
  readonly VITE_PORT: string
  /**
   * Google Analytics User-Id
   */
  readonly VITE_GA: string
  /**
   * Build Public Path
   */
  readonly VITE_PUBLIC_PATH: string
  /**
   * Backend api url
   */
  readonly VITE_API_BASE_URL: string
}
