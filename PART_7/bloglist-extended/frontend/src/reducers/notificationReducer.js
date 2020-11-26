const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return state = action.data
        case 'CLEAR_NOTIFICATION':
         return state = ''
      default:
        return state
    }
  }

  let clear             
export const notificationSet = (message, status) => {
  return async dispatch => {
    if(clear){
      clearTimeout(clear)
      console.log('clearing')
    }
    await dispatch({type: 'SET_NOTIFICATION',
    data: {message, status}
})
    clear = await setTimeout(() =>{  
      dispatch({
        type: 'CLEAR_NOTIFICATION',
           })
     }, 5000 )
       
       }
      }

export default notificationReducer