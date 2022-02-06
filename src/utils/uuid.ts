const hexList: string[] = []
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16)
}

/**
 * 创建UUID
 * @param pure 是否为纯数字
 * @returns UUID
 */
export function buildUUID(pure = true): string {
  let uuid = ''
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-'
    } else if (i === 15) {
      uuid += 4
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8]
    } else {
      uuid += hexList[(Math.random() * 16) | 0]
    }
  }
  return pure ? uuid.replace(/-/g, '') : uuid
}

let unique = 0
export function buildShortUUID(prefix = ''): string {
  const time = Date.now()
  const random = Math.floor(Math.random() * 1000000000)
  unique++
  return prefix + '_' + random + unique + String(time)
}
