export type CountryData = {
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

export type NominatimData =
  | {
      place_id: number
      licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright'
      osm_type: string
      osm_id: number
      lat: string
      lon: string
      class: string
      type: string
      place_rank: number
      importance: number
      addresstype: string
      name: string
      display_name: string
      boundingbox: [string, string, string, string]
    }[]
  | []
