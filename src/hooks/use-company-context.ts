import { useContext } from 'react'
import { CompanyContext } from '../context/company-context'

export const useCompanyContext = () => {
  const context = useContext(CompanyContext)

  if (!context) {
    throw new Error('useCompanyContext must be used within a CompanyContextProvider!')
  }

  return context
}
