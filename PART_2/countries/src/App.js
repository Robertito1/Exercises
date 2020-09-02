import React, { useState, useEffect } from 'react';

import Search from './components/Search'
import Country from './components/Country'

import axios from 'axios'





function App() {

    const [nations, setNations] = useState([])
    const [userInputValue, setUserInputValue] = useState('')
    let filtered = userInputValue === '' ? null : nations.filter(nation => nation.name.toLowerCase().includes(userInputValue))


    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setNations(response.data)
            })
    }, [])

    const handleFilterCountries = (e) => {
        setUserInputValue(e.target.value.toLowerCase())
    }


    const renderNations = () => {
        if (filtered === null) {
            return <p>input search</p>
        } else if (filtered.length > 10) {
            return <p>Too many results</p>
        }
        else if (filtered.length <= 10 && filtered.length >= 2) {
            return filtered = <div>{filtered.map(country => <Country key={country.name} country={country} />)}</div>
        } else if (filtered.length === 1) {
            return <div>
                <h1>{filtered[0].name}</h1>
                <p>capital {filtered[0].capital}</p>
                <p>population {filtered[0].population}</p>
                <h3>languages</h3>
                <ul>{filtered[0].languages.map(language => <li>{language.name}</li>)}</ul>
                <img src={filtered[0].flag} alt='flag' />
            </div>
        } else {
            return <p>try a different input</p>
        }
    }
    return (
        <div>
            <h1>Hello World</h1>
            <Search filterCountries={handleFilterCountries}
                searchInputValue={userInputValue} />
            {renderNations()}
        </div>
    )
}

export default App;


