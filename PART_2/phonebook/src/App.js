import React, { useState } from 'react'

const NewPersonForm = ({ addPerson, newName, inputName, inputPhone, newPhone }) => {


  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={inputName} />
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
        persons.map(person => <div key={person.id}>{person.name} : {person.phone}</div>)
      }
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: 345235812, id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')

  }

  const handleNameInputChange = (e) => {
    setNewName(e.target.value)
  }
  const handlePhoneInputChange = (e) => {
    setNewPhone(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <NewPersonForm addPerson={addPerson}
        inputName={handleNameInputChange}
        inputPhone={handlePhoneInputChange}
        newName={newName}
        newPhone={newPhone}
      />
      <Persons persons={persons} />
    </div>
  )
}

export default App