import anecdotesService from "../services/anecdotes"

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
    case "UPDATE_ANECDOTE":
      const updatedAnecdote = action.data
      return state
        .map((anecdote) => {
          return anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        })
        .sort((a, b) => b.votes - a.votes)
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
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.create(anecdote)
    dispatch({
      type: "CREATE",
      data: newAnecdote,
    })
  }
}

export const setAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: "SET_ANECDOTES",
      data: anecdotes,
    })
  }
}

export const updateAnecdote = (anecdote) => {
  anecdote.votes = anecdote.votes + 1
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.update(anecdote.id, anecdote)
    dispatch({
      type: "UPDATE_ANECDOTE",
      data: updatedAnecdote,
    })
  }
}

export default reducer
