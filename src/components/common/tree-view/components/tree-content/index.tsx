import { KeyboardEvent } from 'react'
import { AiOutlineCodepen, AiOutlineDown } from 'react-icons/ai'
import { FaBolt } from 'react-icons/fa6'
import { GoLocation } from 'react-icons/go'
import { IoCubeOutline } from 'react-icons/io5'
import { IconType } from 'react-icons'
import { mergeClasses } from '../../../../../utils/merge-classes'
import { HierarchyElementType } from '../../../../../utils/get-element-type'
import { ExpandIconProps, ItemIconProps, ItemNameProps, TreeItemContentProps } from './types'

const nodeTypeToIcon: Record<HierarchyElementType, IconType> = {
  facility: GoLocation,
  equipment: IoCubeOutline,
  sensor: AiOutlineCodepen,
  area: GoLocation,
}

const ExpandIcon = ({ isExpanded }: ExpandIconProps) => (
  <AiOutlineDown
    size={10}
    className={mergeClasses('transition-transform', {
      'rotate-180': isExpanded,
    })}
  />
)

const ItemIcon = ({ type, isSelected }: ItemIconProps) => {
  const Icon = nodeTypeToIcon[type as HierarchyElementType]

  return (
    <Icon
      className={mergeClasses('text-blue-500', {
        'text-white': isSelected,
      })}
      size={22}
    />
  )
}

const ItemName = ({ name, isComponent, isOperational, isAlertState, isEnergySensor }: ItemNameProps) => (
  <span
    className={mergeClasses(
      'uppercase after:content-[""] after:inline-block after:w-2 after:h-2 after:rounded after:ms-2',
      {
        'after:bg-green-500': isOperational,
        'after:bg-red-500': isAlertState,
        'after:hidden': !isComponent || isEnergySensor,
      }
    )}
  >
    {name}
  </span>
)

export const TreeItemContent = ({
  onSelect,
  hasChildren,
  isExpanded,
  name,
  type,
  sensorType,
  status,
  isSelected,
}: TreeItemContentProps) => {
  const isComponent = type === 'sensor'
  const isOperational = status === 'operating'
  const isAlertState = status === 'alert'
  const isEnergySensor = sensorType === 'energy'

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onSelect()
    }
  }

  return (
    <div
      tabIndex={0}
      className={mergeClasses('ps-5 my-4', {
        'cursor-pointer': hasChildren || isComponent,
      })}
      onClick={(event) => {
        event.stopPropagation()
        onSelect()
      }}
      onKeyDown={handleKeyPress}
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
    >
      <div
        className={mergeClasses('ps-1 flex items-center gap-2', {
          'bg-blue-500 text-white': isSelected,
        })}
      >
        {hasChildren && <ExpandIcon isExpanded={isExpanded} />}
        <ItemIcon type={type} isSelected={isSelected} />
        <ItemName
          name={name}
          isComponent={isComponent}
          isOperational={isOperational}
          isAlertState={isAlertState}
          isEnergySensor={isEnergySensor}
        />
        {isEnergySensor && <FaBolt className="text-green-500" />}
      </div>
    </div>
  )
}
