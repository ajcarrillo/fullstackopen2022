import { useSelector, useDispatch } from "react-redux"
import { fetchBlogs } from "../features/blogs/blogsSlice"
import { useEffect } from "react"
import Blog from "../components/Blog"
import BlogDetail from "../components/BlogDetail"
import { Container, Row, Col } from "react-bootstrap"

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2>Blogs</h2>
          </Col>
        </Row>
        {blogs.map((blog) => (
          <Row key={blog.id}>
            <Col>
              <Blog blog={blog}>
                <BlogDetail blog={blog} />
              </Blog>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  )
}

export default BlogList
