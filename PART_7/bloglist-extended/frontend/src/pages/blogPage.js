import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {notificationSet} from '../reducers/notificationReducer'
import {deleteBlog, likeBlog, initializeBlogs, dispatchComment} from '../reducers/blogsReducer'
import {useRouteMatch, useHistory} from 'react-router-dom'


const BlogPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const match = useRouteMatch('/blogs/:id')
  
    useEffect(()=>{
        dispatch(initializeBlogs())
    }, [dispatch])
  

    const addLike = async () => {
        try{
          await dispatch(likeBlog(blog))
          dispatch(notificationSet(`you liked ${blog.title} by ${blog.author}`, true))
       }catch (err){
          console.log(err)
       } 
      }

      const addComment = async (e) =>{
        try{ 
         e.preventDefault()
         let comment ={
           content: e.target.comment.value
         }
         e.target.comment.value = ''
        await dispatch(dispatchComment(blog.id, comment))

        }catch(err){
          console.log(err)
        }
      }

      const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}? `)) {
          try{
             await dispatch(deleteBlog(blog.id))
             await history.push('/')
            dispatch(notificationSet(`${blog.title} by ${blog.author} was deleted`, true))
            
          }catch (err){
             console.log(err)
          }  
        }
      }

    const blogById = (id) =>
    blogs.find(a => a.id === id)
    const blog = match 
      ? blogById(match.params.id)
      : null

       if (!blog) {
      return null
    }
    return ( 
        <div>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <p>
                {blog.likes} likes 
                <span>
                 <button onClick={()=>addLike()}>like</button>
                </span>
            </p>
            <p>added by <b>{blog.author}</b></p>
            {user.name === blog.user.name ? 
            <button
              style={{
                backgroundColor: 'blue',
                border: 'none',
                borderRadius: '5px',
              }}
              onClick={() => handleDelete(blog)}
              id="delete" >delete</button>
           : null}
           <h3>Comments</h3>
              <form onSubmit={addComment} id="form">
                  <input name="comment"/>
                <button type="submit" id="save">
                  save
                </button>
              </form>
           <ul>
             {blog.comments.map(e => <li key={e.id}>{e.content}</li>)}
           </ul>
        </div>
     );
}
 
export default BlogPage;