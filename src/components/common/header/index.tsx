import { CompanyList } from '../../company/company-list'
import Logo from '../../../assets/logo.png'

export const Header = () => {
  return (
    <header className="bg-main w-full h-12 flex items-center justify-between px-4 py-3">
      <img src={Logo} alt="Tractian Logo" />
      <CompanyList />
    </header>
  )
}
