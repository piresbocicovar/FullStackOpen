const DisplayCountry = ( {countries, countryFilter} ) => {
    if (countryFilter === "" ) {
        return
    } else if ((countries.filter(country => country.name.common.toLowerCase().startsWith(countryFilter.toLowerCase())).length) > 10) {
        return(
            <p>Too many matches, specify another filter</p>
        )
    } else if ((countries.filter(country => country.name.common.toLowerCase().startsWith(countryFilter.toLowerCase())).length) == 0) {
        return(
            <p>No results</p>
        )
    } else if ((countries.filter(country => country.name.common.toLowerCase().startsWith(countryFilter.toLowerCase())).length) > 1){
        return(
            <p>
                {countries.filter(country => country.name.common.toLowerCase().startsWith(countryFilter.toLowerCase()))
                          .map(filteredCountry => <li key={filteredCountry.name.official}>{filteredCountry.name.common}</li>)}
            </p>
        )
    } else {
        return(
            countries.filter(country => country.name.common.toLowerCase().startsWith(countryFilter.toLowerCase()))
                     .map(filteredCountry => 
                        <li key={filteredCountry.name.official}>
                            <h1>{filteredCountry.name.common}</h1>
                            <img src={filteredCountry.flags.png} alt={filteredCountry.flags.alt}/>
                            <p><b>Capital:</b> {filteredCountry.capital}</p>
                            <p><b>Area:</b> {filteredCountry.area}</p>
                            <h4>Languages:</h4>
                            <ul>
                                {Object.values(filteredCountry.languages).map(language => <li key={language}>{language}</li>)}
                            </ul>
                            <h4>Currencies:</h4>
                            <ul>
                                {Object.values(filteredCountry.currencies).map(currency => <li key={currency.name}>{currency.symbol} {currency.name}</li>)}
                            </ul>
                        </li>
                    )
        )
    }
}

export default DisplayCountry