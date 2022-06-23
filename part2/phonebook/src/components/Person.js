function Person({ person }) {
  return (
    <div>
      <span style={{ marginRight: '1rem' }}>{person.name} {person.number}</span>
    </div>
  )
}

export default Person
