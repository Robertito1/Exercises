import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';


function App() {

  const [names, setNames] = useState([])
  const [toShow, setToShow] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setNames(response.data)
      })
  }, [])

  const filterContries = (e) => {
    setToShow(e.target.value.toLowerCase())

  }

  const filtered = toShow === 0 ? 'search' : names.filter(nation => nation.name.toLowerCase().includes(toShow))

  const header = 'welcome'
  return (
    <div className="App">
      <h1>{header}</h1>
      <input onChange={filterContries} value={toShow} />
      <div>{
        filtered.length > 10 ? 'too long' : filtered.map(country => <div>{country.name}<button>show</button></div>)
      }</div>

    </div>
  );
}

export default App;
