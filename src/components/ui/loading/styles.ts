import { tv } from 'tailwind-variants'

export const loadingStyles = tv({
  base: 'animate-spin border-solid rounded-full',
  variants: {
    size: {
      small: 'w-5 h-5 border-2',
      medium: 'w-10 h-10 border-3',
      large: 'w-16 h-16 border-4',
    },
    color: {
      white: 'border-white border-t-main',
      blue: 'border-blue-200 border-t-blue-600',
      gray: 'border-gray-200 border-t-gray-600',
    },
  },
  defaultVariants: {
    size: 'medium',
    color: 'white',
  },
})
