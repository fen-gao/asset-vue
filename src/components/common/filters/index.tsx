import React, { useMemo } from 'react'
import { AiOutlineExclamationCircle, AiOutlineThunderbolt } from 'react-icons/ai'

import { FilterDefinition, FilterOptionProps } from './types'
import Button from '../../ui/button'
import { mergeClasses } from '../../../utils/merge-classes'
import { Filter } from '../../../context/type'
import useCompanyContext from '../../../hooks/use-company-context'

const FilterOption = React.memo(({ isSelected, onSelect, icon, label }: FilterOptionProps) => (
  <Button variant={isSelected ? 'primary' : 'secondary'} size="md" onClick={onSelect}>
    {React.cloneElement(icon, {
      size: 16,
      className: mergeClasses('text-blue-500', {
        'text-white': isSelected,
      }),
    })}
    {label}
  </Button>
))

const filterDefinitions: FilterDefinition[] = [
  {
    type: Filter.ENERGY_SENSOR,
    icon: <AiOutlineThunderbolt />,
    label: 'Sensor de Energia',
  },
  {
    type: Filter.CRITICAL,
    icon: <AiOutlineExclamationCircle />,
    label: 'Crítico',
  },
]

export const FilterBar = () => {
  const { activeFilter, handleActiveFilter } = useCompanyContext()

  const filterOptions = useMemo(() => filterDefinitions, [])

  return (
    <div className="flex items-center gap-2">
      {filterOptions.map((filter) => (
        <FilterOption
          key={filter.type}
          isSelected={activeFilter === filter.type}
          onSelect={() => handleActiveFilter(filter.type)}
          icon={filter.icon}
          label={filter.label}
        />
      ))}
    </div>
  )
}
