const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
]

const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const voted = state.find((anecdote) => anecdote.id === action.data.id)
      voted.votes = voted.votes + 1
      return state
        .map((anecdote) => {
          return anecdote.id === voted.id ? voted : anecdote
        })
        .sort((a, b) => b.votes - a.votes)
    case "CREATE":
      const anecdotes = [...state, action.data]
      return anecdotes.sort((a, b) => b.votes - a.votes)
    case "SET_ANECDOTES":
      return action.data.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

export const vote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  }
}

export const createNewAnecdote = (anecdote) => {
  return {
    type: "CREATE",
    data: anecdote,
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: "SET_ANECDOTES",
    data: anecdotes,
  }
}

export default reducer
