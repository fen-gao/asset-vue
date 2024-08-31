import { Filter } from '../context/type'
import { Sensor, Status } from '../types'
import { SensorTreeNode } from './compose-tree'

export const processTreeWithCriteria = (
  companyTree: SensorTreeNode[],
  filter: { search: string; activeFilter: Filter | null }
): SensorTreeNode[] => {
  const { activeFilter, search } = filter

  const isCriticalFilter = activeFilter === Filter.CRITICAL
  const isEnergySensorFilter = activeFilter === Filter.ENERGY_SENSOR

  if (!activeFilter && !search) return companyTree

  const matchesFilter = (node: SensorTreeNode): boolean => {
    const matchEnergySensor = isEnergySensorFilter && node.sensorType === Sensor.ENERGY
    const matchCriticalFilter = isCriticalFilter && node.status === Status.ALERT && node.sensorType !== Sensor.ENERGY

    return matchEnergySensor || matchCriticalFilter
  }

  const matchesSearch = (node: SensorTreeNode): boolean => {
    if (!search) return true

    const normalizedNodeName = node.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const normalizedSearch = search.toLowerCase().replace(/[^a-z0-9]/g, '')

    return normalizedNodeName.includes(normalizedSearch)
  }

  const filterTree = (nodes: SensorTreeNode[]): SensorTreeNode[] => {
    return nodes.reduce<SensorTreeNode[]>((filteredNodes, node) => {
      let nodeMatchesFilter = !activeFilter || matchesFilter(node)
      let nodeMatchesSearch = matchesSearch(node)

      let filteredChildren: SensorTreeNode[] = []

      if (node.children) {
        filteredChildren = filterTree(node.children)
        if (filteredChildren.length > 0) {
          nodeMatchesFilter = true
          nodeMatchesSearch = true
        }
      }

      if (nodeMatchesFilter && nodeMatchesSearch) {
        filteredNodes.push({
          ...node,
          children: filteredChildren,
        })
      }

      return filteredNodes
    }, [])
  }

  return filterTree(companyTree)
}
