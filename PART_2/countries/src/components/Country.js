import React, { useState } from "react";


const Country = ({ country }) => {

    const [showDetails, setShowDetails] = useState(false)

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
                <ul>{country.languages.map(language => <li>{language.name}</li>)}</ul>
                <img src={country.flag} alt='flag' />
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