import { useContext } from 'react'
import { CompanyContext } from '../context/company-context'

export const useCompanyContext = () => {
  const context = useContext(CompanyContext)

  if (!context) {
    throw new Error('The useCompanyContext hook requires a CompanyContextProvider ancestor in the component tree.')
  }

  return context
}
