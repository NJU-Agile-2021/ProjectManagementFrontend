import { Result } from '../types/axios'
export function buildSuccess<T>(data: T | null, message = 'ok'): Result<T> {
  return {
    code: 200,
    success: true,
    data,
    message,
  }
}
