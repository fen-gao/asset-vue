import { FilterType } from '../../../context/type'
import { Asset } from '../../../types'
import { SensorTreeNode } from '../../../utils/compose-tree'

export interface CompanyTreeViewProps {
  data: SensorTreeNode[]
  activeAsset: Asset | null
  onClickAsset: (nextAsset: Asset) => void
  search: string
  activeFilter: FilterType
  nodes: Map<string, SensorTreeNode>
}
