import React from 'react'
import { useDispatch } from 'react-redux'
import { notificationSet} from '../reducers/notificationReducer'
import { setUser} from '../reducers/userReducer'

const Login = () => {
 
  const dispatch = useDispatch()

  const handleLogin = async (e ) => {
    e.preventDefault()
    console.log('called')

    try {
     await dispatch(setUser({username:e.target.username.value, password: e.target.password.value}))
     await dispatch(notificationSet(` Logged in`, true))
    } catch (exception) {
      dispatch(notificationSet('Wrong Username or password', false))
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input name="username"/>
      </div>
      <div>
        password
        <input name="password" />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  )
}

export default Login
