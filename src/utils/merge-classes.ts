import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const mergeClasses = (...classValues: ClassValue[]): string => twMerge(clsx(classValues))
