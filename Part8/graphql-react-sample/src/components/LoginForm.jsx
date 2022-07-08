import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries/loginQueries"

const LoginForm = ({ setNotification, setToken }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, { data, loading, error }] = useMutation(LOGIN, {
    onError: (error) => {
      if (typeof error.graphQLErrors[0] !== "undefined") {
        setNotification({
          message: error.graphQLErrors[0].message,
          type: "error",
        })
      } else {
        console.log("error", error)
        setNotification({
          message: "Something went wrong",
          type: "error",
        })
      }
    },
  })

  useEffect(() => {
    if (data) {
      const token = data.login.value
      setToken(token)
      localStorage.setItem("book-user-token", token)
    }
  }, [data])

  const submit = async (event) => {
    event.preventDefault()

    const variables = {
      username,
      password,
    }

    login({ variables })
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
