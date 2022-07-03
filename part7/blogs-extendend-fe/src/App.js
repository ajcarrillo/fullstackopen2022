import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import { useSelector } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import BlogList from "./pages/BlogList"
import CreateBlog from "./pages/CreateBlog"
import Navigation from "./components/Navigation"

const App = () => {
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  const currentUser = user.user || null

  return (
    <div>
      <Navigation />
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <Routes>
        <Route path="/" element={<Navigate replace to="/blogs" />}></Route>
        <Route path="/blogs" element={<BlogList />}></Route>
        <Route
          path="/blogs/create"
          element={
            currentUser.token ? (
              <CreateBlog />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        ></Route>
        <Route
          path="/login"
          element={
            currentUser.token ? <Navigate to="/blogs" replace /> : <LoginForm />
          }
        ></Route>
        {/* <UserInfo />
            <Togglable buttonLabel={"Creates new blog"} ref={blogFormRef}>
              <BlogForm blogFormRef={blogFormRef} />
            </Togglable>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog}>
                <BlogDetail blog={blog} />
              </Blog>
            ))} */}
      </Routes>
    </div>
  )
}

export default App
