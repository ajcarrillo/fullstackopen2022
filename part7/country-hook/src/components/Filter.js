function Filter({ filter, handleSearchTermChange }) {
  return (
    <div>
      <form onSubmit={handleSearchTermChange}>
        <input
          type={filter.type}
          value={filter.value}
          onChange={filter.onChange}
          placeholder="Filter..."
        />
        <button type="submit">find</button>
      </form>
    </div>
  )
}

export default Filter
