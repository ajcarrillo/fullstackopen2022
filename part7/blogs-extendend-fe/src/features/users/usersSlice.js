import { createSlice } from "@reduxjs/toolkit"
import blogService from "../../services/blogs"
import loginService from "../../services/login"
import { showNotification } from "../notifications/notificationsSlice"
import usersServices from "../../services/users"

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
    initializeUsers: (state, action) => {
      return { ...state, users: action.payload }
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

export const fetchAllUsers = () => async (dispatch) => {
  const users = await usersServices.getAll()
  dispatch(initializeUsers(users))
}

export const checkIfLoggedIn = () => (dispatch) => {
  const loggedInUserJSON = window.localStorage.getItem("loggedBlogappUser")

  if (loggedInUserJSON) {
    const user = JSON.parse(loggedInUserJSON)
    dispatch(loggedUser(user))
  } else {
    dispatch(removeLoggedUser())
  }
}

export const { setUser, clearLoggedUser, initializeUsers } = userSlice.actions
export default userSlice.reducer
