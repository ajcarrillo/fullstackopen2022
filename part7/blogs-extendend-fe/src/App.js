import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import { useSelector } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import BlogList from "./pages/BlogList"
import CreateBlog from "./pages/CreateBlog"
import Navigation from "./components/Navigation"
import UserList from "./pages/UserList"
import ViewUser from "./pages/ViewUser"
import ViewBlog from "./pages/ViewBlog"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkIfLoggedIn } from "./features/users/usersSlice"

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  const currentUser = user.user || null

  useEffect(() => {
    dispatch(checkIfLoggedIn())
  }, [dispatch])

  return (
    <div>
      <Navigation />
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <Routes>
        <Route path="/" element={<Navigate replace to="/blogs" />}></Route>
        <Route
          path="/login"
          element={
            currentUser.token ? <Navigate to="/blogs" replace /> : <LoginForm />
          }
        ></Route>
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
        <Route path="/blogs/:id" element={<ViewBlog />}></Route>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<ViewUser />} />
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
