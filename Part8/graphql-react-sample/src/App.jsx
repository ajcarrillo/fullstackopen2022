import { useQuery } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import { useState, useEffect } from "react"
import { ALL_AUTHORS } from "./queries/authorQueries"
import { ALL_BOOKS } from "./queries/bookQueries"
import BookForm from "./components/BookForm"
import Notification from "./components/Notification/Notification"
import LoginForm from "./components/LoginForm"

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [page, setPage] = useState("authors")
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("book-user-token")
    if (token) {
      setToken(token)
    }
  }, [])

  if (authors.loading) {
    return <div>Loading...</div>
  } else {
    if (!token) {
      return (
        <div>
          <Notification notification={notification} />
          <LoginForm setNotification={setNotification} setToken={setToken} />
        </div>
      )
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      <button onClick={() => setPage("authors")}>authors</button>
      <button onClick={() => setPage("books")}>books</button>
      <button onClick={() => setPage("addBook")}>add book</button>
      {page === "authors" && (
        <Authors
          setNotification={setNotification}
          authors={authors.data.allAuthors}
        />
      )}
      {page === "books" && <Books books={books.data.allBooks} />}
      {page === "addBook" && <BookForm setNotification={setNotification} />}
    </div>
  )
}

export default App
