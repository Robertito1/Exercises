import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
    switch (action.type) {
      case 'LIKE': 
        const likedBlog = action.data
        return state.map(e => e.id !== likedBlog.id ? e : {...e, likes: likedBlog.likes + 1 } )
      case 'CREATE_NEW':
        return [...state, action.data]
      case 'DELETE_BLOG':
        return state.filter(e => e.id !== action.data)
      case 'NEW_COMMENT':
        return state.map(e => e.id !== action.data.id ? e : {...e, comments: [...e.comments, action.data.content]})
        case 'INIT_BLOGS':
        return action.data
      default: return state
    }
  }

  export const createBlog = (blog) => {
    return async dispatch => {
      const newBlog = await blogsService.create(blog)
        dispatch({ type: 'CREATE_NEW',
       data : newBlog,
      })
    }
  }
  
  export const likeBlog = (blog) =>{
    return async dispatch => {
      await blogsService.update({...blog, likes: blog.likes + 1}, blog.id)
      dispatch({
        type: 'LIKE',
        data: blog
      })
    }
  }

  export const deleteBlog = (id) => {
    return async dispatch => {
      await blogsService.discard(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
    }
  }

export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogsService.getAll()
      dispatch({type: 'INIT_BLOGS',
      data: blogs,
      })
    }
  }

 export const dispatchComment = (id, content) => {
  return async dispatch => {
    await blogsService.newComment(id, content)
    dispatch({type: 'NEW_COMMENT',
    data: {
      id,
      content:content
    }
    })
  }
 }

  export default blogsReducer