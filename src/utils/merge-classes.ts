import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges and deduplicates CSS classes using clsx and tailwind-merge.
 *
 * This function combines the power of clsx for conditional class joining
 * with tailwind-merge for Tailwind CSS class deduplication.
 *
 * @param classValues - Any number of class values (strings, objects, or arrays)
 * @returns A string of merged and deduplicated CSS classes
 *
 * @example
 * mergeClasses('font-bold', 'text-lg', { 'bg-red-500': isError }, isLarge && 'text-xl')
 */
export function mergeClasses(...classValues: ClassValue[]): string {
  return twMerge(clsx(classValues))
}
