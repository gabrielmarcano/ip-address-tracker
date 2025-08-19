import { useMemo, useState } from 'react'
import countries from 'i18n-iso-countries'
import { useIpify } from '../api/queries'

import iconArrow from '../assets/icon-arrow.svg'

function Tracker() {
  const [ipAddressSearch, setIpAddressSearch] = useState<string>('')

  const ipify = useIpify(ipAddressSearch)

  const ipifyData = useMemo(() => ipify.data?.data, [ipify.data])

  return (
    <div className="@tracker absolute top-[20px] flex w-full flex-col items-center p-6">
      <h1 className="mb-8 text-2xl font-medium text-white md:mb-4">
        IP Address Tracker
      </h1>

      <div className="mb-6 flex w-full md:mb-12 md:max-w-120">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            ipify.refetch()
          }}
          className="flex w-full items-center justify-between"
        >
          <input
            type="text"
            placeholder="Search for any IP address"
            className={`w-full rounded-s-xl bg-white p-4 text-lg focus:outline-none md:p-3 md:px-5 md:text-base ${!ipAddressSearch && 'tracking-tighter'}`}
            value={ipAddressSearch}
            onChange={(e) => setIpAddressSearch(e.target.value)}
          />
          <button
            type="submit"
            className="flex h-full w-15 cursor-pointer items-center justify-center rounded-e-xl border-l-0 bg-black p-2 hover:bg-gray-950"
          >
            <img src={iconArrow} alt="arrow" />
          </button>
        </form>
      </div>

      <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm md:max-w-240 md:flex-row md:justify-start md:px-4 md:shadow-md">
        {ipify.error ? (
          <div className="text-center text-red-500">
            Error fetching data: {ipify.error.message}
          </div>
        ) : (
          <>
            <TextInfo
              title={'IP ADDRESS'}
              info={ipifyData?.ip}
              loading={ipify.isLoading}
            />

            <TextInfo
              title={'LOCATION'}
              info={ipifyData?.location.country}
              extra={ipifyData?.location.region}
              loading={ipify.isLoading}
            />

            <TextInfo
              title={'TIMEZONE'}
              info={ipifyData?.location.timezone}
              loading={ipify.isLoading}
            />

            <TextInfo
              title={'ISP'}
              info={ipifyData?.isp}
              nomargin
              loading={ipify.isLoading}
            />
          </>
        )}
      </div>
    </div>
  )
}

function TextInfo({
  title,
  info,
  extra,
  nomargin,
  loading,
}: {
  title: 'IP ADDRESS' | 'LOCATION' | 'TIMEZONE' | 'ISP'
  info?: string
  extra?: string
  nomargin?: boolean
  loading?: boolean
}) {
  const isLoading = useMemo(() => loading, [loading])
  const isEmpty = useMemo(() => !info, [info])

  const text = useMemo(() => {
    if (title === 'LOCATION' && info && extra) {
      return countries.getName(info, 'en') + ', ' + extra
    }

    if (title === 'TIMEZONE' && info) {
      return 'UTC ' + info
    }

    return info
  }, [title, info, extra])

  return (
    <>
      <div
        className={`text-center md:min-h-15 md:w-full md:px-4 md:text-left ${nomargin ? '' : 'mb-5 md:mb-0'}`}
      >
        <h3
          className={`mb-1 text-xs font-bold tracking-widest text-gray-400 md:text-[10px]`}
        >
          {title}
        </h3>

        {/* Show loading skeleton or N/A based on loading state */}
        {isLoading ? (
          <div className="h-4 w-24 animate-pulse bg-gray-300 md:w-32"></div>
        ) : (
          <div className="text-xl font-medium text-gray-950">
            {isEmpty ? 'N/A' : <>{text}</>}
          </div>
        )}
      </div>
      {!nomargin && (
        <div className="mr-5 hidden h-20 w-[1px] bg-gray-300 md:block"></div>
      )}
    </>
  )
}

export default Tracker
