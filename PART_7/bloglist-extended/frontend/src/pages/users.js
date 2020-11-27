import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getAllUsers} from '../reducers/allUsersReducer'
import User from '../components/user'

const UsersPage = () => {

   const dispatch = useDispatch()
   const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getAllUsers())
      }, [dispatch])

      const renderUser = () =>{
          if (!users){
            return null
          }else{
            return <div>
                    <h3>Users</h3>
                      <table>
                         <thead>
                             <tr>
                                 <th></th>
                                 <th><h5>blogs created</h5></th>
                             </tr>
                         </thead>
                         <tbody>
                             {users.map((user) => ( 
                                 <User key={user.id} user={user} />))}
                         </tbody>
                      </table>
                   </div>
          }
      }
      return (
          renderUser()
      )
  ;
}
 
export default UsersPage;