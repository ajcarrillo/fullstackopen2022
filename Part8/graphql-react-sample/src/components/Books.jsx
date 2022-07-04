const Books = ({ books }) => {
  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th style={{ textAlign: "center" }}>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((a, index) => (
            <tr key={`${a}-${index}`}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
