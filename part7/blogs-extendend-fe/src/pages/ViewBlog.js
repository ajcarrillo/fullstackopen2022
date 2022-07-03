import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Container, Row, Col } from "react-bootstrap"
import BlogDetail from "../components/BlogDetail"

const ViewBlog = () => {
  const params = useParams()
  const blog = useSelector((state) =>
    state.blog.find((b) => b.id === params.id)
  )

  if (!blog) {
    return null
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>{blog.title}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <BlogDetail blog={blog} />
        </Col>
      </Row>
    </Container>
  )
}

export default ViewBlog
