import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { loggedUser, login } from "../features/users/usersSlice"
import { Container, Row, Col, Form, Button } from "react-bootstrap"

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loggedUser(user))
    }
  }, [dispatch])

  const onSubmit = async (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername("")
    setPassword("")
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2>Login</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  id="username"
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                id="login-button"
                type="submit"
                className="mt-4"
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginForm
