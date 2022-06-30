const initialState = {
  notification: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: action.data.message,
      }
    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        notification: null,
      }
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: "SET_NOTIFICATION",
    data: { message },
  }
}

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  }
}

export default reducer
