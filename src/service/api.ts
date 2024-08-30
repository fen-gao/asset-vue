import axios, { AxiosError } from 'axios'
import { Asset, Location } from '../types'
import { Company } from '../context/type'
import memoize from 'lodash/memoize'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

const cache: Record<string, any> = {}

const fetchWithCache = async <T>(url: string, ttl = 60000): Promise<T> => {
  const cachedData = cache[url]
  if (cachedData && Date.now() - cachedData.timestamp < ttl) {
    return cachedData.data
  }

  try {
    const { data } = await api.get<T>(url)
    cache[url] = { data, timestamp: Date.now() }
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`Error fetching ${url}:`, error.message)
      throw new Error(`Failed to fetch data: ${error.message}`)
    }
    throw error
  }
}

export const getCompanies = memoize(async (): Promise<Company[]> => {
  return fetchWithCache<Company[]>('/companies')
})

export const getLocations = memoize(async (companyId: string): Promise<Location[]> => {
  return fetchWithCache<Location[]>(`/companies/${companyId}/locations`)
})

export const getAssets = memoize(async (companyId: string): Promise<Asset[]> => {
  return fetchWithCache<Asset[]>(`/companies/${companyId}/assets`)
})

export const getCompanyData = async (companyId: string) => {
  try {
    const [locations, assets] = await Promise.all([getLocations(companyId), getAssets(companyId)])
    return { locations, assets }
  } catch (error) {
    console.error('Error fetching company data:', error)
    throw error
  }
}
