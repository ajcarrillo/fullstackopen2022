function Filter({ filter, onChange }) {
  return (
    <div>
      find countries
      <input
        type="text"
        value={filter}
        onChange={onChange}
        placeholder="Filter..."
      />
    </div>
  )
}

export default Filter
