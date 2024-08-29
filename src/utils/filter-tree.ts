import { Filter } from '../context/type'
import { Sensor, Status } from '../types'
import { CompanyEntity } from './compose-tree'

interface FilterCriteria {
  search: string
  activeFilter: Filter | null
}

const matchesFilter = (item: CompanyEntity, activeFilter: Filter | null): boolean => {
  if (!activeFilter) return true

  switch (activeFilter) {
    case Filter.ENERGY_SENSOR:
      return item.sensorType === Sensor.ENERGY
    case Filter.CRITICAL:
      return item.status === Status.ALERT && item.sensorType !== Sensor.ENERGY
    default:
      return false
  }
}

const normalizeString = (str: string): string => {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '')
}

const matchesSearch = (item: CompanyEntity, search: string): boolean => {
  if (!search) return true

  const normalizedItemName = normalizeString(item.name)
  const normalizedSearch = normalizeString(search)

  return normalizedItemName.includes(normalizedSearch)
}

export const filterCompanyTree = (companyTree: CompanyEntity[], filter: FilterCriteria): CompanyEntity[] => {
  const { activeFilter, search } = filter

  if (!activeFilter && !search) return companyTree

  const filterTree = (nodes: CompanyEntity[]): CompanyEntity[] => {
    return nodes.reduce<CompanyEntity[]>((filteredNodes, item) => {
      const nodeMatchesFilter = matchesFilter(item, activeFilter)
      const nodeMatchesSearch = matchesSearch(item, search)

      const filteredChildren = item.children ? filterTree(item.children) : []

      if ((nodeMatchesFilter && nodeMatchesSearch) || filteredChildren.length > 0) {
        filteredNodes.push({
          ...item,
          children: filteredChildren,
        })
      }

      return filteredNodes
    }, [])
  }

  return filterTree(companyTree)
}
