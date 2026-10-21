export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const

export const scrollEasing = (t: number) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
