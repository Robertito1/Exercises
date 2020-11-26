import React from 'react'
import { useSelector} from 'react-redux'
import './notification.css'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const showNotification = () =>{
    if (notification){
      return <div className={notification.status ? 'positive notification' : 'negative notification'}>
               {notification.message}
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
