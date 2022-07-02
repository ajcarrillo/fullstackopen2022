import { useDispatch } from "react-redux"
import { createBlog } from "../features/blogs/blogsSlice"
import { showNotification } from "../features/notifications/notificationsSlice"
import PropTypes from "prop-types"

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()

  const addBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }
    dispatch(createBlog(newBlog))
    resetForm(e)
    blogFormRef.current.toggleVisibility()
    dispatch(
      showNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "success"
      )
    )
  }

  const resetForm = (e) => {
    e.target.title.value = ""
    e.target.author.value = ""
    e.target.url.value = ""
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>Title:</label>
          <input id="title" type="text" name="title" />
        </div>
        <div>
          <label>Author:</label>
          <input id="author" type="text" name="author" />
        </div>
        <div>
          <label>Url:</label>
          <input id="url" type="text" name="url" />
        </div>
        <button id="create-button" style={{ marginTop: "1rem" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
}

export default BlogForm
