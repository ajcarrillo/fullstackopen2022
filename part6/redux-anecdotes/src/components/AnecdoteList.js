import { connect } from "react-redux"
import { updateAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import FilterForm from "./FilterForm"

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes.filter((a) =>
    a.content.toLowerCase().includes(props.filter.term.toLowerCase())
  )
  const voteFor = (anecdote) => {
    props.updateAnecdote(anecdote)
    props.setNotification(`you voted for '${anecdote.content}'`)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  updateAnecdote,
  setNotification,
}

const connectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdoteList
