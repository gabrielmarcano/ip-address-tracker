import axios, { type AxiosError } from 'axios'
import { useState } from 'react'

const api = axios.create({
  baseURL: 'https://geo.ipify.org/api/v2',
  params: {
    apiKey: import.meta.env.VITE_GEO_API_KEY,
  },
})

type CountryData = {
  ip: string
  location: {
    country: string
    region: string
    timezone: string
  }
  domains: string[]
  as: {
    asn: number
    name: string
    route: string
    domain: string
    type: string
  }
  isp: string
}

function useCountry() {
  const [data, setData] = useState<CountryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  const fetchData = async (ipAddressSearch: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get('/country', {
        params: { ipAddressSearch },
      })
      setData(response.data)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err)
      }
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, fetchData }
}

export default useCountry
