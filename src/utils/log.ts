const projectName = import.meta.env.VITE_APP_TITLE

export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`)
}

export function errorNotify(message: string) {
  throw new Error(`[${projectName} error]:${message}`)
}
