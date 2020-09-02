import React, { useState, useEffect } from "react";
import axios from 'axios'


const Country = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [showDetails, setShowDetails] = useState(false)
    const [weatherInformation, setWeatherInformation] = useState([])


    useEffect(() => {
        console.log('effect')
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                console.log('weather')
                setWeatherInformation(response.data)
                console.log(response.data)
            })
    }, [])

    const toggleDetailsDisplay = () => {
        setShowDetails(!showDetails)
        console.log(country.name, showDetails)
    }


    return (
        <React.Fragment>
            {showDetails ? <div>
                <h1>{country.name}</h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h3>languages</h3>
                <ul>{country.languages.map((language, i) => <li key={i}>{language.name}</li>)}</ul>
                <img src={country.flag} alt='flag' />
                <h2>{`Weather in ${country.capital}`}</h2>
                <p>Teamperature :{weatherInformation.current.temperature}</p>
                <img src={weatherInformation.current.weather_icons[0]} alt='atlernate' />
                <p>Wind :{`${weatherInformation.current.wind_speed} mph direction ${weatherInformation.current.wind_dir}`}</p>
                <button onClick={toggleDetailsDisplay}>hide</button>
            </div> :
                <div>
                    <span>{country.name}</span>
                    <button onClick={toggleDetailsDisplay}>show</button>
                </div>}
        </React.Fragment>

    )
}

export default Country;