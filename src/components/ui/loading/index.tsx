import { mergeClasses } from '../../../utils/merge-classes'
import { LoadingProps } from './types'
import { loadingStyles } from './styles'

/**
 * Loading spinner component
 *
 * @param size - The size of the spinner: 'small', 'medium', or 'large'
 * @param color - The color scheme of the spinner: 'white', 'blue', or 'gray'
 * @param className - Additional CSS classes to apply
 * @param ariaLabel - Aria label for accessibility
 */
const Loading = ({ size, color, className, ariaLabel = 'Loading', ...props }: LoadingProps) => {
  return (
    <span
      className={mergeClasses(loadingStyles({ size, color }), className)}
      role="status"
      aria-label={ariaLabel}
      {...props}
    />
  )
}

export default Loading
