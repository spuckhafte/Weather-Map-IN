import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Load() {
  return (
    <div className="wrapper">
      <MapContainer
        id="map-false" center={[23.5120, 80.3290]} zoom={5}
        scrollWheelZoom={false}
        
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </ MapContainer>
      <div id="loading"></div>
    </div>
  )
}
