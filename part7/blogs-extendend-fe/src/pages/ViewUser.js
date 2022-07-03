import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Container, Row, Col } from "react-bootstrap"

const ViewUser = () => {
  const params = useParams()
  const user = useSelector((state) =>
    state.user.users.find((u) => u.id === params.id)
  )

  if (!user) {
    return null
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>{user.name}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Added blogs</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default ViewUser
