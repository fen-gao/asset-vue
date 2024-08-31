import { VariantProps } from 'tailwind-variants'
import { loadingStyles } from './styles'
import { HTMLProps } from 'react'

type ButtonVariants = VariantProps<typeof loadingStyles>

export interface LoadingProps {
  className?: HTMLProps<HTMLElement>['className']
  size?: ButtonVariants['size']
}
