import { CompanyEntity } from '../../../utils/compose-tree'
import { Asset } from '../../../types'
import { Filter } from '../../../context/type'

export interface CompanyTreeViewProps {
  data: CompanyEntity[]
  activeAsset: Asset | null
  onAssetSelect: (nextAsset: Asset) => void
  searchTerm: string
  activeFilter: Filter
  nodeMap: Map<string, CompanyEntity>
}

export interface TreeNodeItemProps {
  node: CompanyEntity
  isExpanded: boolean
  isSelected: boolean
}
