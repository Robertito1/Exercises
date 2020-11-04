import React from 'react'
import { useSelector} from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const showNotification = () =>{
    if (notification){
      return <div style={style}>
               {notification}
           </div>
    }else{
      return null
    }
  }
 
  return (
    showNotification()
  )
}

export default Notification