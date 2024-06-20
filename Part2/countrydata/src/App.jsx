import { useState, useEffect } from 'react'
import CountryService from './services/Countries'
import WeatherService from './services/Weather'
import DisplayCountry from './components/DisplayCountry'
import DisplayWeather from './components/DisplayWeather'

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState();

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value);
    const updatedFilteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().startsWith(event.target.value.toLowerCase()));
    setFilteredCountries(updatedFilteredCountries);
    getWeather(updatedFilteredCountries);
    }
  
  
  const showCountry = (filteredCountry) => {
    setCountryFilter(filteredCountry.name.common);
    setFilteredCountries([filteredCountry]);
    getWeather([filteredCountry]);
  }

  const getWeather = (filteredCountries) => {
    if (filteredCountries.length === 1){
      if(!weather) {
        WeatherService.getGeocoding(filteredCountries[0].capital)
          .then(returnedGeocoding =>
            WeatherService.getWeather(returnedGeocoding[0].lat, returnedGeocoding[0].lon)
              .then(returnedWeather =>
                setWeather(returnedWeather)
              )
          )
      }
    } else {
      setWeather();
    }
  }

  useEffect(() => {
    CountryService.getAll()
        .then(returnedCountries => {
          setCountries(returnedCountries);
        })
  }, [])

  return (
    <>
      find countries <input value={countryFilter} onChange={handleCountryFilterChange}/>
      <DisplayCountry countryFilter={countryFilter}
                      filteredCountries={filteredCountries}
                      showCountry={showCountry}/>
      <DisplayWeather weather={weather}/>
    </>
  )
}

export default App
