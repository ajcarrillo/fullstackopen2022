import './App.css'
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const fetchPersons = () => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(fetchPersons, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const filteredPersons = [...persons]
    if (event.target.value !== '') {
      const filteredPersonsByName = filteredPersons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      setPersons(filteredPersonsByName)
    } else {
      fetchPersons()
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const person = { name: newName, number: newNumber }
    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={newFilter}
        onChange={handleFilterChange}
      />
      <br/><br/>
      <PersonForm
        onSubmit={handleFormSubmit}
        nameValue={newName}
        numberValue={newNumber}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}

export default App
