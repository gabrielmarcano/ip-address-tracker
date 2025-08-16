import './App.css'
import Map from './components/Map'
import Tracker from './components/Tracker'

function App() {
  return (
    <>
      <div className="font-rubik flex min-h-screen w-full flex-col">
        <img
          src="/src/assets/pattern-bg-mobile.png"
          alt="preview"
          className="w-full"
        />
        <Map />
        <Tracker />
      </div>
    </>
  )
}

export default App
