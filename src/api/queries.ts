import { useQuery } from '@tanstack/react-query'
import { getIpify, getNominatim } from './api'

export const useIpify = (ipAddress?: string, config?: object) =>
  useQuery({
    queryKey: ['fetchIpify'],
    queryFn: () => getIpify(ipAddress),
    ...config,
  })

export const useNominatim = (
  query: string,
  country?: string,
  config?: object
) =>
  useQuery({
    queryKey: ['fetchNominatim', query],
    queryFn: () => getNominatim(query, country),
    ...config,
  })
