import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map({ weather }) {
  return (
    <MapContainer
      id="map" center={[23.5120, 80.3290]} zoom={5}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        Object.keys(weather).map((city, i) => {
          const cityData = weather[city]
          return (
            <Marker
              key={i}
              position={[cityData.coord.lat, cityData.coord.lon]}
            >
              <Popup className='popup' key={i}>
                City: {city}<br />
                Temp: {cityData.temp}°C<br />
                Max: {cityData.temp_max}°C<br />
                Min: {cityData.temp_min}°C<br />
                <div className='weather-icon'>
                  <img src={cityData.weather_icon}></img>
                  {cityData.weather}
                </div>
              </Popup>
            </Marker>
          )
        })
      }
    </MapContainer>
  )
}
