import { useSuspenseQuery } from '@tanstack/react-query'
import { useCompanyContext } from '../../../hooks/use-company-context'
import { getCompanies } from '../../../service/api'
import { useEffect } from 'react'
import { Button } from '../../ui/button'
import { mergeClasses } from '../../../utils/merge-classes'
import { AiOutlineGold } from 'react-icons/ai'

export const CompanyList = () => {
  const { handleActiveCompany, activeCompany } = useCompanyContext()

  const { data = [] } = useSuspenseQuery({
    queryKey: ['companies'],
    queryFn: () => getCompanies(),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data) {
      handleActiveCompany(data[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data) return null

  return (
    <div className="flex items-center gap-[10px]">
      {data?.map((company) => (
        <Button
          key={company.id}
          className={mergeClasses('', {
            'bg-blue-900': activeCompany?.id !== company.id,
          })}
          onClick={() => handleActiveCompany(company)}
        >
          <AiOutlineGold size={14} />
          {company?.name}
        </Button>
      ))}
    </div>
  )
}
