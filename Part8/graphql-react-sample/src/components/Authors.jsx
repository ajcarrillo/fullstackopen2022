import { useState } from "react"
import Select from "react-select"
import { useMutation } from "@apollo/client"
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries/authorQueries"

function Authors({ authors, setNotification }) {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState("")
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      if (typeof error.graphQLErrors[0] !== "undefined") {
        setNotification({
          message: error.graphQLErrors[0].message,
          type: "error",
        })
      } else {
        console.log("error", error)
        setNotification({
          message: "Something went wrong",
          type: "error",
        })
      }
    },
  })
  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))

  const setBirthday = async (event) => {
    event.preventDefault()
    const year = born ? parseInt(born) : null
    const variables = {
      name: selectedAuthor.value,
      setBornTo: year,
    }

    await updateAuthor({ variables })
    setSelectedAuthor(null)
    setBorn("")
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th style={{ textAlign: "center" }}>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthday</h2>
      <Select
        defaultValue={selectedAuthor}
        onChange={setSelectedAuthor}
        options={options}
      />
      {selectedAuthor && (
        <form onSubmit={setBirthday}>
          <div>
            <label htmlFor="born">Born</label>
            <input
              type="number"
              name="born"
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">Set birthday</button>
        </form>
      )}
    </div>
  )
}

export default Authors
