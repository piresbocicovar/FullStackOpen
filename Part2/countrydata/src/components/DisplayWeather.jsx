const DisplayWeather = ({weather}) => {
    if (weather) {
        return (
            <>
                <p><b>Temperature: </b>{weather.main.temp}C<sup>o</sup></p>
                <p><b>Wind: </b>{weather.wind.speed}</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`Weather: ${weather.weather[0].description}`}/>
            </>
        )
    }
}

export default DisplayWeather