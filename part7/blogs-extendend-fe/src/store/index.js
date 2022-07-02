import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "../features/notifications/notificationsSlice"
import blogReducer from "../features/blogs/blogsSlice"
import userReducer from "../features/users/usersSlice"

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
  },
})
