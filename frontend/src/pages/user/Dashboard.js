import React from 'react'
import Layout from '../../components/layout/Layout'
import {Link} from "react-router-dom"
import { useAuth } from '../../context/auth'
import "./Alluserdashboard.css"

const Dashboard = () => {
    const [auth] = useAuth()
  return (
    <Layout>
        <div className='usermenu-container'>
        
        <div className='usermenu-link'>
            <h1>user pannel</h1>
            <Link to='/dashboard/user/profile' className='nav-menu'><p>profile</p></Link>
            <Link to='/dashboard/user/orders' className='nav-menu'><p>orders</p></Link>
    
        </div>
          <div className='user-details'>
            <h3> user Name: {auth?.user?.name}</h3>
            <h3> user Email: {auth?.user?.email}</h3>
            <h3> usercontact:{auth?.user?.phone}</h3>
          </div>
        </div>  
        
        </Layout>
  )
}

export default Dashboard