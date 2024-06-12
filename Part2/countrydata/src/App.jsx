import { useState, useEffect } from 'react'
import CountryService from './services/Countries'
import DisplayCountry from './components/DisplayCountry'

function App() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState("")

  const handleCountryFilterChange = (event) => {
    console.log(event.target.value);
    setCountryFilter(event.target.value);
  }

  useEffect(() => {
    CountryService.getAll()
        .then(returnedCountries => {
          setCountries(returnedCountries)
        })
      }, [])

  return (
    <>
      find countries<input value={countryFilter} onChange={handleCountryFilterChange}/>
      <br/>
      <DisplayCountry countryFilter={countryFilter} countries={countries}/>
    </>
  )
}

export default App
