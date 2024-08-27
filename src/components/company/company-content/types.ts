import { FilterType } from '../../../context/type'
import { Asset } from '../../../types'
import { CompanyEntity } from '../../../utils/compose-tree'

export interface HeaderContentProps {
  companyName: string | undefined
}

export interface TreeSectionProps {
  isLoading: boolean
  hasData: boolean
  companyRoot: CompanyEntity[]
  activeAsset: Asset | null
  search: string
  activeFilter: FilterType
  companyNodes: Map<string, CompanyEntity>
  handleSearch: (value: string) => void
  handleActiveAsset: (asset: Asset) => void
}
