import { AiOutlineExclamationCircle, AiOutlineThunderbolt } from 'react-icons/ai'
import { useCompanyContext } from '../../../hooks/use-company-context'
import { Button } from '../../ui/button'
import { mergeClasses } from '../../../utils/merge-classes'
import { Filter } from '../../../context/type'

export const Filters = () => {
  const { activeFilter, handleActiveFilter } = useCompanyContext()

  const isEnergySensorFilter = activeFilter === 'ENERGY_SENSOR'
  const isCriticalFilter = activeFilter === 'CRITICAL'
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isEnergySensorFilter ? 'primary' : 'secondary'}
        size="md"
        onClick={() => handleActiveFilter(Filter?.ENERGY_SENSOR)}
      >
        <AiOutlineThunderbolt
          size={16}
          className={mergeClasses('text-blue-500', {
            'text-white': isEnergySensorFilter,
          })}
        />
        Sensor de Energia
      </Button>
      <Button
        variant={isCriticalFilter ? 'primary' : 'secondary'}
        size="md"
        onClick={() => handleActiveFilter(Filter.CRITICAL)}
      >
        <AiOutlineExclamationCircle
          size={16}
          className={mergeClasses('text-blue-500', {
            'text-white': isCriticalFilter,
          })}
        />
        Crítico
      </Button>
    </div>
  )
}
