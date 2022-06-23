import './App.css'
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const fetchPersons = () => {
    personService.getAll()
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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(persons.find(p => p.name === newName).id, person)
          .then(response => {
            setPersons(persons.map(p => p.id === response.data.id ? response.data : p))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService.create(person)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  /*const handleDelete = (id) => () => {
    if (window.confirm("Confirm delete?")) {
      personService.deletePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }*/

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
      <Persons
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App
