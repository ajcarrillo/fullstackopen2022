import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllUsers } from "../features/users/usersSlice"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const UserList = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2>Users</h2>
          </Col>
        </Row>
        {users.map((user) => (
          <Row key={user.id}>
            <Col>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </Col>
            <Col>{user.blogs.length} blogs created</Col>
          </Row>
        ))}
      </Container>
    </div>
  )
}

export default UserList
