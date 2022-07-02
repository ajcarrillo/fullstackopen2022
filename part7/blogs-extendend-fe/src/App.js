import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import UserInfo from "./components/UserInfo"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogDetail from "./components/BlogDetail"
import blogService from "./services/blogs"
import loginServices from "./services/login"
import { useSelector, useDispatch } from "react-redux"
import { showNotification } from "./features/notifications/notificationsSlice"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    async function fetchBlog() {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }
    fetchBlog()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServices.login({ username, password })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log(exception)
      dispatch(showNotification("wrong username or password", "error"))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogappUser")
  }

  const handleCreateBlog = async (newBlog) => {
    const blog = await blogService.create(newBlog)
    setBlogs(blogs.concat(blog))
    blogFormRef.current.toggleVisibility()
    dispatch(
      showNotification(
        `a new blog ${blog.title} by ${blog.author} added`,
        "success"
      )
    )
  }

  const handleLike = (id) => async () => {
    const blog = await blogService.likeBlog(id)
    setBlogs(blogs.map((b) => (b.id !== id ? b : blog)))
  }

  const handleDelete = (blog) => async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
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
      <h1>Blogs</h1>
      {user === null && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onSubmit={handleLogin}
        />
      )}
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {user !== null && (
        <div>
          <UserInfo user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel={"Creates new blog"} ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog}>
              <BlogDetail
                blog={blog}
                like={handleLike}
                deleteBlog={handleDelete}
              />
            </Blog>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
