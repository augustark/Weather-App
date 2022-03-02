import {getWeather, getCurrentTime, getCurrentDate, nightAndDay} from './Functions'

export function Init() {
  DOM.Search()
  DOM.ToggleUnit()
  DOM.Render('auckland')
}

const DOM = (function(){
  let CITY_ID = ''
  let UNIT_ID = ''

  function Search() {
    document
      .getElementById('search')
      .addEventListener('click', function() {
        const input = document.querySelector('input[type="text"]')
        input.style.display = 'flex'
        input.setAttribute('autofocus', true)
        input.classList.remove('hide')
        input.focus()
        input.addEventListener('blur', handleBlur)
        input.addEventListener('keypress', handleEnter)
      })
  }

  function ToggleUnit() {
    document
      .getElementById('unit-display')
      .addEventListener('click', handleToggler)
  }
  
  async function Render(city, unit) {
    CITY_ID = city
    UNIT_ID = unit

    console.log(CITY_ID, UNIT_ID)
    const data = await getWeather(city, unit)
    DOMRender(data.description, data.city_country, data.feels_like, data.humidity, data.wind_speed, data.temp)
  }
  
  function handleToggler() {
    let unit = this.children[0]
    unit.innerHTML = unit.textContent === '°F' ? '°C' : '°F'

    let metric = unit.textContent === '°F' ? 'imperial' : 'metric'
    UNIT_ID = metric
    // console.log(CITY_ID, UNIT_ID)
    Render(CITY_ID, UNIT_ID)
  }
  
  function handleBlur() {
    console.log(this)
    if (window.innerWidth < 700)  {
      this.style.display = 'none'
      this.value = ''
    }
  }
  
  function handleEnter(e) {
    if (e.key === 'Enter') {
      CITY_ID = this.value.toLowerCase()
      console.log(CITY_ID, UNIT_ID)
      Render(CITY_ID, UNIT_ID)
      this.value = ''
    }
  }

  function DOMRender(desc, city, feels_like, humidity, wind_speed, temp) {
    document
      .getElementById('time')
      .innerHTML = getCurrentTime()
  
    document
      .getElementById('date')
      .innerHTML = getCurrentDate()
  
    document
      .getElementById('day-night')
      .innerHTML = nightAndDay()
  
    document
      .getElementById('weather')
      .innerHTML = desc
  
    document
      .getElementById('city')
      .innerHTML = city
  
    document
      .getElementById('feels-like')
      .innerHTML = feels_like
  
    document
      .getElementById('humidity')
      .innerHTML = humidity
  
    document
      .getElementById('wind-speed')
      .innerHTML = wind_speed
    
    document  
      .getElementById('temp')
      .innerHTML = temp
  }

  return {
    Search,
    ToggleUnit,
    Render
  }
})()