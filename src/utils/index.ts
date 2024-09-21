import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function changeLocale(locale: string) {
  localStorage.setItem('locale', locale ?? 'en')
  window.location.reload()
}

export function getLocale() {
  return localStorage.getItem('locale') || 'en'
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
