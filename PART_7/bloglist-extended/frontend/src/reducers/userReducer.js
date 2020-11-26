import blogsService from '../services/blogs'
import loginService from '../services/login'


const userReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_USER': 
        return action.data
      case 'REMOVE_USER':
          return null
        case 'INIT_USER':
        return action.data
      default: return state
    }
  }

  export const setUser = (loginDetails) =>{
    return async dispatch => {
       const user = await loginService.login(loginDetails)
        await blogsService.setToken(user.token)
         window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
       dispatch({
           type: 'SET_USER',
           data: user
       })
    }
}

export const removeUser = () =>{
    return async dispatch => {
    await window.localStorage.removeItem('loggedBlogappUser')
      dispatch({
          type:'REMOVE_USER',
          data: null
      })
    }
}
 export const initializeUser = () =>{
    return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
     await blogsService.setToken(user.token)
        dispatch({type: 'INIT_USER',
        data: user,
        })
      }
    }
 }


  export default userReducer