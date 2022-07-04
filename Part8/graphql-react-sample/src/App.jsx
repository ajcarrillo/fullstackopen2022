import { useQuery } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import { useState } from "react"
import { ALL_AUTHORS } from "./queries/authorQueries"
import { ALL_BOOKS } from "./queries/bookQueries"
import BookForm from "./components/BookForm"

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [page, setPage] = useState("authors")

  if (authors.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <button onClick={() => setPage("authors")}>authors</button>
      <button onClick={() => setPage("books")}>books</button>
      <button onClick={() => setPage("addBook")}>add book</button>
      {page === "authors" && <Authors authors={authors.data.allAuthors} />}
      {page === "books" && <Books books={books.data.allBooks} />}
      {page === "addBook" && <BookForm />}
    </div>
  )
}

export default App
