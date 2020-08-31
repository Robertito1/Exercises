import React, { useState, useEffect } from 'react';
import axios from 'axios'

const FilteredCountries = ({ onInputChange, toShow, filtered }) => {
  return (
    <div>
      <input onChange={onInputChange} value={toShow} />
      <div>{
        filtered
      }</div>
    </div>
  )
}
function App() {

  const [names, setNames] = useState([])
  const [toShow, setToShow] = useState('')
  const [displayCountryDetails, setDisplayCountryDetails] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setNames(response.data)
      })
  }, [])

  const showCountryDetails = (e) => {
    setDisplayCountryDetails(!displayCountryDetails)
    console.log(e.target.parentNode)
  }

  const filterCountries = (e) => {
    setToShow(e.target.value.toLowerCase())
  }

  let filtered = toShow === '' ? 'search' : names.filter(nation => nation.name.toLowerCase().includes(toShow))

  const countryDetail = !displayCountryDetails ? '' : <div>Country Details</div>

  if (filtered === 'search') {
    filtered = 'search'
  } else if (filtered.length > 10) {
    filtered = 'search more'
  } else if (filtered.length < 10 && filtered.length > 2) {
    filtered = filtered.map(country =>
      <div id={country.name} key={country.name}>
        {countryDetail}
        {country.name}<button id={country.name} onClick={showCountryDetails}>show</button>
      </div>)
  } else {
    filtered = filtered.map(country =>
      <div key={country.name}>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>{country.languages.map(language => <li>{language.name}</li>)}</ul>
        <img src={country.flag} alt='flag' />
      </div>)
  }

  const header = 'welcome'
  return (
    <div className="App">
      <h1>{header}</h1>
      <FilteredCountries onInputChange={filterCountries} toShow={toShow} filtered={filtered} />
    </div>
  );
}

export default App;
