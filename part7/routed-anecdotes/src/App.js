import { useState } from "react"
import { Route, Link, Routes, useMatch } from "react-router-dom"
import About from "./components/pages/About"
import AnecdoteList from "./components/pages/AnecdoteList"
import CreateAnecdote from "./components/pages/CreateAnecdote"
import EditAnecdote from "./components/pages/EditAnecdote"
import Notification from "./components/Notification"

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="new-anecdote" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState("")

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const sendNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(""), 5000)
  }

  const match = useMatch("/anecdotes/:id")
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/new-anecdote"
          element={
            <CreateAnecdote
              addNew={addNew}
              sendNotification={sendNotification}
            />
          }
        />
        <Route
          path="/anecdotes/:id"
          element={<EditAnecdote anecdote={anecdote} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
