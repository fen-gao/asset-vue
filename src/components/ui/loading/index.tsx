import { tv, VariantProps } from 'tailwind-variants'

import { HTMLProps } from 'react'
import { mergeClasses } from '../../../utils/merge-classes'

const loadingStyles = tv({
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

type ButtonVariants = VariantProps<typeof loadingStyles>

interface LoadingProps {
  className?: HTMLProps<HTMLElement>['className']
  size?: ButtonVariants['size']
}

export const Loading = ({ size, className }: LoadingProps) => {
  return <span className={mergeClasses(loadingStyles({ size }), className)} />
}
