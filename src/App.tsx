import { Suspense } from 'react'
import { CompanyContent } from './components/company/company-content'
import { Loading } from './components/ui/loading'
import { Header } from './components/common/header'

const FallBackLoading = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Loading />
  </div>
)

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
