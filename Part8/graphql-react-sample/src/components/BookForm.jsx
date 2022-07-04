import { useState } from "react"
import { ADD_BOOK, ALL_BOOKS } from "../queries/bookQueries"
import { ALL_AUTHORS } from "../queries/authorQueries"
import { useMutation } from "@apollo/client"

const BookForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState("")
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState("")
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()

    const year = published ? parseInt(published) : null

    const variables = {
      title,
      author,
      published: year,
      genres,
    }

    await addBook({ variables })

    setTitle("")
    setAuthor("")
    setPublished("")
    setGenres([])
    setGenre("")
  }

  const addGenre = () => {
    setGenres([...genres, genre])
    setGenre("")
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="published">Published</label>
        <input
          type="text"
          name="published"
          value={published}
          onChange={({ target }) => setPublished(target.value)}
        />
      </div>
      <div>
        <label htmlFor="genres">Genres</label>
        <input
          type="text"
          name="genres"
          value={genre}
          onChange={({ target }) => setGenre(target.value)}
        />
        <button onClick={addGenre} type="button">
          add genre
        </button>
        <p>genres: {genres.join(",")}</p>
      </div>
      <button type="submit">create book</button>
    </form>
  )
}

export default BookForm
