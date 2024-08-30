import React from 'react'
import { FixedSizeList as List } from 'react-window'
import { KeyboardEvent } from 'react'

import { AiOutlineCodepen, AiOutlineDown } from 'react-icons/ai'
import { FaBolt } from 'react-icons/fa6'
import { GoLocation } from 'react-icons/go'
import { IoCubeOutline } from 'react-icons/io5'

import { determineElementType, NodeType } from '../../../utils/get-element-type'
import { NodeLabelProps, NodeProps, ThreeViewProps } from './types'
import { mergeClasses } from '../../../utils/merge-classes'

const getIconByNodeType = (typeNode: NodeType) => {
  const availableIcons = {
    location: GoLocation,
    'sub-location': GoLocation,
    asset: IoCubeOutline,
    component: AiOutlineCodepen,
  }

  return availableIcons[typeNode]
}

const NodeLabel = ({
  handleSelect,
  hasChildren,
  isCollapsed,
  labelValue,
  nodeType,
  sensorType,
  status,
  isSelectedComponent,
}: NodeLabelProps) => {
  const isNodeComponent = nodeType === 'component'
  const isOperating = status === 'operating'
  const isAlert = status === 'alert'
  const isEnergySensor = sensorType === 'energy'

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSelect()
    }
  }

  const Icon = getIconByNodeType(nodeType)

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
      onKeyDown={handleKeyPress}
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

const Node = ({ node, activeAsset, onClickAsset, expandedNodes }: NodeProps) => {
  const { name, children, sensorType, status } = node

  const nodeType = determineElementType(node)

  const hasChildren = !!children && children.length > 0

  const isExpanded = expandedNodes.has(node.id)

  const isComponentType = nodeType === 'component'

  const isSelectedComponent = activeAsset?.id === node.id && isComponentType

  const handleSelect = () => {
    onClickAsset(node, isComponentType)
  }

  return (
    <div>
      <NodeLabel
        handleSelect={handleSelect}
        labelValue={name}
        hasChildren={hasChildren}
        isCollapsed={isExpanded}
        nodeType={nodeType}
        sensorType={sensorType}
        status={status}
        isSelectedComponent={isSelectedComponent}
      />
      {hasChildren && (
        <ul
          className={mergeClasses('block ml-[1.5rem] ps-5', {
            hidden: !isExpanded,
            'border-l border-card': hasChildren,
          })}
        >
          {children.map((row) => (
            <Node
              key={row.id}
              node={row}
              onClickAsset={onClickAsset}
              activeAsset={activeAsset}
              expandedNodes={expandedNodes}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export const TreeView = ({ data, activeAsset, onClickAsset, expandedNodes }: ThreeViewProps) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <Node
        key={data[index].id}
        node={data[index]}
        onClickAsset={onClickAsset}
        activeAsset={activeAsset}
        expandedNodes={expandedNodes}
      />
    </div>
  )

  return (
    <List height={600} itemCount={data.length} itemSize={50} width="100%">
      {Row}
    </List>
  )
}
