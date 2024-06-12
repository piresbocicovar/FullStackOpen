import { useState, useEffect } from 'react'
import CountryService from './services/Countries'
import DisplayCountry from './components/DisplayCountry'

function App() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState("")
  const [selectedCountry, setSelectedCountry] = useState([])

  const handleCountryFilterChange = (event) => {
    console.log(event.target.value);
    setCountryFilter(event.target.value);
    setSelectedCountry("");
  }
  
  const showCountry = (filteredCountry) => {
    console.log(`showing ${filteredCountry.name.common}`);
    setCountryFilter(`${filteredCountry.name.common}`);
    console.log(filteredCountry);
    setSelectedCountry([filteredCountry]);
  }

  useEffect(() => {
    CountryService.getAll()
        .then(returnedCountries => {
          console.log(returnedCountries)
          setCountries(returnedCountries);
        })
      }, [])

  return (
    <>
      find countries <input value={countryFilter} onChange={handleCountryFilterChange}/>
      <br/>
      <DisplayCountry countryFilter={countryFilter}
                      countries={countries} 
                      showCountry={showCountry} 
                      selectedCountry={selectedCountry}/>
    </>
  )
}

export default App
