import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/notification/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { notificationSet} from './reducers/notificationReducer'
import {initializeBlogs, createBlog} from './reducers/blogsReducer'
import {initializeUser, removeUser, setUser} from './reducers/userReducer'

const App = () => {
 
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)   
                  .sort((a, b) => a.likes - b.likes)
                  .reverse()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
 try{
    await dispatch(createBlog(blogObject))
        dispatch(notificationSet(`A new Blog ${blogObject.title} by ${blogObject.author} added`, true))
 }catch (err){
     dispatch(notificationSet('Sorry that blog could not be added, try inputing a correct format', false))
    }
  }


  const handleLogin = async (username, password) => {
    try {
     await dispatch(setUser({username, password}))
     await dispatch(notificationSet(` Logged in`, true))

    } catch (exception) {
      dispatch(notificationSet('Wrong Username or password', false))
    }

  }

  const handleLogout = async () => {   
    dispatch(removeUser())
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
