import { useEffect, useState } from 'react'
import useCountry from '../api'

function Tracker() {
  const [ipAddressSearch, setIpAddressSearch] = useState<string>('')
  const { data, loading, error, fetchData } = useCountry()

  useEffect(() => {
    // Fetch initial data for a default IP address or domain
    setIpAddressSearch('8.8.8.8')
    handleSearch()
  }, [])

  const handleSearch = async () => {
    if (ipAddressSearch) {
      try {
        await fetchData(ipAddressSearch).then(() => {})
        setIpAddressSearch('')
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
  }

  console.log(ipAddressSearch, data, loading, error)

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="@tracker absolute top-[15%] flex w-full flex-col items-center p-6">
      <h1 className="mb-4 text-2xl font-medium text-white">
        IP Address Tracker
      </h1>

      <div className="mb-4 flex w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
          }}
          className="flex w-full items-center justify-between"
        >
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            className="w-[85%] rounded-md bg-white p-2 focus:outline-none"
            value={ipAddressSearch}
            onChange={(e) => setIpAddressSearch(e.target.value)}
            required
          />
          <button
            type="submit"
            className="flex h-full w-[15%] cursor-pointer items-center justify-center rounded-md bg-black p-2"
          >
            <img src="/src/assets/icon-arrow.svg" alt="arrow" />
          </button>
        </form>
      </div>

      <div className="flex w-full flex-col items-center justify-center rounded-md bg-white p-4 md:flex-row">
        <TextInfo text={'IP ADDRESS'} subtitle />
        {data && data.ip ? (
          <TextInfo text={data.ip} />
        ) : (
          <TextInfo text="N/A" />
        )}

        <TextInfo text={'LOCATION'} subtitle />
        {data && data.location.country && data.location.region ? (
          <TextInfo text={data.location.country} />
        ) : (
          <TextInfo text="N/A" />
        )}

        <TextInfo text={'TIMEZONE'} subtitle />
        {data && data.location.timezone ? (
          <TextInfo text={`UTC ${data?.location.timezone}`} />
        ) : (
          <TextInfo text="N/A" />
        )}

        <TextInfo text={'ISP'} subtitle />
        {data && data.isp ? (
          <TextInfo text={data.isp} />
        ) : (
          <TextInfo text="N/A" />
        )}
      </div>
    </div>
  )
}

function TextInfo({ text, subtitle }: { text: string; subtitle?: boolean }) {
  if (subtitle) {
    return <h3 className="text-xs font-bold text-gray-400">{text}</h3>
  }

  return <div className="mb-3 text-xl font-medium text-gray-950">{text}</div>
}

export default Tracker
