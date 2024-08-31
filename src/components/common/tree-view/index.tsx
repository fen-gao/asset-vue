import React, { useCallback, useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { AiOutlineCodepen, AiOutlineDown } from 'react-icons/ai'
import { FaBolt } from 'react-icons/fa6'
import { GoLocation } from 'react-icons/go'
import { IoCubeOutline } from 'react-icons/io5'
import { SensorTreeNode } from '../../../utils/compose-tree'
import { determineElementType, ElementType } from '../../../utils/get-element-type'
import { mergeClasses } from '../../../utils/merge-classes'
import { NodeLabelProps, ThreeViewProps } from './types'

const getIconByElementType = (typeNode: ElementType) => {
  const availableIcons = {
    location: GoLocation,
    'sub-location': GoLocation,
    asset: IoCubeOutline,
    component: AiOutlineCodepen,
  }
  return availableIcons[typeNode]
}

const NodeLabel: React.FC<NodeLabelProps> = ({
  handleSelect,
  hasChildren,
  isCollapsed,
  labelValue,
  ElementType,
  sensorType,
  status,
  isSelectedComponent,
}) => {
  const isNodeComponent = ElementType === 'component'
  const isOperating = status === 'operating'
  const isAlert = status === 'alert'
  const isEnergySensor = sensorType === 'energy'

  const Icon = getIconByElementType(ElementType)

  return (
    <div
      tabIndex={0}
      className={mergeClasses('ps-5 my-4', {
        'cursor-pointer': hasChildren || isNodeComponent,
      })}
      onClick={(event) => {
        event.stopPropagation()
        handleSelect()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleSelect()
        }
      }}
    >
      <div
        className={mergeClasses('ps-1 flex items-center gap-2', {
          'bg-blue-500 text-white': isSelectedComponent,
        })}
      >
        {hasChildren && (
          <AiOutlineDown
            size={10}
            className={mergeClasses('', {
              'rotate-180': isCollapsed,
            })}
          />
        )}
        <Icon
          className={mergeClasses('text-blue-500', {
            'text-white': isSelectedComponent,
          })}
          size={22}
        />
        <span
          className={mergeClasses(
            'uppercase after:content=[" "] after:inline-block after:w-2 after:h-2 after:rounded after:ms-2',
            {
              'after:bg-green-500': isOperating,
              'after:bg-red-500': isAlert,
              'after:content-none': !isNodeComponent || isEnergySensor,
            }
          )}
        >
          {labelValue}
        </span>
        {isEnergySensor && <FaBolt className="text-green-500" />}
      </div>
    </div>
  )
}

export const TreeView = ({ data, activeAsset, onClickAsset, expandedNodes }: ThreeViewProps) => {
  const flattenedData = useMemo(() => {
    const flatten = (nodes: SensorTreeNode[], depth = 0): { node: SensorTreeNode; depth: number }[] => {
      return nodes.reduce((acc, node) => {
        acc.push({ node, depth })
        if (node.children && node.children.length > 0 && expandedNodes.has(node.id)) {
          acc.push(...flatten(node.children, depth + 1))
        }
        return acc
      }, [] as { node: SensorTreeNode; depth: number }[])
    }
    return flatten(data)
  }, [data, expandedNodes])

  const renderRow = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const { node, depth } = flattenedData[index]
      const { name, children, sensorType, status } = node
      const ElementType = determineElementType(node)
      const hasChildren = !!children && children.length > 0
      const isExpanded = expandedNodes.has(node.id)
      const isComponentType = ElementType === 'component'
      const isSelectedComponent = activeAsset?.id === node.id && isComponentType

      const handleSelect = () => {
        onClickAsset(node, isComponentType)
      }

      return (
        <div style={{ ...style, paddingLeft: `${depth * 20}px` }}>
          <NodeLabel
            handleSelect={handleSelect}
            labelValue={name}
            hasChildren={hasChildren}
            isCollapsed={isExpanded}
            ElementType={ElementType}
            sensorType={sensorType}
            status={status}
            isSelectedComponent={isSelectedComponent}
          />
        </div>
      )
    },
    [flattenedData, expandedNodes, activeAsset, onClickAsset]
  )

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          itemCount={flattenedData.length}
          itemSize={50} // Adjust this value based on your average item height
          width={width}
        >
          {renderRow}
        </List>
      )}
    </AutoSizer>
  )
}
