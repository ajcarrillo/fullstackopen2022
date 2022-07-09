import { useQuery, useApolloClient } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import { useState, useEffect } from "react"
import { ALL_AUTHORS } from "./queries/authorQueries"
import { ALL_BOOKS } from "./queries/bookQueries"
import BookForm from "./components/BookForm"
import Notification from "./components/Notification/Notification"
import LoginForm from "./components/LoginForm"
import LogoutButton from "./components/LogoutButton"
import Recommendations from "./components/Recommendations"

const App = () => {
  const client = useApolloClient()
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

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (authors.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Notification notification={notification} />
      <button onClick={() => setPage("authors")}>authors</button>
      <button onClick={() => setPage("books")}>books</button>
      <LogoutButton logout={logout} token={token} setPage={setPage} />
      {page === "authors" && (
        <Authors
          setNotification={setNotification}
          authors={authors.data.allAuthors}
          token={token}
        />
      )}
      {page === "books" && <Books books={books.data.allBooks} />}
      {page === "addBook" && <BookForm setNotification={setNotification} />}
      {page === "login" && (
        <LoginForm
          setToken={setToken}
          setNotification={setNotification}
          setPage={setPage}
        />
      )}
      {page === "recommendations" && <Recommendations />}
    </div>
  )
}

export default App
