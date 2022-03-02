
//metric - Celsius
//imperial - Fahrenheit


const getWeather = async (city, unit = 'metric') => {
  const _key = '7b0b1dcfbedaa9bb988c8c3115985fe5'
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${_key}&units=${unit}`, 
    {mode: 'cors'}
  )
  const data = await response.json()
  const result = {
    description: data.weather[0].description,
    city_country: `${data.name}, ${data.sys.country}`,
    wind_speed: `${data.wind.speed} ${windMetric(unit)}`,
    humidity: `${data.main.humidity}%`,
    feels_like: `${data.main.feels_like} ${unitMetric(unit)}`,
    temp: `${data.main.temp} ${unitMetric(unit)}`
  }
  return result
}

const unitMetric = (unit) => unit === 'metric' ? '°C' : '°F'
const windMetric = (unit) => unit === 'imperial' ? 'mph': 'km/h'

const dateAndTime =(function() {
  const currentDate = new Date()
  const currentHour = currentDate.getHours()
  const currentMinute = currentDate.getMinutes()

  const getCurrentDate = () => {
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()

    return new Date(`${month}-${day}-${year}`).toLocaleString("en-US", { 
      weekday: 'long',
      day: 'numeric',
      month: "short",
      year: 'numeric' 
    })
  }

  const getCurrentTime = () => {
    const time = `${getHours()}:${getMinutes()} ${getMeridiem()}`
    return time
  }
  
  const getHours = () => {
    let hour = currentHour
    hour = (hour > 12) ? hour - 12 : hour
    return (hour < 10) ? `0${hour}` : hour
  }

  const getMinutes = () => {
    let minute = currentMinute
    return minute < 10 ? `0${minute}` : minute
  }

  const getMeridiem = () => {
    let hour = currentHour
    return hour > 12 ? 'PM' : 'AM'
  }

  const nightAndDay = () => {
    let hour = currentHour
    return hour > 16 || hour < 4 ? 'Night' : 'Day'
  }

  return {
    getCurrentDate,
    getCurrentTime,
    nightAndDay
  }
})()

const {getCurrentDate, getCurrentTime, nightAndDay} = dateAndTime

export {
  getWeather,
  getCurrentTime,
  getCurrentDate,
  nightAndDay
}