import { tv } from 'tailwind-variants'

export const loadingStyles = tv({
  base: 'animate-spin border-solid border-white border-t-main rounded-full',
  variants: {
    size: {
      small: 'w-[20px] h-[20px] border-[3px]',
      medium: 'w-[40px] h-[40px] border-[6px]',
      large: 'w-[60px] h-[60px] border-[8px]',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})
