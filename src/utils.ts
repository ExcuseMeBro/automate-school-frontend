import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const weekdays = [
  'Dushanba',
  'Seshanba',
  'Chorshanba',
  'Payshanba',
  'Juma',
  'Shanba',
]

export const weekdaysThreeLetter = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function translateWeekday(uwd: string) {
  const weekdayMap = new Map()

  for (let i = 0; i < weekdays.length; i++) {
    weekdayMap.set(weekdays[i], weekdaysThreeLetter[i])
  }
  return weekdayMap.get(uwd)
}
