import { mergeClasses } from '../../../utils/merge-classes'
import { buttonVariants } from './styles'
import { ButtonProps } from './types'

export const Button = (props: ButtonProps) => {
  const { children, className, variant, size, ...rest } = props
  return (
    <button {...rest} className={mergeClasses(buttonVariants({ variant, size }), className)}>
      {children}
    </button>
  )
}
