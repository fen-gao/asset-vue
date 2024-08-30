import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const mergeClasses = (...classValues: ClassValue[]): string => {
  return twMerge(clsx(classValues))
}
