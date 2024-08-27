import useCompanyContext from '../../../hooks/use-company-context'
import useCompanyTree from '../../../hooks/use-company-tree'
import { FilterBar } from '../../common/filters'
import { SearchBar } from '../../common/search'
import ComponentData from '../company-data'
import CompanyTreeView from '../company-tree-view'
import { HeaderContentProps, TreeSectionProps } from './types'

const HeaderContent = ({ companyName }: HeaderContentProps) => (
  <header className="flex items-center justify-between">
    <div>
      <h3 className="text-gray-950 text-xl font-semibold mr-2 inline">Ativos</h3>
      <span className="text-gray-600 text-sm font-normal align-text-top">/ {companyName}</span>
    </div>
    <FilterBar />
  </header>
)

const TreeSection = ({
  isLoading,
  hasData,
  companyRoot,
  activeAsset,
  handleActiveAsset,
  search,
  handleSearch,
  activeFilter,
  companyNodes,
}: TreeSectionProps) => (
  <section className="flex flex-1 flex-col border rounded border-card">
    <SearchBar value={search} onSearch={handleSearch} />
    <div className="h-full">
      {isLoading ? (
        <span className="text-gray-600 text-sm block text-center mt-4">Carregando...</span>
      ) : hasData ? (
        <CompanyTreeView
          data={companyRoot}
          activeAsset={activeAsset}
          onAssetSelect={handleActiveAsset}
          searchTerm={search}
          activeFilter={activeFilter!}
          nodeMap={companyNodes}
        />
      ) : (
        <span className="text-gray-600 text-sm block text-center mt-4">
          Nenhum Ativo ou Local encontrado! <br /> Limpe a pesquisa ou os filtros para ver os items disponíveis.
        </span>
      )}
    </div>
  </section>
)

const CompanyContent = () => {
  const { activeCompany, activeFilter, search, activeAsset, handleSearch, handleActiveAsset } = useCompanyContext()
  const { companyNodes, companyRoot, isLoading } = useCompanyTree({ activeCompany, activeFilter, search })

  const hasData = !!companyRoot.length

  return (
    <div className="flex flex-col gap-3 h-full bg-white border rounded border-card px-4 py-[18px] overflow-hidden">
      <HeaderContent companyName={activeCompany?.name} />
      <main className="flex-1 flex gap-2 overflow-hidden">
        <TreeSection
          isLoading={isLoading}
          hasData={hasData}
          companyRoot={companyRoot}
          activeAsset={activeAsset}
          handleActiveAsset={handleActiveAsset}
          search={search}
          handleSearch={handleSearch}
          activeFilter={activeFilter}
          companyNodes={companyNodes}
        />
        <ComponentData />
      </main>
    </div>
  )
}

export default CompanyContent
