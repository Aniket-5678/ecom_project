import React from 'react'
import Layout from "../../components/layout/Layout"
import {Link} from "react-router-dom"
import "./Admindashboard.css"
import { useAuth } from '../../context/auth'


const Admindashboard = () => {

  const [auth] = useAuth()
  return (
    <Layout>
          <div className='adminmenu-container'>
        
        <div className='menu-link'>
            <h1>Admin pannel</h1>
            <Link to='/dashboard/admin/create-category' className='nav-menu'><p>create category</p></Link>
            <Link to='/dashboard/admin/create-product' className='nav-menu'><p>create product</p></Link>
            <Link to='/dashboard/admin/create-users' className='nav-menu'><p>users</p></Link>
        </div>
          <div className='admin-user-details'>
            <h3> Admin Name: {auth?.user?.name}</h3>
            <h3> Admin Email: {auth?.user?.email}</h3>
            <h3> Admin contact:{auth?.user?.phone}</h3>
          </div>
        </div>  
    </Layout>
  )
}

export default Admindashboard