import { useDispatch } from "react-redux"
import { createBlog } from "../features/blogs/blogsSlice"
import { showNotification } from "../features/notifications/notificationsSlice"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const BlogForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }
    dispatch(createBlog(newBlog))
    dispatch(
      showNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "success"
      )
    )
    navigate("/blogs")
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Container>
        <Row>
          <Col>
            <h2>Create New Blog</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={addBlog}>
              <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control id="title" type="text" name="title" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Author:</Form.Label>
                <Form.Control id="author" type="text" name="author" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Url:</Form.Label>
                <Form.Control id="url" type="text" name="url" />
              </Form.Group>
              <Button
                variant="primary"
                id="create-button"
                style={{ marginTop: "1rem" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BlogForm
