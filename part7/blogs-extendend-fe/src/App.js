import { useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import UserInfo from "./components/UserInfo"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogDetail from "./components/BlogDetail"
import { useSelector, useDispatch } from "react-redux"
import { fetchBlogs } from "./features/blogs/blogsSlice"

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blog)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [])

  return (
    <div>
      <h1>Blogs</h1>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {user.user.token === null && <LoginForm />}
      {user.user.token !== null && (
        <div>
          <UserInfo />
          <Togglable buttonLabel={"Creates new blog"} ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog}>
              <BlogDetail blog={blog} />
            </Blog>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
