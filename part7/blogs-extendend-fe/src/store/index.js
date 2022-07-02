import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "../features/notifications/notificationsSlice"
import blogReducer from "../features/blogs/blogsSlice"

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
  },
})
