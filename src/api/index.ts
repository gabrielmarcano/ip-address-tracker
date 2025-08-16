import axios, { type AxiosError } from 'axios'
import { useState } from 'react'

const api = axios.create({
  baseURL: 'https://geo.ipify.org/api/v2',
  params: {
    apiKey: import.meta.env.VITE_GEO_API_KEY,
  },
})

function useCountry() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AxiosError | null>(null)

  const fetchData = async (ipAddress: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get('/country', {
        params: { ipAddress },
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
