import React from 'react'
import './notification.css'

const Notification = ({ message, status }) => {
  return (
    <div className={status ? 'positive notification' : 'negative notification'}>
      {message}
    </div>
  )
}

export default Notification
