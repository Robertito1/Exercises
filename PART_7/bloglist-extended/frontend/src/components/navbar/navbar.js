import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { notificationSet} from '../../reducers/notificationReducer'
import { removeUser} from '../../reducers/userReducer'


const Navbar = ({name}) => {

    const dispatch = useDispatch()
    const handleLogout = async () => {   
        dispatch(removeUser())
        dispatch(notificationSet(`${name} Logged out`, true))
      }

    return ( 
        <div>
        <span>
            <Link to='/'>
                blogs
            </Link>
        </span>
        <span>
            <Link to='/users'>
                users
            </Link>
        </span>
            {name} logged-in
            <span>
              <button onClick={handleLogout}>logout</button>
            </span> 
        </div>
     );
}
 
export default Navbar;