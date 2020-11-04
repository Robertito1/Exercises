
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

export const notificationSet = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data:  notification,
  }
}

export const notificationClear = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}
export default notificationReducer