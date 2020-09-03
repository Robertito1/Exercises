import React, { useState, useEffect } from "react";
import axios from 'axios'


const Country = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [showDetails, setShowDetails] = useState(false)
    const [weatherInformation, setWeatherInformation] = useState([])


    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                setWeatherInformation(response.data)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleDetailsDisplay = () => {
        setShowDetails(!showDetails)
    }


    return (
        <React.Fragment>
            {showDetails ? <div>
                <h1>{country.name} <span><button onClick={toggleDetailsDisplay}>hide</button></span></h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h3>spoken languages</h3>
                <ul>{country.languages.map((language, i) => <li key={i}>{language.name}</li>)}</ul>
                <img src={country.flag} alt='flag' style={{ width: "100px", height: "100px" }} />
                <h2>{`Weather in ${country.capital}`}</h2>
                <p>Teamperature :{weatherInformation.current.temperature}</p>
                <img src={weatherInformation.current.weather_icons[0]} alt='atlernate' />
                <p>Wind :{`${weatherInformation.current.wind_speed} mph direction ${weatherInformation.current.wind_dir}`}</p>

            </div> :
                <div>
                    <span>{country.name}</span>
                    <button onClick={toggleDetailsDisplay}>show</button>
                </div>}
        </React.Fragment>

    )
}

export default Country;