import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';


export default function App() {

  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {

    for (let i of [0, 1, 2, 3]) {
      fetch(`https://weather-api-m0ay.onrender.com?page=${i}&size=10`)
        .then(_data => _data.json())
        .then(data => setWeatherData(prevData => {
          return { ...prevData, ...data };
        }))
        .catch(err => {
          console.log(err)
        });
    }
  }, [])

  return (
    <main>
      <MapContainer id="map" center={[23.5120, 80.3290]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          Object.keys(weatherData).map((city, i) => {
            const cityData = weatherData[city]
            return (
              <Marker
                key={i}
                position={[cityData.coord.lat, cityData.coord.lon]}
              >
                <Popup className='popup' key={i}>
                  City: {city}<br/>
                  Temp: {cityData.temp}<br />
                  Max: {cityData.temp_max}<br />
                  Min: {cityData.temp_min}<br />
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
    </main>
  )
}