import { Asset, SensorType, Status } from '../../../types'
import { TreeNode } from '../../../utils/compose-tree'
import { NodeType } from '../../../utils/get-element-type'

export interface ThreeViewProps {
  data: Array<TreeNode>
  onClickAsset: (nextAsset: TreeNode, isComponentType: boolean) => void
  activeAsset: Asset | null
  expandedNodes: Set<string>
}

export interface NodeLabelProps {
  nodeType: NodeType
  hasChildren: boolean
  isCollapsed: boolean
  handleSelect: () => void
  labelValue: string
  sensorType?: SensorType
  status?: Status | null
  isSelectedComponent: boolean
}

export interface NodeProps {
  node: TreeNode
  onClickAsset: (nextAsset: TreeNode, isComponentType: boolean) => void
  activeAsset: Asset | null
  expandedNodes: Set<string>
}
