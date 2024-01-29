import React from 'react'
import {Link} from "react-router-dom"

const UserMenu = () => {
  return (
    <div>
           <div className='usermenu-container'>
        
        <div className='menu-link'>
            <h1>dashboard</h1>
            <Link to='/dashboard/user/profile' className='navuser-menu'><p>profile</p></Link>
            <Link to='/dashboard/user/orders' className='navuser-menu'><p>orders</p></Link>
        </div>
     
        </div>
    </div>
  )
}

export default UserMenu