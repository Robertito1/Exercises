// import React, { useState, useEffect } from 'react'; REFACTOR THE CODE FROM BEGINNING AND USE DIFFERENT COMPONENTS
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
  const [weatherInformation, setWeatherinformation] = useState([])

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
  }

  const filterCountries = (e) => {
    setToShow(e.target.value.toLowerCase())

  }
  const api_key = process.env.REACT_APP_API_KEY
  let filtered = toShow === '' ? 'search' : names.filter(nation => nation.name.toLowerCase().includes(toShow))


  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query={country.capital}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeatherinformation(response.data)
        console.log(response.data)
      })
  }, [])

  if (filtered === 'search') {
    filtered = 'search for countries'
  } else if (filtered.length > 10) {
    filtered = 'input a more specific search'
  } else if (filtered.length < 10 && filtered.length >= 2 && displayCountryDetails === false) {
    filtered = filtered.map(country =>
      <div id={country.name} key={country.name}>
        {country.name}<button id={country.name} onClick={showCountryDetails}>show</button>
      </div>)
  } else if (filtered.length < 10 && filtered.length >= 2 && displayCountryDetails === true) {
    filtered = <h1>country <button onClick={() => setDisplayCountryDetails(false)}>hide</button></h1>
  } else {

    filtered = filtered.map(country =>
      <div key={country.name}>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>{country.languages.map(language => <li>{language.name}</li>)}</ul>
        <img src={country.flag} alt='flag' />
        <h1>Weather in {country.capital}</h1>
        <p>{weatherInformation.request.type}</p>
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
