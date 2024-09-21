import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function changeLocale(locale: string) {
  localStorage.setItem('locale', locale ?? 'uz')
  window.location.reload()
}

export function getLocale() {
  return localStorage.getItem('locale') || 'uz'
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
