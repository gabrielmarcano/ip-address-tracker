import { useLayoutEffect, useState } from 'react'
import './App.css'
import Map from './components/Map'
import Tracker from './components/Tracker'

function App() {
  const [backgroundImage, setBackgroundImage] = useState('')

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
        <img
          src={backgroundImage}
          alt="preview"
          className="h-[300px] w-full md:h-[220px]"
        />
        <Map />
        <Tracker />
      </div>
    </>
  )
}

export default App
