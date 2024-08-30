import { useCompanyContext } from '../../../hooks/use-company-context'
import { useCompanyTree } from '../../../hooks/use-company-tree'
import { Filters } from '../../common/filters'
import { Search } from '../../common/search'
import { CompanyTreeView } from '../company-tree-view'
import { ComponentData } from '../component-data'

export const CompanyContent = () => {
  const { activeCompany, activeFilter, search, activeAsset, handleSearch, handleActiveAsset } = useCompanyContext()

  const { companyNodes, companyRoot, isLoading } = useCompanyTree({ activeCompany, activeFilter, search })

  const hasData = !!companyRoot.length

  return (
    <div className="flex flex-col gap-3 h-full bg-white border rounded border-card px-4 py-[18px] overflow-hidden">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-950 text-xl font-semibold mr-2 inline">Ativos</h3>
          <span className="text-gray-600 text-sm font-normal align-text-top">/ {activeCompany?.name}</span>
        </div>
        <Filters />
      </header>
      <main className="flex-1 flex flex-col lg:flex-row gap-2 overflow-hidden">
        <section className="flex flex-col border rounded border-card min-h-[500px] w-full lg:w-[450px] lg:min-h-0 overflow-hidden">
          <Search value={search} handleSearch={handleSearch} />
          <div className="flex-1">
            {isLoading ? (
              <span className="text-gray-600 text-sm block text-center mt-4">Carregando...</span>
            ) : hasData ? (
              <CompanyTreeView
                search={search}
                activeFilter={activeFilter}
                nodes={companyNodes}
                data={companyRoot}
                onClickAsset={handleActiveAsset}
                activeAsset={activeAsset}
              />
            ) : (
              <span className="text-gray-600 text-sm block text-center mt-4">
                Nenhum Ativo ou Local encontrado! <br /> Limpe a pesquisa ou os filtros para ver os items disponíveis.
              </span>
            )}
          </div>
        </section>
        <div className="flex-1 overflow-hidden">
          <ComponentData />
        </div>
      </main>
    </div>
  )
}
