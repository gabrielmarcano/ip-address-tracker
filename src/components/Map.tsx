import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center)
  }, [center, map])
  return null
}

function Map({ position }: { position: [number, number] }) {
  console.log(position)
  return (
    <>
      <div className="@map -z-1 h-[calc(100vh+100px)] w-full">
        <MapContainer
          center={[...position]}
          zoom={8}
          zoomControl={false}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <ChangeView center={[...position]} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  )
}

export default Map
