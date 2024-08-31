import { mergeClasses } from '../../../utils/merge-classes'
import { LoadingProps } from './types'
import { loadingStyles } from './styles'

export const Loading = ({ size, className }: LoadingProps) => (
  <span className={mergeClasses(loadingStyles({ size }), className)} />
)
