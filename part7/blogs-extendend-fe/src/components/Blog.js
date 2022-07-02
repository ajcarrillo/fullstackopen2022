import "../assets/css/blogs.css"
import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "block" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blog">
      <span>
        {blog.title} {blog.author}
      </span>{" "}
      <button id="btn-show-details" onClick={toggleVisibility}>
        view
      </button>
      <div className="togglableBlogDetails" style={hideWhenVisible}>
        {children}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
