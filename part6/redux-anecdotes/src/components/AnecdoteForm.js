import { useDispatch } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { clearNotification } from "../reducers/notificationReducer"
import anecdotesService from "../services/anecdotes"

function AnecdoteForm() {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    const newAnecdote = await anecdotesService.create(content)
    dispatch(createNewAnecdote(newAnecdote))
    dispatch(setNotification(`you created a new anecdote: '${content}'`, 5000))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
