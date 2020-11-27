import React, { useEffect} from 'react'
import Notification from './components/notification/Notification'
import Login from './components/Login'
import Navbar from './components/navbar/navbar'
import { useDispatch, useSelector } from 'react-redux'
import { notificationSet} from './reducers/notificationReducer'
import {initializeUser, setUser} from './reducers/userReducer'
import BlogList from './components/Bloglist'
import {Switch , Route} from 'react-router-dom'
import UsersPage from './pages/users'
import UserPage from './pages/userPage'
import BlogPage from './pages/blogPage'


const App = () => {
 
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = async (username, password) => {
    try {
     await dispatch(setUser({username, password}))
     await dispatch(notificationSet(` Logged in`, true))
    } catch (exception) {
      dispatch(notificationSet('Wrong Username or password', false))
    }
  }

  const loginForm = () => {
    return <Login handleLogin={handleLogin} />
  }

  return (
    <div>
      <h2>blogs</h2>
        <Notification />
     {user?
     <div>
     <Navbar name={user.name}/>
      <Switch>
        <Route exact path="/" render={() => <BlogList/>} />
        <Route exact path="/users" render={() => <UsersPage/>} />
        <Route path= '/users/:id' render={()=> <UserPage />} />
        <Route path='/blogs/:id' render={()=> <BlogPage />} />
      </Switch>
     </div>
      : loginForm()}
    </div>
  )
}

export default App
