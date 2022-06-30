import { useDispatch } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"

function AnecdoteForm() {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createNewAnecdote(content))
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
