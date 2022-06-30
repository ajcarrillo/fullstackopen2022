import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { clearNotification } from "../reducers/notificationReducer"
import FilterForm from "./FilterForm"

function AnecdoteList() {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    console.log(anecdotes)
    if (anecdotes.length === 0) {
      return []
    }
    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.term.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const voteFor = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
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
