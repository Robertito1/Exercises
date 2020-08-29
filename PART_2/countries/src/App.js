import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';


function App() {

  const [names, setNames] = useState('')
  const [toShow, setToShow] = useState(false)

  useEffect(() => {
    console.log('effect')
    Axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setNames(response.data.map(country => <p>{country.name}</p>))
      })
  }, [])

  const filterConturies = (e) => {
    const input = e.target.value
    if (input) {
      setToShow(true)
    }
    return input
  }

  // const filtered = toShow ? null : names.filter(nation => nation.name.toLowerCase().includes(input))

  const header = 'welcome'
  return (
    <div className="App">
      <h1>{header}</h1>
      <div>{
        names
      }</div>
      <input onChange={filterConturies} />
    </div>
  );
}

export default App;
