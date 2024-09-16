import { useCompanyDataQuery } from '../service/api'
import { useMemo, useCallback } from 'react'

import { SensorTreeNode, createLocationAssetHierarchy } from '../utils/compose-tree'
import { Company, FilterType } from '../context/type'
import { processTreeWithCriteria } from '../utils/filter-tree'

interface UseCompanyTreeProps {
  activeCompany: Company | null
  activeFilter: FilterType
  search: string
}

export const useCompanyTree = ({ activeCompany, activeFilter, search }: UseCompanyTreeProps) => {
  const { data: companyData, isLoading } = useCompanyDataQuery(activeCompany?.id ?? null)

  const companyTree = useMemo(() => {
    if (companyData) {
      return createLocationAssetHierarchy(companyData.locations, companyData.assets)
    }
    return { tree: [], map: new Map<string, SensorTreeNode>() }
  }, [companyData])

  const filterTree = useCallback(
    (tree: SensorTreeNode[]) => processTreeWithCriteria(tree, { search, activeFilter }),
    [search, activeFilter]
  )

  const listUnitsFiltered = useMemo(() => filterTree(companyTree.tree), [filterTree, companyTree.tree])

  return {
    companyRoot: listUnitsFiltered,
    companyNodes: companyTree.map,
    isLoading,
  }
}
