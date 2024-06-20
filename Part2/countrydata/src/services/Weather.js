import axios from 'axios'
const baseUrl = 'http://api.openweathermap.org/'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getGeocoding = (capital) => {
    const request = axios.get(`${baseUrl}/geo/1.0/direct?q=${capital}&appid=${apiKey}`)
    return request.then(response => response.data)
}

const getWeather = (latitude, longitude) => {
    const request = axios.get(`${baseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default { getWeather, getGeocoding }