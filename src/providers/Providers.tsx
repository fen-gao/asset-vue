import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UnitContextProvider from '../context/company-context'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 6000,
        },
      },
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <UnitContextProvider>{children}</UnitContextProvider>
    </QueryClientProvider>
  )
}
