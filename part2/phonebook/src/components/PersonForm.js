function PersonForm({ onSubmit, nameValue, numberValue, nameChange, numberChange }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input
        type="text"
        value={nameValue}
        onChange={nameChange}
      />
      </div>
      <br/>
      <div>number: <input
        type="text"
        value={numberValue}
        onChange={numberChange}
      />
      </div>
      <br/>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
