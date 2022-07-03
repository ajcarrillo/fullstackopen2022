import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { votedBlog, removeBlog } from "../features/blogs/blogsSlice"
import { showNotification } from "../features/notifications/notificationsSlice"
import { Button } from "react-bootstrap"
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

  return (
    <div>
      <p>{blog.url}</p>
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
    </div>
  )
}

BlogDetail.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogDetail
