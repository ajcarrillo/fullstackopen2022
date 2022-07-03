import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import {
  votedBlog,
  removeBlog,
  createComment,
} from "../features/blogs/blogsSlice"
import { showNotification } from "../features/notifications/notificationsSlice"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLike = (id) => async () => {
    dispatch(votedBlog(id))
  }

  const handleDelete = (blog) => async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog.id))
        navigate("/blogs")
      } catch (error) {
        if (error.response.status === 401) {
          dispatch(
            showNotification(
              "You are not authorized to delete this blog",
              "error"
            )
          )
        }
      }
    }
  }

  const handleCreateComment = (id) => async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    try {
      dispatch(createComment(id, comment))
      event.target.comment.value = ""
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(
          showNotification("You are not authorized to create comments", "error")
        )
      }
    }
  }

  return (
    <div>
      <p>
        <a href={blog.url} target="blank">
          {blog.url}
        </a>
      </p>
      <p>
        <span>{blog.likes}</span>{" "}
        <Button variant="primary" id="btn-like" onClick={handleLike(blog.id)}>
          like
        </Button>
      </p>
      <p>{blog.user.name}</p>
      <Button variant="danger" id="delete-button" onClick={handleDelete(blog)}>
        remove
      </Button>
      <h5 className="mt-4">Comments</h5>
      <Form onSubmit={handleCreateComment(blog.id)}>
        <Form.Group>
          <Form.Control as="textarea" rows="3" name="comment" />
          <Button variant="primary" className="mt-2" type="submit">
            Add comment
          </Button>
        </Form.Group>
      </Form>
      <ul className="mt-4">
        {blog.comments.map((comment, index) => (
          <li key={`${index}-${blog.id}`}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

BlogDetail.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogDetail
