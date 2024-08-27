export interface CompanyInfo {
  id: string
  name: string
}

export interface CompanyContextType {
  handleActiveCompany: (company: CompanyInfo) => void
  activeCompany: CompanyInfo | null
}

export interface CompanyButtontProps {
  company: CompanyInfo
  isActive: boolean
  onClick: () => void
}

export interface CompanyListContentProps {
  companies: CompanyInfo[]
  activeCompany: CompanyInfo | null
  handleActiveCompany: (company: CompanyInfo) => void
}
