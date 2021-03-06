import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const likeBlog = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}/likes`)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const commentBlog = async (id, comment) => {
  const response = await axios.put(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

const blogServices = {
  getAll,
  setToken,
  create,
  likeBlog,
  deleteBlog,
  commentBlog,
}

export default blogServices
