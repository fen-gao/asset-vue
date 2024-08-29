import { useQuery } from '@tanstack/react-query'
import { fetchAssetsByCompany, fetchLocationsByCompany } from '../service/api'
import { useMemo } from 'react'

import { CompanyEntity, constructCompanyHierarchy } from '../utils/compose-tree'
import { Company, FilterType } from '../context/type'
import { filterCompanyTree } from '../utils/filter-tree'

interface UseCompanyTreeProps {
  activeCompany: Company | null
  activeFilter: FilterType
  search: string
}

interface CompanyTree {
  tree: CompanyEntity[]
  map: Map<string, CompanyEntity>
}

export const useCompanyTree = ({ activeCompany, activeFilter, search }: UseCompanyTreeProps) => {
  const { data: assets, isLoading: isLoadingAssets } = useQuery({
    queryKey: ['assets', activeCompany?.id],
    queryFn: () => fetchAssetsByCompany(activeCompany!.id),
    enabled: !!activeCompany,
  })

  const { data: locations, isLoading: isLoadingLocations } = useQuery({
    queryKey: ['locations', activeCompany?.id],
    queryFn: () => fetchLocationsByCompany(activeCompany!.id),
    enabled: !!activeCompany,
  })

  const companyTree = useMemo<CompanyTree>(() => {
    if (assets && locations) {
      const builtHierarchy = constructCompanyHierarchy(locations, assets)
      return {
        tree: builtHierarchy.roots,
        map: builtHierarchy.entityLookup,
      }
    }
    return { tree: [], map: new Map<string, CompanyEntity>() }
  }, [assets, locations])

  const listUnitsFiltered = useMemo(
    () => filterCompanyTree(companyTree.tree, { search, activeFilter }),
    [search, activeFilter, companyTree.tree]
  )

  return {
    companyRoot: listUnitsFiltered,
    companyNodes: companyTree.map,
    isLoading: isLoadingAssets || isLoadingLocations,
  }
}
