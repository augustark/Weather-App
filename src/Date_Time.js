const D_T =(function() {
  const currentDate = new Date()
  let currentDay

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

  const getCurrentTime = (timezone) => {
    const utc = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000)
    currentDay = new Date(utc + (1000 * timezone)).toLocaleTimeString([], {hour: '2-digit'})
    return new Date(utc + (1000 * timezone)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  }

  const getNightDay = () => {
    let hour = parseInt(currentDay.slice(0, 2))
    return hour > 16 || hour < 4 ? 'Night' : 'Day'
  }

  return {
    getCurrentDate,
    getCurrentTime,
    getNightDay
  }
})()

export const {getCurrentDate, getCurrentTime, getNightDay} = D_T