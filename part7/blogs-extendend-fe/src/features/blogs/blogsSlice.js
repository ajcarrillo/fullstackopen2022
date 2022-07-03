import { createSlice } from "@reduxjs/toolkit"
import blogServices from "../../services/blogs"

export const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    initializeBlogs: (state, action) => action.payload,
    addBlog: (state, action) => [...state, action.payload],
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      return state
        .map((blog) => {
          return blog.id === updatedBlog.id ? updatedBlog : blog
        })
        .sort((a, b) => b.likes - a.likes)
    },
    likedBlog: (state, action) => {
      const likedBlog = action.payload
      return state
        .map((blog) => {
          return blog.id === likedBlog.id ? likedBlog : blog
        })
        .sort((a, b) => b.likes - a.likes)
    },
    remove: (state, action) =>
      state.filter((blog) => blog.id !== action.payload),
    commentedBlog: (state, action) => {
      const commentedBlog = action.payload
      return state
        .map((blog) => {
          return blog.id === commentedBlog.id ? commentedBlog : blog
        })
        .sort((a, b) => b.likes - a.likes)
    },
  },
})

export const fetchBlogs = () => async (dispatch) => {
  const blogs = await blogServices.getAll()
  dispatch(initializeBlogs(blogs))
}

export const createBlog = (newBlog) => async (dispatch) => {
  const blog = await blogServices.create(newBlog)
  dispatch(addBlog(blog))
}

export const votedBlog = (id) => async (dispatch) => {
  const updatedBlog = await blogServices.likeBlog(id)
  dispatch(likedBlog(updatedBlog))
}

export const removeBlog = (id) => async (dispatch) => {
  await blogServices.deleteBlog(id)
  dispatch(remove(id))
}

export const createComment = (id, comment) => async (dispatch) => {
  const updatedBlog = await blogServices.commentBlog(id, comment)
  dispatch(commentedBlog(updatedBlog))
}

export const {
  initializeBlogs,
  addBlog,
  updateBlog,
  remove,
  likedBlog,
  commentedBlog,
} = blogsSlice.actions
export default blogsSlice.reducer
