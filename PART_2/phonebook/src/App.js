import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import NewPersonForm from './components/NewPersonForm'
import FilterNames from './components/FilterNames'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [shown, setShown] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getPersons()
      .then(response => {
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

    const duplicateName = persons.find(person => person.name === personObject.name)
    if (duplicateName) {
      const id = duplicateName.id
      personService
        .updatePerson({ ...duplicateName, number: personObject.number }, personObject.name, id)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response.data))
          setNotificationMessage(`${personObject.name}'s Number Updated Successfully`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
          setNewName('')
          setNewPhone('')
        })
    } else if (!personObject.name) {
      alert('namespace is empty')
    } else {
      setPersons(persons.concat(personObject))
      personService
        .createPerson(personObject)
        .then(response => {
          console.log(response)
        })
      setNotificationMessage(
        `'${personObject.name}' was added to the phonebook `
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
      setNewName('')
      setNewPhone('')
    }
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

  const handleDeleteOf = (id, name) => {
    personService
      .deletePerson(id, name)
    console.log(`deleted ${id}`)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage === null ? null : <Notification message={notificationMessage} />}
      <FilterNames onInput={handleFilter} value={shown} />
      <NewPersonForm addPerson={addPerson}
        inputName={handleNameInputChange}
        inputPhone={handlePhoneInputChange}
        newName={newName}
        newPhone={newPhone}
      />

      {
        personsToShow.map((person, i) =>
          <Person key={i}
            person={person}
            handleDelete={() => handleDeleteOf(person.id, person.name)}
          />)
      }
    </div>
  )
}

export default App

// { 
//   "name": "Arto Hellas", 
//   "number": "040-123456",
//   "id": 1
// },
// { 
//   "name": "Ada Lovelace", 
//   "number": "39-44-5323523",
//   "id": 2
// },
// { 
//   "name": "Dan Abramov", 
//   "number": "12-43-234345",
//   "id": 3
// },
// { 
//   "name": "Mary Poppendieck", 
//   "number": "39-23-6423122",
//   "id": 4
// }