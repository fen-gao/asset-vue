import { VariantProps } from 'tailwind-variants'
import { loadingStyles } from './styles'

type LoadingVariants = VariantProps<typeof loadingStyles>

export interface LoadingProps extends React.HTMLAttributes<HTMLSpanElement>, LoadingVariants {
  size?: 'small' | 'medium' | 'large'
  color?: 'white' | 'blue' | 'gray'
  ariaLabel?: string
}
