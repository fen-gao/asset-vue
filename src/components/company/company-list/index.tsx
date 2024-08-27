import { useEffect } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { AiOutlineGold } from 'react-icons/ai'
import useCompanyContext from '../../../hooks/use-company-context'
import { fetchCompanies } from '../../../service/api'
import { mergeClasses } from '../../../utils/merge-classes'
import Button from '../../ui/button'
import { CompanyInfo, CompanyButtontProps, CompanyContextType, CompanyListContentProps } from './types'

const CompanyButton = ({ company, isActive, onClick }: CompanyButtontProps) => (
  <Button
    className={mergeClasses('', {
      'bg-blue-900': !isActive,
    })}
    onClick={onClick}
  >
    <AiOutlineGold size={14} />
    {company.name}
  </Button>
)

const CompanyListContent = ({ companies, activeCompany, handleActiveCompany }: CompanyListContentProps) => (
  <div className="flex items-center gap-[10px]">
    {companies.map((company) => (
      <CompanyButton
        key={company.id}
        company={company}
        isActive={activeCompany?.id === company.id}
        onClick={() => handleActiveCompany(company)}
      />
    ))}
  </div>
)

const CompanyList = () => {
  const { handleActiveCompany, activeCompany } = useCompanyContext() as CompanyContextType

  const { data: companies } = useSuspenseQuery<CompanyInfo[]>({
    queryKey: ['companies'],
    queryFn: async () => {
      const result = await fetchCompanies()
      return result ?? []
    },
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (companies && companies.length > 0) {
      handleActiveCompany(companies[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies])

  if (!companies || companies.length === 0) return null

  return (
    <CompanyListContent companies={companies} activeCompany={activeCompany} handleActiveCompany={handleActiveCompany} />
  )
}

export default CompanyList
