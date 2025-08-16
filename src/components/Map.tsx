import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

function Map() {
  const position: [number, number] = [51.505, -0.09] // Default position

  return (
    <div className="@map h-80 w-full bg-gray-200">
      <h1>Map Component</h1>
      {/* Map rendering logic will go here */}
    </div>
  )

  return (
    <div className="@map h-10 w-10">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
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
      ,
    </div>
  )
}

export default Map
