import { FilterType } from '../../../context/type'
import { Asset } from '../../../types'
import { TreeNode } from '../../../utils/compose-tree'

export interface CompanyTreeViewProps {
  data: TreeNode[]
  activeAsset: Asset | null
  onClickAsset: (nextAsset: Asset) => void
  search: string
  activeFilter: FilterType
  nodes: Map<string, TreeNode>
}
