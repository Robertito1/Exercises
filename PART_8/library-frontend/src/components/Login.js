import React, { useState, useEffect } from 'react'
import {useMutation} from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({show, setError , handleLogin}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
 

  const [ loginUser, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })
  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      handleLogin(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  // eslint-disable-next-line
  }, [result.data]) 

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
   await loginUser({  variables: {username, password} })
   setUsername('')
   setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default Login