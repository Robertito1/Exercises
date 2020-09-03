import React, { useState, useEffect } from 'react';

import Search from './components/Search'
import Country from './components/Country'

import axios from 'axios'
import SearchMatch from './components/SearchMatch';





function App() {

    const [nations, setNations] = useState([])
    const [userInputValue, setUserInputValue] = useState('')

    // saving the countries that match the search to a variable , this variable will set to null if there is not input in the search input box
    let filtered = userInputValue === '' ? null : nations.filter(nation => nation.name.toLowerCase().includes(userInputValue))



    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                // After the first render all the nations are gotten from the API and store to the state 'nations'
                setNations(response.data)
            })
    }, [])




    const handleFilterCountries = (e) => {
        // the filter is based on the value gotten from here
        setUserInputValue(e.target.value.toLowerCase())
    }

    // conditionally rendering the output of the search
    const renderNations = () => {
        // if there is no input in the search box , find countries will be rendered
        if (filtered === null) {
            return <p>find countries</p>
            // if the number of countries that match the search are more than 10 'too many results' will be rendered
        } else if (filtered.length > 10) {
            return <p>Too many results</p>
        }
        // if the number is between 10 and 2 , each of them will be rendered with a button beside them to show individual details
        else if (filtered.length <= 10 && filtered.length >= 2) {
            return filtered = <div>{filtered.map(country => <Country key={country.name} country={country} />)}</div>
            // if the search match only one country , the details of the country will be rendered automatically
        } else if (filtered.length === 1) {
            return filtered = <div>{filtered.map(country => <SearchMatch key={country.name} country={country} />)}</div>
            // if the searchhas no match 'no match will be rendered'
        } else {
            return <p>No match! try a different input</p>
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


