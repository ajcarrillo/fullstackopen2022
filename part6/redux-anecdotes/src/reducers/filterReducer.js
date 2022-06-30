const initialState = {
  term: "",
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        term: action.data.term,
      }
    default:
      return state
  }
}

export const setFilter = (term) => {
  return {
    type: "SET_FILTER",
    data: { term },
  }
}

export default reducer
