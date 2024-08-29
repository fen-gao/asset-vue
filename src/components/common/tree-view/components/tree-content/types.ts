import { SensorType, Status } from '../../../../../types'
import { HierarchyElementType } from '../../../../../utils/get-element-type'

export interface TreeItemContentProps {
  type: HierarchyElementType
  hasChildren: boolean
  isExpanded: boolean
  name: string
  sensorType?: SensorType
  status?: Status | null
  isSelected: boolean
  onSelect: () => void
}

export interface ExpandIconProps {
  isExpanded: boolean
}

export interface ItemIconProps {
  type: HierarchyElementType
  isSelected: boolean
}

export interface ItemNameProps {
  name: string
  isComponent: boolean
  isOperational: boolean
  isAlertState: boolean
  isEnergySensor: boolean
}
