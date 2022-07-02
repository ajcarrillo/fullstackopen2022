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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({
    message: "",
    type: "",
    show: false,
  })

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
      setNotificationMessage({
        message: "Wrong username or password",
        type: "error",
        show: true,
      })
      setTimeout(() => {
        setNotificationMessage({
          message: "",
          type: "",
          show: false,
        })
      }, 5000)
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
    setNotificationMessage({
      message: `a new blog ${blog.title} by ${blog.author} added`,
      type: "success",
      show: true,
    })
    setTimeout(() => {
      setNotificationMessage({
        message: "",
        type: "",
        show: false,
      })
    }, 5000)
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
          setNotificationMessage({
            message: "You are not authorized to delete this blog",
            type: "error",
            show: true,
          })
          setTimeout(() => {
            setNotificationMessage({
              message: "",
              type: "",
              show: false,
            })
          }, 5000)
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
      {notificationMessage.show && (
        <Notification
          message={notificationMessage.message}
          type={notificationMessage.type}
        />
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
