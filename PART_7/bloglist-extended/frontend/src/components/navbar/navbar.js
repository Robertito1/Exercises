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
        <div className='d-flex w-100 bg-secondary justify-content-around text-white pb-4 mb-4'>
        <span>
            <Link to='/' className='text-white'>
                Blogs
            </Link>
        </span>
        <span>
            <Link to='/users' className='text-white'>
                Users
            </Link>
        </span>
            {name} logged-in
            <span>
              <button onClick={handleLogout} className='btn btn-primary text-white'>logout</button>
            </span> 
        </div>
     );
}
 
export default Navbar;