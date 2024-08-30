import { Filter } from '../context/type'
import { Sensor, Status } from '../types'
import { TreeNode } from './compose-tree'

export default function filterCompanyTree(
  companyTree: TreeNode[],
  filter: { search: string; activeFilter: Filter | null }
): TreeNode[] {
  const { activeFilter, search } = filter

  const isCriticalFilter = activeFilter === Filter.CRITICAL
  const isEnergySensorFilter = activeFilter === Filter.ENERGY_SENSOR

  if (!activeFilter && !search) return companyTree

  const matchesFilter = (node: TreeNode): boolean => {
    const matchEnergySensor = isEnergySensorFilter && node.sensorType === Sensor.ENERGY
    const matchCriticalFilter = isCriticalFilter && node.status === Status.ALERT && node.sensorType !== Sensor.ENERGY

    return matchEnergySensor || matchCriticalFilter
  }

  const matchesSearch = (node: TreeNode): boolean => {
    if (!search) return true

    const normalizedNodeName = node.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const normalizedSearch = search.toLowerCase().replace(/[^a-z0-9]/g, '')

    return normalizedNodeName.includes(normalizedSearch)
  }

  const filterTree = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.reduce<TreeNode[]>((filteredNodes, node) => {
      let nodeMatchesFilter = !activeFilter || matchesFilter(node)
      let nodeMatchesSearch = matchesSearch(node)

      let filteredChildren: TreeNode[] = []

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
