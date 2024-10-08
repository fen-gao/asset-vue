import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CompanyContextProvider } from '../context/company-context'
import { useState } from 'react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60000,
            gcTime: 3600000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <CompanyContextProvider>{children}</CompanyContextProvider>
    </QueryClientProvider>
  )
}
