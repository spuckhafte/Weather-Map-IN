import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';


export default function App() {

  const [weatherData, setWeatherData] = useState({});
  const [endPage, setEndPage] = useState(0)
  
  useEffect(() => {
    fetch('https://weather-api-m0ay.onrender.com/config')
      .then(_data => _data.json())
      .then(data => setEndPage(+data.end_page)
      .catch(err => console.log(err);

  useEffect(() => {
    let i = 0
    if (endPage != 0) {
      while (i <= endPage) {
        fetch(`https://weather-api-m0ay.onrender.com?page=${i}&size=10`)
          .then(_data => _data.json())
          .then(data => setWeatherData(prevData => {
            return { ...prevData, ...data };
          })
          .catch(err => console.log(err));
        
        i += 1;
      }
    }
  }, [endPage])

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
