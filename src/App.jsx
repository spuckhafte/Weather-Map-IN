import './App.css';

import { useEffect, useState } from 'react';
import Map from './components/Map';
import Load from './components/Load';


export default function App() {

  const [weatherData, setWeatherData] = useState({});
  const [endPage, setEndPage] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch('https://weather-api-m0ay.onrender.com/config')
      .then(_data => _data.json())
      .then(data => setEndPage(+data.end_page))
      .catch(err => console.log(err));
  });

  useEffect(() => {
    let i = 0
    if (endPage != 0) {
      while (i <= endPage) {
        fetch(`https://weather-api-m0ay.onrender.com?page=${i}&size=10`)
          .then(_data => _data.json())
          .then(data => setWeatherData(prevData => {
            setReady(true);
            return { ...prevData, ...data };
          }))
          .catch(err => console.log(err));

        i += 1;
      }
    }
  }, [endPage])

  return (
    <main>
      {
        ready ? <Map weather={weatherData} />
          : <Load />
      }
    </main>
  )
}
