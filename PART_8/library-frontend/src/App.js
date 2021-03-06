import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import {useApolloClient} from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)


  const client = useApolloClient()

  useEffect(() => {
     const token = localStorage.getItem('phonenumbers-user-token')
      if (token) 
        setToken(token)
  }, []) 



  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }
 const handleLogin = (token) => {
   setToken(token)
   setPage('authors')
 }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
      {token ? <button onClick={() => setPage('add')}>add book</button> : null}
      {!token ? <button onClick={() => setPage('login')}>Login</button> : null}
      {token ? <button onClick={() => setPage('recommended')}>recommended</button> : null}
      {token ? <button onClick={() => logout()}>Logout</button> : null}
      </div>

      <Authors show={page === 'authors'} token={token}/>
      <Books show={page === 'books'}/>
      <NewBook show={page === 'add'} />
      <Login show={page === 'login'} handleLogin={handleLogin}/>
      <Recommended  show={page === 'recommended'}/>

    </div>
  )
}

export default App