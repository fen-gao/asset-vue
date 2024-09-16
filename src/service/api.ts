import axios, { AxiosError } from 'axios'
import { Asset, Location } from '../types'
import { Company } from '../context/type'
import memoize from 'lodash/memoize'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

const cache = new Map<string, { data: any; timestamp: number }>()

const fetchWithCache = async <T>(url: string, params: Record<string, any> = {}, ttl = 60000): Promise<T> => {
  const cacheKey = `${url}?${new URLSearchParams(params).toString()}`
  const cachedData = cache.get(cacheKey)
  if (cachedData && Date.now() - cachedData.timestamp < ttl) {
    return cachedData.data
  }

  try {
    const { data } = await api.get<T>(url, { params })
    cache.set(cacheKey, { data, timestamp: Date.now() })
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`Error fetching ${url}:`, error.message)
      throw new Error(`Failed to fetch data: ${error.message}`)
    }
    throw error
  }
}

export const getCompanies = memoize(() => fetchWithCache<Company[]>('/companies'))

export const getLocations = memoize((companyId: string, page = 1, limit = 20) =>
  fetchWithCache<Location[]>(`/companies/${companyId}/locations`, { page, limit })
)

export const getAssets = memoize((companyId: string, page = 1, limit = 20) =>
  fetchWithCache<Asset[]>(`/companies/${companyId}/assets`, { page, limit })
)

export const getCompanyData = async (companyId: string) => {
  try {
    const [locations, assets] = await Promise.all([getLocations(companyId), getAssets(companyId)])
    return { locations, assets }
  } catch (error) {
    console.error('Error fetching company data:', error)
    throw error
  }
}
