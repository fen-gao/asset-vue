import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UnitContextProvider from '../context/company-context'
import { ProvidersProps } from './types'

// Configuration for QueryClient
const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
    },
  },
}

/**
 * Providers component that wraps the application with necessary context providers.
 * It sets up React Query and the UnitContext.
 */
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig))

  return (
    <QueryClientProvider client={queryClient}>
      <UnitContextProvider>{children}</UnitContextProvider>
    </QueryClientProvider>
  )
}

export default Providers
