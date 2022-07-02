import { createSlice } from "@reduxjs/toolkit"
import blogService from "../../services/blogs"
import loginService from "../../services/login"
import { showNotification } from "../notifications/notificationsSlice"

const initialState = {
  users: [],
  user: { name: "", username: "", token: null },
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload }
    },
    clearLoggedUser: (state) => {
      return { ...state, user: { name: "", username: "", token: null } }
    },
  },
})

export const loggedUser = (user) => (dispatch) => {
  dispatch(setUser(user))
  blogService.setToken(user.token)
}

export const removeLoggedUser = () => (dispatch) => {
  window.localStorage.removeItem("loggedBlogappUser")
  dispatch(clearLoggedUser())
}

export const login = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.login(credentials)
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
    dispatch(loggedUser(user))
  } catch (exception) {
    dispatch(showNotification("wrong username or password", "error"))
  }
}

export const { setUser, clearLoggedUser } = userSlice.actions
export default userSlice.reducer
