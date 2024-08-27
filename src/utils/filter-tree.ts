import { Filter } from '../context/type'
import { Sensor, Status } from '../types'
import { CompanyEntity } from './compose-tree'

interface FilterCriteria {
  search: string
  activeFilter: Filter | null
}

/**
 * Checks if a company entity matches the given filter criteria.
 *
 * @param {CompanyEntity} item - The company entity to check.
 * @param {Filter | null} activeFilter - The active filter to apply.
 * @return {boolean} True if the entity matches the filter, false otherwise.
 */
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

const matchesSearch = (item: CompanyEntity, search: string): boolean => {
  return !search || item.name.toLowerCase().includes(search.toLowerCase())
}

/**
 * Filters a company tree based on the provided filter criteria.
 *
 * @param {CompanyEntity[]} companyTree - The company tree to filter.
 * @param {FilterCriteria} filter - The filter criteria to apply.
 * @return {CompanyEntity[]} The filtered company tree.
 */
export default function filterCompanyTree(companyTree: CompanyEntity[], filter: FilterCriteria): CompanyEntity[] {
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
