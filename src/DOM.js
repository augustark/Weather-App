import {getCurrentTime, getCurrentDate, getNightDay} from './Date_Time'
import {getWeather, getImage} from './API'

export default function Init() {
  DOM.Render('London')
}

const DOM = (function(){
  let CITY_ID = ''
  let UNIT_ID = ''
  
  async function Render(city, unit) {
    CITY_ID = city
    UNIT_ID = unit

    const data = await getWeather(city, unit)
    const input = document.querySelector('input[type="text"]')
    if (data) {
        input.placeholder = 'Search location'
        DOMRender(data)
    } else {
      input.placeholder = 'Location not found'
    }
  }

  async function renderImage(query) {
    let q = [
      ...query.split(' '), 
      getNightDay().toLowerCase()
    ].join('+')

    let img = await getImage(q)

    document
      .documentElement
      .style.setProperty('--bg', `url(${imgFull})`); 
    
    const credit = document.getElementById('credit')
    credit.innerHTML = img.user.name
    credit.parentElement.href = img.user.portfolio_url
  }
  
  function handleToggler() {
    let unit = this.children[0]
    unit.innerHTML = unit.textContent === '°F' ? '°C' : '°F'
    UNIT_ID = unit.textContent === '°F' ? 'imperial' : 'metric'
    Render(CITY_ID, UNIT_ID)
  }
  
  function handleBlur() {
    if (window.innerWidth < 700)  {
      this.style.display = 'none'
      this.value = ''
    }
  }
  
  function handleEnter(e) {
    if (e.key === 'Enter') {
      CITY_ID = this.value.toLowerCase()
      Render(CITY_ID, UNIT_ID)
      this.value = ''
    }
  }

  function handleInput() {
      const input = document.querySelector('input[type="text"]')
      input.style.display = 'flex'
      input.setAttribute('autofocus', true)
      input.classList.remove('hide')
      input.focus()
      input.addEventListener('blur', handleBlur)
      input.addEventListener('keypress', handleEnter)
  }

  function DOMRender(data) {
    document
      .getElementById('search')
      .addEventListener('click', handleInput)

    document
      .getElementById('unit-display')
      .addEventListener('click', handleToggler)

    document
      .getElementById('time')
      .innerHTML = getCurrentTime(data.timezone)
  
    document
      .getElementById('date')
      .innerHTML = getCurrentDate()
  
    document
      .getElementById('day-night')
      .innerHTML = getNightDay()
  
    document
      .getElementById('weather')
      .innerHTML = data.description
  
    document
      .getElementById('city')
      .innerHTML = data.city_country
  
    document
      .getElementById('feels-like')
      .innerHTML = data.feels_like
  
    document
      .getElementById('humidity')
      .innerHTML = data.humidity
  
    document
      .getElementById('wind-speed')
      .innerHTML = data.wind_speed
    
    document  
      .getElementById('temp')
      .innerHTML = data.temp

    document
      .getElementById('today-icon')
      .src = data.iconUrl
    
    // document
      // .documentElement
      // .style.setProperty('--bg', renderImage(data.description));
    
    // document.body.style.backgroundImage = renderImage(data.description)
    renderImage(data.description)
  }

  return {
    Render
  }
})()