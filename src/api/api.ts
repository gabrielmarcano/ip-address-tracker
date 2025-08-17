import axios from 'axios'
import type { CountryData, NominatimData } from './types'

export const getIpify = (ipAddress?: string) =>
  axios.get<CountryData>('https://geo.ipify.org/api/v2/country', {
    params: { ipAddress, apiKey: import.meta.env.VITE_GEO_API_KEY },
  })

export const getNominatim = (query: string, country?: string) =>
  axios.get<NominatimData>(
    'https://nominatim.openstreetmap.org/search',
    // 'http://192.168.0.200:8080/search',
    {
      params: { q: query, format: 'json', countrycodes: country },
      headers: { 'Access-Control-Allow-Origin': '*' },
    }
  )
