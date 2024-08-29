import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { AiOutlineCodepen, AiOutlineDown } from 'react-icons/ai'
import { FaBolt } from 'react-icons/fa6'
import { GoLocation } from 'react-icons/go'
import { IoCubeOutline } from 'react-icons/io5'
import { CompanyEntity } from '../../../utils/compose-tree'
import { Sensor, Status } from '../../../types'
import { Filter } from '../../../context/type'
import { determineElementType } from '../../../utils/get-element-type'
import { mergeClasses } from '../../../utils/merge-classes'
import { VirtualizedTreeView } from '../../ui/virtualized-tree-view'
import { CompanyTreeViewProps, TreeNodeItemProps } from './types'

const NODE_TYPE_ICON_MAP = {
  facility: GoLocation,
  equipment: IoCubeOutline,
  sensor: AiOutlineCodepen,
  area: GoLocation,
}

const getAncestorIds = (node: CompanyEntity, treeMap: Map<string, CompanyEntity>): string[] => {
  const ancestorIds = []
  let currentNode = node
  while (currentNode.parentId) {
    currentNode = treeMap.get(currentNode.parentId) as CompanyEntity
    if (currentNode) {
      ancestorIds.unshift(currentNode.id)
    } else {
      break
    }
  }
  return ancestorIds
}

const isNodeMatchingFilter = (node: CompanyEntity, activeFilter: Filter | null, searchTerm: string): boolean => {
  const isCriticalFilter = activeFilter === Filter.CRITICAL
  const isEnergySensorFilter = activeFilter === Filter.ENERGY_SENSOR

  const matchesEnergySensor = isEnergySensorFilter && node.sensorType === Sensor.ENERGY
  const matchesCriticalFilter = isCriticalFilter && node.status === Status.ALERT && node.sensorType !== Sensor.ENERGY
  const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase())

  return matchesEnergySensor || matchesCriticalFilter || matchesSearch
}

const TreeNodeItem = React.memo(({ node, isExpanded, isSelected }: TreeNodeItemProps) => {
  const nodeType = determineElementType(node)
  const Icon = NODE_TYPE_ICON_MAP[nodeType]

  const isComponent = nodeType === 'sensor'
  const isOperating = node.status === Status.OPERATING
  const isAlert = node.status === Status.ALERT
  const isEnergySensor = node.sensorType === Sensor.ENERGY
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className={mergeClasses('ps-5 my-4', { 'cursor-pointer': hasChildren || isComponent })}>
      <div
        className={mergeClasses('ps-1 flex items-center gap-2', {
          'bg-blue-500 text-white': isComponent && isSelected,
        })}
      >
        {hasChildren && <AiOutlineDown size={10} className={mergeClasses('', { 'rotate-180': isExpanded })} />}
        <Icon className={mergeClasses('text-blue-500', { 'text-white': isSelected && isComponent })} size={22} />
        <span
          className={mergeClasses(
            'uppercase after:content=[" "] after:inline-block after:w-2 after:h-2 after:rounded after:ms-2',
            {
              'after:bg-green-500': isOperating,
              'after:bg-red-500': isAlert,
              'after:content-none': isEnergySensor,
            }
          )}
        >
          {node.name}
        </span>
        {isEnergySensor && <FaBolt className="text-green-500" />}
      </div>
    </div>
  )
})

const CompanyTreeView = ({ data, onAssetSelect, searchTerm, activeFilter, nodeMap }: CompanyTreeViewProps) => {
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(new Set())

  const handleNodeToggle = useCallback(
    (node: CompanyEntity) => {
      const isComponent = determineElementType(node) === 'sensor'

      setExpandedNodeIds((prevExpanded) => {
        const newExpanded = new Set(prevExpanded)
        if (newExpanded.has(node.id)) {
          newExpanded.delete(node.id)
        } else {
          newExpanded.add(node.id)
        }
        return newExpanded
      })

      if (isComponent) {
        const { id, name, locationId, sensorType, status, parentId, gatewayId, sensorId } = node
        onAssetSelect({ id, name, locationId: locationId ?? null, sensorType, status, parentId, gatewayId, sensorId })
      }
    },
    [onAssetSelect]
  )

  const expandedNodesBasedOnFilter = useMemo(() => {
    const nodesToExpand = new Set<string>()
    if (searchTerm || activeFilter) {
      nodeMap.forEach((node) => {
        if (isNodeMatchingFilter(node, activeFilter, searchTerm)) {
          const ancestorIds = getAncestorIds(node, nodeMap)
          ancestorIds.forEach((id) => nodesToExpand.add(id))
          nodesToExpand.add(node.id)
        }
      })

      nodeMap.forEach((node) => {
        if (node.children?.some((child: CompanyEntity) => nodesToExpand.has(child.id))) {
          nodesToExpand.add(node.id)
        }
      })
    }
    return nodesToExpand
  }, [searchTerm, nodeMap, activeFilter])

  useEffect(() => {
    setExpandedNodeIds(expandedNodesBasedOnFilter)
  }, [expandedNodesBasedOnFilter])

  const renderItem = useCallback(
    (node: CompanyEntity, isExpanded: boolean, isSelected: boolean) => (
      <TreeNodeItem node={node} isExpanded={isExpanded} isSelected={isSelected} />
    ),
    []
  )

  return (
    <VirtualizedTreeView
      items={data}
      expandedItems={expandedNodeIds}
      onItemSelect={handleNodeToggle}
      renderItem={renderItem}
    />
  )
}

export default React.memo(CompanyTreeView)
