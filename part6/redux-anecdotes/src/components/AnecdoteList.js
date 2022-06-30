import { useSelector, useDispatch } from "react-redux"
import { updateAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import FilterForm from "./FilterForm"

function AnecdoteList() {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (anecdotes.length === 0) {
      return []
    }
    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.term.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const voteFor = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you voted for '${anecdote.content}'`))
  }

  return (
    <div>
      <FilterForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteFor(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
