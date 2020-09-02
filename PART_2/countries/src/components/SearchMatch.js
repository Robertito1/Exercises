import React, { useState, useEffect } from "react";
import axios from 'axios'


const SearchMatch = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weatherInfo, setWeatherInfo] = useState('')


    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                console.log(response.data.current.temperature)
                setWeatherInfo(response.data)
            })
    }, [])



    return (

        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>{country.languages.map((language, i) => <li key={i}>{language.name}</li>)}</ul>
            <img src={country.flag} alt='flag' />
            <h2>{`Weather in ${country.capital}`}</h2>
            <p>Temperature :{weatherInfo.current.wind_speed}</p>
            <img src={weatherInfo.current.weather_icons[0]} alt='atlernate' />
            <p>Wind :{`${weatherInfo.current.wind_speed} mph direction ${weatherInfo.current.wind_dir}`}</p>
        </div>



    )
}

export default SearchMatch;