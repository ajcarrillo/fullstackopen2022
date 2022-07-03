import "../assets/css/blogs.css"
import { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "block" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
