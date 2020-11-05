
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

export const notificationSet = (notification, duration) => {
  return async dispatch => {
       await dispatch({type: 'SET_NOTIFICATION',
                  data: notification
                })  
      await setTimeout(() =>dispatch({
      type: 'CLEAR_NOTIFICATION',
         }), duration * 1000 ) 
       }
      }


export default notificationReducer