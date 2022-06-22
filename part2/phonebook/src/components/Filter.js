function Filter({ filter, onChange }) {
  return (
    <div>
      filter shown with <input
      type="text"
      value={filter}
      onChange={onChange}
      placeholder="Search..."
    />
    </div>
  )
}

export default Filter
