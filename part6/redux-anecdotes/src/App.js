import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { setAnecdotes } from "./reducers/anecdoteReducer"

const App = () => {
  const notification = useSelector((state) => state.notification.notification)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <Notification notification={notification} />}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
