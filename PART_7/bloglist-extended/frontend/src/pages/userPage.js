import React , {useEffect} from 'react'
import { useRouteMatch } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getAllUsers} from '../reducers/allUsersReducer'


const UserPage = () => {

  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const match = useRouteMatch('/users/:id')


  const userById = (id) =>
  users.find(a => a.id === id)

  useEffect(()=>{
  dispatch(getAllUsers())
  }, [dispatch])

  const user = match 
    ? userById(match.params.id)
    : null
     if (!user) {
    return null
  }
    return ( 
             <div>
                <h1>{user.name}</h1> 
                <h2>Added blogs</h2>
                <ul>{user.blogs.map(e => <li key={e.title}>{e.title}</li>)}</ul>
             </div>
           );
}
 
export default UserPage;