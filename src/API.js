import {weatherKey, unsplashKey} from '../keys/keys'

const getWeather = async (city, unit = 'metric') => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey()}&units=${unit}`, 
      {mode: 'cors'}
    )
    const data = await response.json()
    const result = {
      description: data.weather[0].description,
      city_country: `${data.name}, ${data.sys.country}`,
      wind_speed: `${data.wind.speed} ${windMetric(unit)}`,
      humidity: `${data.main.humidity}%`,
      feels_like: `${data.main.feels_like} ${unitMetric(unit)}`,
      temp: `${data.main.temp} ${unitMetric(unit)}`,
      iconUrl: getIcon(data.weather[0].icon),
      timezone: data.timezone
    }
    return result
  } catch(error) {
    console.log('Error: ', error)
  }
  
}

const unitMetric = (unit) => unit === 'metric' ? '°C' : '°F'
const windMetric = (unit) => unit === 'imperial' ? 'mph': 'km/h'
const getIcon = (id) => `http://openweathermap.org/img/wn/${id}@4x.png`

const getImage = async (id) => {
  let result
  await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${id}&client_id=${unsplashKey()}`, {mode: 'cors'})
    .then(response => response.json())
    .then(data => result = data)
    .catch(error => console.log('Error: ', error))

  return result
}

export {getWeather, getImage}