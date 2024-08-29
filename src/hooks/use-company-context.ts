import { useContext } from 'react'
import { CompanyContext } from '../context/company-context'

/**
 * Custom hook to access the CompanyContext value.
 *
 * This hook simplifies the process of consuming the CompanyContext
 * within functional components. It also provides a helpful error
 * message if used outside of a CompanyContextProvider.
 *
 * @returns {object} The CompanyContext value.
 * @throws {Error} If used outside of a CompanyContextProvider.
 *
 * @example
 * const { companyName, employees } = useCompanyContext();
 * console.log(`Company: ${companyName}, Employees: ${employees.length}`);
 */
export const useCompanyContext = () => {
  const context = useContext(CompanyContext)

  if (!context) {
    throw new Error('The useCompanyContext hook requires a CompanyContextProvider ancestor in the component tree.')
  }

  return context
}
