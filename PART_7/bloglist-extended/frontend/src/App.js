import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import Login from './components/Login'
import { useDispatch } from 'react-redux'
import { notificationSet} from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
 
  const dispatch = useDispatch()


  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => blogs.sort((a, b) => a.likes - b.likes))
      .then((blogs) => blogs.reverse())
      .then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
       dispatch(notificationSet(`A new Blog ${blogObject.title} by ${blogObject.author} added`, true))
    })
  }

  const handleDeleteOf = (blog) => {
    const idOfDeletedBlog = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}? `)) {
      blogService.discard(idOfDeletedBlog).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== idOfDeletedBlog))
        dispatch(notificationSet(`${blog.title} by ${blog.author} was deleted`, true))
      })
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      dispatch(notificationSet(`${user.name} Logged in`, true))
    } catch (exception) {
      dispatch(notificationSet('Wrong Username or password', false))
    }

  }

  const handleLogout = async () => {
    await window.localStorage.removeItem('loggedBlogappUser')
    await setUser(null)
    dispatch(notificationSet(`${user.name} Logged out`, true))
  }

  const loginForm = () => {
    return <Login handleLogin={handleLogin} />
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
        <Notification />
      {user ? (
        <div id="blogs">
          <p>
            {user.name} logged-in
            <span>
              <button onClick={handleLogout}>logout</button>
            </span>
          </p>
          {blogForm()}
          <ul id="blogList">
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleDelete={handleDeleteOf}
                user={user}
              />
            ))}
          </ul>
        </div>
      ) : (
        loginForm()
      )}
    </div>
  )
}

export default App
