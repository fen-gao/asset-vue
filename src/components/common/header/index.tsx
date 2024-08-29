import { CompanyList } from '../../company/company-list'
import { HeaderProps } from './types'

export const Header = ({ logoSrc, logoAlt }: HeaderProps) => {
  return (
    <header className="w-full h-12 flex items-center justify-between px-4 py-3 bg-main">
      <img src={logoSrc} alt={logoAlt} className="h-full object-contain" />
      <CompanyList />
    </header>
  )
}
