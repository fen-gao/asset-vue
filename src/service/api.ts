import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Asset, Location } from '../types'
import { Company } from '../context/type'

// API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL

/**
 * Creates and returns an Axios instance with predefined configurations.
 * @returns {AxiosInstance} Configured Axios instance
 */
const createApiClient = (): AxiosInstance => {
  return axios.create({
    baseURL: API_BASE_URL,
  })
}

// Initialize the API client
const apiClient = createApiClient()

/**
 * Handles API responses and errors uniformly.
 * @template T The expected type of the API response data
 * @param {Promise<AxiosResponse<T>>} apiCall The API call to be executed
 * @returns {Promise<T | null>} The response data or null if an error occurred
 */
const handleApiResponse = async <T>(apiCall: Promise<AxiosResponse<T>>): Promise<T | null> => {
  try {
    const { data } = await apiCall
    return data
  } catch (error) {
    console.error('API call failed:', error)
    return null
  }
}

/**
 * Fetches companies with pagination.
 * @param {number} page The page number to fetch
 * @param {number} pageSize The number of items per page
 * @returns {Promise<Company[] | null>} Array of companies or null if the request fails
 */
export const fetchCompanies = async (page = 1, pageSize = 20): Promise<Company[] | null> => {
  return handleApiResponse(
    apiClient.get<Company[]>('/companies', {
      params: { page, pageSize },
    })
  )
}

/**
 * Fetches locations for a specific company with pagination.
 * @param {string} companyId The ID of the company
 * @param {number} page The page number to fetch
 * @param {number} pageSize The number of items per page
 * @returns {Promise<Location[] | null>} Array of locations or null if the request fails
 */
export const fetchLocationsByCompany = async (
  companyId: string,
  page = 1,
  pageSize = 20
): Promise<Location[] | null> => {
  return handleApiResponse(
    apiClient.get<Location[]>(`/companies/${companyId}/locations`, {
      params: { page, pageSize },
    })
  )
}

/**
 * Fetches assets for a specific company with pagination.
 * @param {string} companyId The ID of the company
 * @param {number} page The page number to fetch
 * @param {number} pageSize The number of items per page
 * @returns {Promise<Asset[] | null>} Array of assets or null if the request fails
 */
export const fetchAssetsByCompany = async (companyId: string, page = 1, pageSize = 20): Promise<Asset[] | null> => {
  return handleApiResponse(
    apiClient.get<Asset[]>(`/companies/${companyId}/assets`, {
      params: { page, pageSize },
    })
  )
}

/**
 * Fetches multiple companies in a single batch request.
 * @param {string[]} companyIds Array of company IDs to fetch
 * @returns {Promise<Company[] | null>} Array of companies or null if the request fails
 */
export const fetchMultipleCompanies = async (companyIds: string[]): Promise<Company[] | null> => {
  return handleApiResponse(
    apiClient.get<Company[]>('/companies/batch', {
      params: { ids: companyIds.join(',') },
    })
  )
}

// Cache implementation
const cache: Record<string, { data: any; timestamp: number }> = {}
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Retrieves cached data if it exists and is not expired.
 * @template T The type of the cached data
 * @param {string} key The cache key
 * @returns {T | null} The cached data or null if not found or expired
 */
const getCachedData = <T>(key: string): T | null => {
  const cached = cache[key]
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T
  }
  return null
}

/**
 * Sets data in the cache with the current timestamp.
 * @template T The type of the data to cache
 * @param {string} key The cache key
 * @param {T} data The data to cache
 */
const setCachedData = <T>(key: string, data: T): void => {
  cache[key] = { data, timestamp: Date.now() }
}

/**
 * Fetches a company by ID, using cache if available.
 * @param {string} companyId The ID of the company to fetch
 * @returns {Promise<Company | null>} The company data or null if not found or on error
 */
export const fetchCompanyWithCache = async (companyId: string): Promise<Company | null> => {
  const cacheKey = `company_${companyId}`
  const cachedData = getCachedData<Company>(cacheKey)
  if (cachedData) return cachedData

  const company = await handleApiResponse(apiClient.get<Company>(`/companies/${companyId}`))
  if (company) setCachedData(cacheKey, company)
  return company
}
