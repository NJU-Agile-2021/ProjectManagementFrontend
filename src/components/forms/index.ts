export function createRule(message: string, trigger = 'blur') {
  return [
    {
      required: true,
      message,
      trigger,
    },
  ]
}
