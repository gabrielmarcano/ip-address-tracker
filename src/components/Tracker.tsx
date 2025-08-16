import { useState } from 'react'
import useCountry from '../api'

function Tracker() {
  const [ipAddress, setIpAddress] = useState('')
  const [location, setLocation] = useState('')
  const [timezone, setTimezone] = useState('')
  const [isp, setIsp] = useState('')
  const { data, loading, error, fetchData } = useCountry()

  const handleSearch = () => {
    if (ipAddress) {
      fetchData(ipAddress)
    }
  }
  return (
    <div className="@tracker -mt-150 flex flex-col items-center p-6">
      <h1 className="mb-4 text-2xl font-medium text-white">
        IP Address Tracker
      </h1>

      <div className="mb-4 flex w-full">
        <input
          type="text"
          placeholder="Search for any IP address or domain"
          className="w-[85%] rounded-md bg-white p-2 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="flex w-[15%] cursor-pointer items-center justify-center rounded-md bg-black p-2"
        >
          <img src="/src/assets/icon-arrow.svg" alt="arrow" />
        </button>
      </div>

      <div className="flex w-full flex-col items-center justify-center rounded-md bg-white p-4 text-xs font-bold text-gray-400">
        <h3>IP ADDRESS</h3>
        <div></div>

        <h3>LOCATION</h3>
        <div></div>

        <h3>TIMEZONE</h3>
        <div></div>

        <h3>ISP</h3>
        <div></div>
      </div>
    </div>
  )
}

export default Tracker
