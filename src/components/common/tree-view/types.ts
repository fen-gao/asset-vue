import { Asset, SensorType, Status } from '../../../types'
import { SensorTreeNode } from '../../../utils/compose-tree'
import { ElementType } from '../../../utils/get-element-type'

export interface ThreeViewProps {
  data: Array<SensorTreeNode>
  onClickAsset: (nextAsset: SensorTreeNode, isComponentType: boolean) => void
  activeAsset: Asset | null
  expandedNodes: Set<string>
  isValidComponent: (node: SensorTreeNode) => boolean
  selectedComponentId: string | null
}

export interface NodeLabelProps {
  ElementType: ElementType
  hasChildren: boolean
  isCollapsed: boolean
  handleSelect: () => void
  labelValue: string
  sensorType?: SensorType
  status?: Status | null
  isSelectedComponent: boolean
  isClickable: boolean
  isCurrentlyClicked: boolean
}

export interface NodeProps {
  node: SensorTreeNode
  onClickAsset: (nextAsset: SensorTreeNode, isComponentType: boolean) => void
  activeAsset: Asset | null
  expandedNodes: Set<string>
}
