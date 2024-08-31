import { Suspense } from 'react'
import { CompanyContent } from './components/company/company-content'
import { Header } from './components/common/header'
import { FallBackLoading } from './components/fallback-loading'

export const App = () => {
  return (
    <Suspense fallback={<FallBackLoading />}>
      <main className="h-screen w-full flex flex-col">
        <Header />
        <section className="flex-1 p-2 h-auto">
          <CompanyContent />
        </section>
      </main>
    </Suspense>
  )
}
