import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {notificationSet} from '../reducers/notificationReducer'
import {deleteBlog, likeBlog} from '../reducers/blogsReducer'


const Blog = ({ blog, user }) => {
  // const [expand, setExpand] = useState(false)

  const dispatch = useDispatch()

  let action = expand ? 'collapse' : 'expand'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const addLike = async () => {
    try{
      await dispatch(likeBlog(blog))
      dispatch(notificationSet(`you liked ${blog.title} by ${blog.author}`, true))
   }catch (err){
      console.log(err)
   } 
  }

  
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}? `)) {
      try{
         await dispatch(deleteBlog(blog.id))
        dispatch(notificationSet(`${blog.title} by ${blog.author} was deleted`, true))
      }catch (err){
         console.log(err)
      }  
    }
  }

  return (
    <li style={blogStyle} className="blog">
      {expand ? (
        <div>
          <p>
            {blog.title} {blog.author}
            <span>
              <button onClick={() => setExpand(!expand)}>{action}</button>
            </span>
          </p>
          <p>{blog.url}</p>
          <p id="likes">
            {blog.likes}
          </p><span>
            <button onClick={() => addLike()} id="like">
                like
            </button>
          </span>
          <p>{blog.user.name}</p>
          {user.name === blog.user.name ? (
            <button
              style={{
                backgroundColor: 'blue',
                border: 'none',
                borderRadius: '5px',
              }}
              onClick={() => handleDelete(blog)}
              id="delete"
            >
              delete
            </button>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <span>
            <button id="expand" onClick={() => setExpand(!expand)}>
              {action}
            </button>
          </span>
        </div>
      )}
    </li>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
