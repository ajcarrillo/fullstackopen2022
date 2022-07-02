import { createSlice } from "@reduxjs/toolkit"

let timerId = null
const initialState = {
  message: null,
  type: "",
}
export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    clearNotification: (state) => {
      return initialState
    },
  },
})

export const showNotification = (message, type, timeout = 3000) => {
  return async (dispatch) => {
    if (timerId) {
      clearTimeout(timerId)
    }
    dispatch(notificationsSlice.actions.setMessage({ message, type }))
    timerId = setTimeout(() => {
      dispatch(notificationsSlice.actions.clearNotification())
    }, timeout)
  }
}

export const hideNotification = () => {
  return notificationsSlice.actions.clearNotification()
}

export const { setMessage, clearNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
