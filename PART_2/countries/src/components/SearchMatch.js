import React, { useState, useEffect } from "react";
import axios from 'axios'


const SearchMatch = ({ country }) => {
    // api_key stored in the .env file is accessed with the process.env
    const api_key = process.env.REACT_APP_API_KEY
    const [weatherInfo, setWeatherInfo] = useState('')

    useEffect(() => {
        axiosGet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //  

    const axiosGet = () => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                console.log(response.data.current.temperature)
                setWeatherInfo(response.data)
            });
    }

    if (!weatherInfo) return null; // empty render until we get data




    return (

        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>spoken languages</h3>
            <ul>{country.languages.map((language, i) => <li key={i}>{language.name}</li>)}</ul>
            <img src={country.flag} style={{ width: "100px", height: "100px" }} alt='flag' />
            <h2>{`Weather in ${country.capital}`}</h2>
            <p>Temperature :{weatherInfo.current.wind_speed}</p>
            <img src={weatherInfo.current.weather_icons[0]} alt='atlernate' />
            <p>Wind :{`${weatherInfo.current.wind_speed} mph direction ${weatherInfo.current.wind_dir}`}</p>
        </div>



    )
}

export default SearchMatch;