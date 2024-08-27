import React, { forwardRef } from 'react'
import { mergeClasses } from '../../../utils/merge-classes'
import { buttonVariants } from './styles'
import { ButtonVariants } from './types'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, fullWidth, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={mergeClasses(buttonVariants({ variant, size, fullWidth, disabled }), className)}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    )
  }
)

export default Button
