import { useLayoutEffect, useState } from 'react'
import Map from './components/Map'
import Tracker from './components/Tracker'

function App() {
  const [backgroundImage, setBackgroundImage] = useState<string>('')

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

        <Map />
        <Tracker />
      </div>
      {/* <div>
        <p className="h-50 bg-gray-200 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Gabriel Marcano. All rights
          reserved.
        </p>
      </div> */}
    </>
  )
}

export default App
