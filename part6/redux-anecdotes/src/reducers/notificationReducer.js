const initialState = {
  notification: null,
}

let actualTimerId = null

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

export const setNotification = (message, timeout = 3000) => {
  return async (dispatch) => {
    if (actualTimerId) {
      clearTimeout(actualTimerId)
    }
    dispatch({
      type: "SET_NOTIFICATION",
      data: { message },
    })
    actualTimerId = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      })
    }, timeout)
  }
}

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  }
}

export default reducer
