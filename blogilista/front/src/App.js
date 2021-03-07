import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Toggable from './components/Togglable'
import BlogForm from './components/BlogForm'

import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'

import loginServices from './services/login'
import blogService from './services/blogs' 

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type}>
      {message.txt}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsPart5User')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginServices.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogsPart5User', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage({ type: 'error', txt: 'wrong username or password' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogsPart5User')
    setUser(null)
  }

  const blogFormRef = useRef()
  const addBlog = async ( blogObject ) => {
    try {
      blogFormRef.current.toggleVisibility()

      dispatch(createBlog(blogObject))

      setErrorMessage({ type: 'success', txt: `a new blog ${blogObject.title} by ${blogObject.author} added` })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch(error) {
      setErrorMessage({ type: 'error', txt: 'missing title, author or url' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => {
    return (
      <Toggable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggable>
    )
  }

  const handleBlogLike = ( blog ) => {
    return () => dispatch(likeBlog(blog))
  }

  const handleRemoveBlog = ( blog ) => {
    return async () => {
      try {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
          dispatch(deleteBlog(blog))
        }
      } catch(error){
        console.log(error.message)
      }
    }
  }

  if (user === null) 
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage}/>
        <form id='loginForm' onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              id='username'
              value={username}
              name='Username'
              onChange={(event) => setUsername(event.target.value)}
            />
          </div><div>
            password
            <input
              type='password'
              id='password'
              value={password}
              name='Password'
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button id='login-button' type='submit'>login</button>
        </form>
      </div>
    )


  const sorted_blogs = blogs.sort((a,b) => {
    if(a.likes > b.likes) {
      return -1
    }
    else if(a.likes < b.likes) {
      return 1
    }
    return 0
  })

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}/>
      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>

      {blogForm()}

      <div className="content-blogs">
        {sorted_blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleLike={handleBlogLike} handleRemoveBlog={handleRemoveBlog}/>
        )}
      </div>
    </div>
  )
}

export default App