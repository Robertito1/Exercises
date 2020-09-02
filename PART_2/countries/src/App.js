import React, { useState, useEffect } from 'react';

import Search from './components/Search'
import Country from './components/Country'

import axios from 'axios'
import SearchMatch from './components/SearchMatch';





function App() {

    const [nations, setNations] = useState([])
    const [userInputValue, setUserInputValue] = useState('')
    let filtered = userInputValue === '' ? null : nations.filter(nation => nation.name.toLowerCase().includes(userInputValue))


    // http://api.weatherstack.com/current
    // ? access_key = api_key
    // & query = ;Singapur;Shanghai


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
            return filtered = <div>{filtered.map(country => <SearchMatch country={country} />)}</div>
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


