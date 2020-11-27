import React, { useEffect, useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'
import { useDispatch, useSelector } from 'react-redux'
import { notificationSet} from '../reducers/notificationReducer'
import {initializeBlogs, createBlog} from '../reducers/blogsReducer'


const BlogList = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const blogs = useSelector(state => state.blogs)   
    .sort((a, b) => a.likes - b.likes)
    .reverse()

    useEffect(() => {
        dispatch(initializeBlogs())
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

    
      const blogFormRef = useRef()
    
      const blogForm = () => {
        return (
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggleable>
        )
      }
    return ( 
        <div id="blogs">
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
     );
}
 
export default BlogList;