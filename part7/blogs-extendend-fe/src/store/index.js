import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "../features/notifications/notificationsSlice"

export default configureStore({
  reducer: {
    notification: notificationReducer,
  },
})
