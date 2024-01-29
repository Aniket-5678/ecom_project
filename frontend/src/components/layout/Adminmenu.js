import React from 'react'
import {Link} from "react-router-dom"
import "./Adminmenu.css"


const Adminmenu = () => {


  return (
    <div className='adminmenu-container'>
        
    <div className='menu-link'>
        <h1>Admin pannel</h1>
        <Link to='/dashboard/admin/create-category' className='nav-menu'><p>create category</p></Link>
        <Link to='/dashboard/admin/create-product' className='nav-menu'><p>create product</p></Link>
        <Link to='/dashboard/admin/products' className='nav-menu'><p> products</p></Link>
        <Link to='/dashboard/admin/orders' className='nav-menu'><p> orders</p></Link>
        <Link to='/dashboard/admin/create-users' className='nav-menu'><p>users</p></Link>
    </div>
 
    </div>
  )
}

export default Adminmenu