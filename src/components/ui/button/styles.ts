import { tv } from 'tailwind-variants'

// Define button variants using tailwind-variants
export const buttonVariants = tv({
  base: 'font-semibold text-gray-600 rounded flex items-center cursor-pointer transition-colors',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white border border-transparent hover:bg-blue-600',
      secondary: 'bg-white border border-gray-200 hover:bg-gray-50',
      icon: 'bg-transparent border-transparent hover:bg-gray-100',
    },
    size: {
      sm: 'text-xs py-1 px-2 gap-[6px]',
      md: 'text-base py-[6px] px-4 gap-2',
    },
    fullWidth: {
      true: 'w-full',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
  compoundVariants: [
    {
      variant: 'primary',
      disabled: true,
      className: 'bg-blue-300',
    },
  ],
})
