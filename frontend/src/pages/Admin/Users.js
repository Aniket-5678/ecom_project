import React from 'react'
import Layout from '../../components/layout/Layout'
import Adminmenu from '../../components/layout/Adminmenu'
import "./Alladmin.css"

const Users = () => {
  return (
    <Layout>
    <div className='Admin-Routes-container'>
    <div>
   <Adminmenu/>
    </div>
    <div>
        <h2> All Users</h2>
    </div>
    </div>
   
   
    
</Layout>
  )
}

export default Users