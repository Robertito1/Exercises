import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FilterNames = ({ onInput, value }) => {

  return (
    <div>
      <span>search</span> <input onChange={onInput} value={value} />
    </div>
  )
}

const NewPersonForm = ({ addPerson, newName, inputName, inputPhone, newPhone }) => {


  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={inputName} /> <br />
          phone-number:  <input
          value={newPhone}
          onChange={inputPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {
        persons.map(person => <div key={person.id}>{person.name} : {person.number}</div>)
      }
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [shown, setShown] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons').then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    }

    const checkForUniqueness = persons.find(person => person.name === personObject.name)
    if (checkForUniqueness) {
      alert(`${personObject.name} already exists in the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewPhone('')
  }

  const handleNameInputChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneInputChange = (e) => {
    setNewPhone(e.target.value)
  }

  const handleFilter = (e) => {
    setShown(e.target.value.toLowerCase())
  }

  const personsToShow = shown.length === 0 ? persons : persons.filter(person => person.name.toLowerCase().includes(shown))


  return (
    <div>
      <h2>Phonebook</h2>
      <FilterNames onInput={handleFilter} value={shown} />
      <NewPersonForm addPerson={addPerson}
        inputName={handleNameInputChange}
        inputPhone={handlePhoneInputChange}
        newName={newName}
        newPhone={newPhone}
      />
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App