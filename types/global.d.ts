declare global {
  type AnyObject = {
    [key: string]: any
  }
  type Nullable<T> = T | null
  type Recordable<T = any> = Record<string, T>
}
export {}
