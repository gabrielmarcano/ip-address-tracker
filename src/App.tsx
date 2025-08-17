import { useEffect, useLayoutEffect, useState } from 'react'
import Map from './components/Map'
import Tracker from './components/Tracker'
import { useIpify, useNominatim } from './api/queries'
import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'

function App() {
  const [backgroundImage, setBackgroundImage] = useState<string>('')
  const [position, setPosition] = useState<[number, number]>([
    10.140374, -64.679587,
  ])

  countries.registerLocale(en)

  const ipify = useIpify(undefined)

  const region = ipify.data?.data?.location?.region
  const country = ipify.data?.data?.location?.country

  const nominatim = useNominatim(region!, country, {
    enabled: !!region,
  })

  const nominatimData = nominatim.data?.data

  useEffect(() => {
    if (nominatimData && nominatimData?.length > 0) {
      setPosition([Number(nominatimData[0].lat), Number(nominatimData[0].lon)])
    }
  }, [nominatimData])

  useLayoutEffect(() => {
    const handleResize = () => {
      // Set background image based on screen width
      setBackgroundImage(
        `/src/assets/pattern-bg-${window.innerWidth < 768 ? 'mobile' : 'desktop'}.png`
      )
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <div className="font-rubik flex min-h-screen w-full flex-col">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="background image"
            className="h-[300px] w-full md:h-[220px]"
          />
        )}

        <Map position={position} />
        <Tracker />
      </div>
      <div>
        <p className="bg-gray-200 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Gabriel Marcano. All rights
          reserved.
        </p>
      </div>
    </>
  )
}

export default App
