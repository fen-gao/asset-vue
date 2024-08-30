import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CompanyContextProvider } from '../context/company-context'
import { ProvidersProps } from './types'

const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
}

export const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig))

  return (
    <QueryClientProvider client={queryClient}>
      <CompanyContextProvider>{children}</CompanyContextProvider>
    </QueryClientProvider>
  )
}
