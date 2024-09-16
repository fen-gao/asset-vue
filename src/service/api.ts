import axios, { AxiosError } from 'axios'
import { Asset, Location } from '../types'
import { Company } from '../context/type'
import { useQuery, useInfiniteQuery, InfiniteQueryObserverResult } from '@tanstack/react-query'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

const fetchData = async <T>(url: string, params: Record<string, any> = {}): Promise<T> => {
  try {
    const { data } = await api.get<T>(url, { params })
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`Error fetching ${url}:`, error.message)
      throw new Error(`Failed to fetch data: ${error.message}`)
    }
    throw error
  }
}

export const getCompanies = () => fetchData<Company[]>('/companies')

export const getLocations = (companyId: string, page = 1, limit = 20) => {
  if (!companyId) {
    throw new Error('Company ID is required to fetch locations')
  }
  return fetchData<Location[]>(`/companies/${companyId}/locations`, { page, limit })
}

export const getAssets = (companyId: string, page = 1, limit = 20) => {
  if (!companyId) {
    throw new Error('Company ID is required to fetch assets')
  }
  return fetchData<Asset[]>(`/companies/${companyId}/assets`, { page, limit })
}

export const getCompanyData = async (companyId: string) => {
  if (!companyId) {
    throw new Error('Company ID is required to fetch company data')
  }
  try {
    const [locations, assets] = await Promise.all([getLocations(companyId), getAssets(companyId)])
    return { locations, assets }
  } catch (error) {
    console.error('Error fetching company data:', error)
    throw error
  }
}

export const useCompaniesQuery = () =>
  useQuery<Company[]>({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })

export const useLocationsQuery = (companyId: string | null): InfiniteQueryObserverResult<Location[], Error> =>
  useInfiniteQuery({
    queryKey: ['locations', companyId],
    queryFn: ({ pageParam = 1 }) => getLocations(companyId!, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 20 ? allPages.length + 1 : undefined
    },
    enabled: !!companyId,
  })

export const useAssetsQuery = (companyId: string | null): InfiniteQueryObserverResult<Asset[], Error> =>
  useInfiniteQuery({
    queryKey: ['assets', companyId],
    queryFn: ({ pageParam = 1 }) => getAssets(companyId!, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 20 ? allPages.length + 1 : undefined
    },
    enabled: !!companyId,
  })

export const useCompanyDataQuery = (companyId: string | null) =>
  useQuery({
    queryKey: ['companyData', companyId],
    queryFn: () => getCompanyData(companyId!),
    enabled: !!companyId,
  })
