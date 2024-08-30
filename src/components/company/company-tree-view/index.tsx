import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { AiOutlineCodepen, AiOutlineDown } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { IoCubeOutline } from 'react-icons/io5'
import { TreeNode } from '../../../utils/compose-tree'
import { determineElementType } from '../../../utils/get-element-type'
import { mergeClasses } from '../../../utils/merge-classes'
import { FaBolt } from 'react-icons/fa6'
import { CompanyTreeViewProps } from './types'
import { Sensor, Status } from '../../../types'
import TreeView from '../../common/tree-view'
import { Filter } from '../../../context/type'

const iconMap = {
  location: GoLocation,
  'sub-location': GoLocation,
  asset: IoCubeOutline,
  component: AiOutlineCodepen,
}

const getParents = (node: TreeNode, treeMap: Map<string, TreeNode>) => {
  const parents = []
  let current = node
  while (current.parentId) {
    current = treeMap.get(current.parentId) as TreeNode
    if (current) {
      parents.unshift(current.id)
    } else {
      break
    }
  }
  return parents
}

const matchFilter = (node: TreeNode, activeFilter: Filter | null, search: string): boolean => {
  const isCriticalFilter = activeFilter === Filter.CRITICAL
  const isEnergySensorFilter = activeFilter === Filter.ENERGY_SENSOR

  const matchEnergySensor = isEnergySensorFilter && node.sensorType === Sensor.ENERGY
  const matchCriticalFilter = isCriticalFilter && node.status === Status.ALERT && node.sensorType !== Sensor.ENERGY
  const matchSearch = node.name.toLowerCase().includes(search.toLowerCase())

  return matchEnergySensor || matchCriticalFilter || matchSearch
}

const renderCompanyItem = (item: TreeNode, isExpanded: boolean, isSelected: boolean) => {
  const nodeType = determineElementType(item)
  const Icon = iconMap[nodeType]
  const isNodeComponent = nodeType === 'component'
  const isOperating = item.status === Status.OPERATING
  const isAlert = item.status === Status.ALERT
  const isEnergySensor = item.sensorType === Sensor.ENERGY

  return (
    <div
      className={mergeClasses('ps-5 my-4', {
        'cursor-pointer': (item.children && item.children?.length > 0) || isNodeComponent,
      })}
    >
      <div
        className={mergeClasses('ps-1 flex items-center gap-2', {
          'bg-blue-500 text-white': isNodeComponent && isSelected,
        })}
      >
        {item.children && item.children?.length > 0 && (
          <AiOutlineDown size={10} className={mergeClasses('', { 'rotate-180': isExpanded })} />
        )}
        <Icon className={mergeClasses('text-blue-500', { 'text-white': isSelected && isNodeComponent })} size={22} />
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
          {item.name}
        </span>
        {isEnergySensor && <FaBolt className="text-green-500" />}
      </div>
    </div>
  )
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
    (node: TreeNode) => {
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
        if (node.children && node.children.some((child: TreeNode) => nodesToExpand.has(child.id))) {
          nodesToExpand.add(node.id)
        }
      })
    }
    setExpandedItems(nodesToExpand)
  }, [search, nodes, activeFilter])

  const flattenedData = useMemo(() => {
    const flatten = (items: TreeNode[], depth = 0): TreeNode[] => {
      return items.reduce((acc: TreeNode[], item) => {
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
