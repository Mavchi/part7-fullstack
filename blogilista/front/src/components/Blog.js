import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  user,
  handleLike,
  handleRemoveBlog,
}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  if (visible)
    return (
      <div className='blogDiv' style={blogStyle}>
        {blog.title} <button onClick={toggleVisibility}>hide</button><br />
        {blog.url} <br />
        <span className='blog-likes'>{blog.likes}</span> <button className='blog-like-button' onClick={handleLike(blog)}>like</button> <br/>
        {blog.author} <br />
        {(blog.user.username===user.username && blog.user.name===user.name)
            && <button onClick={handleRemoveBlog(blog)}>remove</button>
        }
      </div>
    )

  return (
    <div className='blogDiv' style={blogStyle}>
      {blog.title} by {blog.author}<button className='blog-show-button' onClick={toggleVisibility}>show</button><br />
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
}

export default Blog
