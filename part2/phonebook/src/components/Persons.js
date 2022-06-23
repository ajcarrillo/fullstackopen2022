import Person from './Person'
import personService from '../services/persons'

function Persons({ persons, setPersons }) {

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      {persons.map(person => {
        return (
          <div
            key={person.id}
            style={{ display: 'flex', marginBottom: '1rem' }}
          >
            <Person person={person}/>
            <button onClick={() => handleDelete(person)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Persons
