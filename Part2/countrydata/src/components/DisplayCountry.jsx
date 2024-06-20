const DisplayCountry = ( {countryFilter, filteredCountries, showCountry} ) => {
    if (countryFilter === "" ) {
        return
    } else if (filteredCountries.length > 10) {
        return(
            <p>Too many matches, specify another filter</p>
        )
    } else if (filteredCountries.length == 0) {
        return(
            <p>No results</p>
        )
    } else if (filteredCountries.length > 1){
        return(
            <ul>
                {filteredCountries.map(filteredCountry => <li key={filteredCountry.name.official}>{filteredCountry.name.common} <button onClick={() => showCountry(filteredCountry)}>Show</button></li>)}
            </ul>
        )
    } else {
        return(
            <>
                <h1>{filteredCountries[0].name.common}</h1>
                <img src={filteredCountries[0].flags.png} alt={filteredCountries[0].flags.alt}/>
                <p><b>Capital:</b> {filteredCountries[0].capital[0]}</p>
                <p><b>Area:</b> {filteredCountries[0].area} km<sup>2</sup></p>
                <h4>Languages:</h4>
                <ul>
                    {Object.values(filteredCountries[0].languages).map(language => <li key={language}>{language}</li>)}
                </ul>
            </>            
        )
    }
}

export default DisplayCountry