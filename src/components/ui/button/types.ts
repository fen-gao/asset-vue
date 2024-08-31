import { VariantProps } from 'tailwind-variants'
import { buttonVariants } from './styles'

type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}
