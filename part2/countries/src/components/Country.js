import { useState } from 'react'
import axios from 'axios'

function Country({ country }) {
  const { name, capital, population, languages, flags } = country
  const [show, setShow] = useState(false)
  const [weather, setWeather] = useState({})
  const [showWeather, setShowWeather] = useState(false)

  const fetchWeather = () => {
    axios.get(`http://api.weatherstack.com/current?query=${capital}`, {
      params: {
        access_key: process.env.REACT_APP_WEATHER_API_KEY
      }
    })
      .then(response => {
        setWeather(response.data.current)
        setShowWeather(true)
      })
  }

  const handleShowClick = () => {
    setShow(!show)
    fetchWeather()
  }

  return (
    <div style={{ 'marginBottom': '1rem' }}>
      <span>{name.common}</span>&nbsp;
      <button onClick={handleShowClick}>{show ? 'Hide' : 'Show'}</button>
      {show && (
        <div>
          <p>{`capital: ${capital}`}</p>
          <p>{`population: ${population}`}</p>
          <h2>Spoken languages</h2>
          <ul>
            {Object.keys(languages).map(key => (<li key={key}>{languages[key]}</li>))}
          </ul>
          <img
            src={flags.png}
            alt={`${name.common} flag`}
          />
          {showWeather && (<div>
            <h2>Weather in {capital}</h2>
            <p>{`temperature: ${weather.temperature} Celcius`}</p>
            <img
              src={weather.weather_icons[0]}
              alt={weather.weather_descriptions[0]}
            />
            <p>{`wind: ${weather.wind_speed} mph direcction ${weather.wind_dir}`}</p>
          </div>)}
        </div>
      )}
    </div>
  )
}

export default Country
