import usersService from '../services/users'

const allUsersReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_ALL_USERS': 
    return action.data
      default: return state
    }
  }

export const getAllUsers = () =>{
    return async dispatch => {
    const res = await usersService.getAll()
      dispatch({
          type:'GET_ALL_USERS',
          data: res
      })
    }
}




export default allUsersReducer