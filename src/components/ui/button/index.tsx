import { VariantProps, tv } from 'tailwind-variants'
import { mergeClasses } from '../../../utils/merge-classes'

const buttonVariants = tv({
  base: 'font-semibold text-gray-600 rounded flex items-center cursor-pointer',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white border border-transparent',
      secondary: 'bg-white border border-gray-200',
      icon: 'bg-transparent border-transparent',
    },
    size: {
      sm: 'text-xs py-1 px-2 gap-[6px]',
      md: 'text-base py-[6px] px-4 gap-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
})

type ButtonVariants = VariantProps<typeof buttonVariants>

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

export const Button = (props: ButtonProps) => {
  const { children, className, variant, size, ...rest } = props
  return (
    <button {...rest} className={mergeClasses(buttonVariants({ variant, size }), className)}>
      {children}
    </button>
  )
}
