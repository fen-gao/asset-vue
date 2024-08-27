import { Filter } from '../../../context/type'

export interface FilterOptionProps {
  isSelected: boolean
  label: string
  icon: React.ReactElement
  onSelect: () => void
}

export interface FilterDefinition {
  type: Filter
  icon: React.ReactElement
  label: string
}
