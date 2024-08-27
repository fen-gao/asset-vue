import { Asset } from '../../../types'
import { CompanyEntity } from '../../../utils/compose-tree'

export interface TreeViewProps {
  items: Array<CompanyEntity>
  selectedAsset: Asset | null
  expandedNodeIds: Set<string>
  onAssetSelect: (asset: CompanyEntity, isComponent: boolean) => void
}
