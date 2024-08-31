import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { SensorTreeNode } from '../../../utils/compose-tree'
import { determineElementType } from '../../../utils/get-element-type'
import { CompanyTreeViewProps } from './types'
import { Sensor, Status } from '../../../types'
import { TreeView } from '../../common/tree-view'
import { Filter } from '../../../context/type'

const getParents = (node: SensorTreeNode, treeMap: Map<string, SensorTreeNode>) => {
  const parents = []
  let current = node
  while (current.parentId) {
    current = treeMap.get(current.parentId) as SensorTreeNode
    if (current) {
      parents.unshift(current.id)
    } else {
      break
    }
  }
  return parents
}

const matchFilter = (node: SensorTreeNode, activeFilter: Filter | null, search: string): boolean => {
  const isCriticalFilter = activeFilter === Filter.CRITICAL
  const isEnergySensorFilter = activeFilter === Filter.ENERGY_SENSOR

  const matchEnergySensor = isEnergySensorFilter && node.sensorType === Sensor.ENERGY
  const matchCriticalFilter = isCriticalFilter && node.status === Status.ALERT && node.sensorType !== Sensor.ENERGY
  const matchSearch = node.name.toLowerCase().includes(search.toLowerCase())

  return matchEnergySensor || matchCriticalFilter || matchSearch
}

export const CompanyTreeView: React.FC<CompanyTreeViewProps> = ({
  data,
  onClickAsset,
  search,
  activeFilter,
  nodes,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const handleToggle = useCallback(
    (node: SensorTreeNode) => {
      const { id, name, locationId, sensorType, status, parentId, gatewayId, sensorId } = node
      const isComponentType = determineElementType(node) === 'component'

      setExpandedItems((prevExpanded) => {
        const newExpanded = new Set(prevExpanded)
        if (newExpanded.has(node.id)) {
          newExpanded.delete(node.id)
        } else {
          newExpanded.add(node.id)
        }
        return newExpanded
      })
      if (isComponentType) {
        onClickAsset({ id, name, locationId: locationId!, sensorType, status, parentId, gatewayId, sensorId })
      }
    },
    [onClickAsset]
  )

  useEffect(() => {
    const nodesToExpand = new Set<string>()
    if (search || activeFilter) {
      nodes.forEach((node) => {
        const nodeMatchesFilter = matchFilter(node, activeFilter, search)
        if (nodeMatchesFilter) {
          const ancestors = getParents(node, nodes)
          ancestors.forEach((id) => nodesToExpand.add(id))
          nodesToExpand.add(node.id)
        }
      })

      nodes.forEach((node) => {
        if (node.children && node.children.some((child: SensorTreeNode) => nodesToExpand.has(child.id))) {
          nodesToExpand.add(node.id)
        }
      })
    }
    setExpandedItems(nodesToExpand)
  }, [search, nodes, activeFilter])

  const flattenedData = useMemo(() => {
    const flatten = (items: SensorTreeNode[], depth = 0): SensorTreeNode[] => {
      return items.reduce((acc: SensorTreeNode[], item) => {
        const newItem = { ...item, depth }
        acc.push(newItem)
        if (item.children && expandedItems.has(item.id)) {
          acc.push(...flatten(item.children, depth + 1))
        }
        return acc
      }, [])
    }
    return flatten(data)
  }, [data, expandedItems])

  return (
    <TreeView
      data={flattenedData}
      activeAsset={null} // You might want to pass this as a prop if needed
      onClickAsset={handleToggle}
      expandedNodes={expandedItems}
    />
  )
}
