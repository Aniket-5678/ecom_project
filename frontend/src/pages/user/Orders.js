import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
import moment from "moment"
import axios from 'axios'
import "./Order.css"

const Orders = () => {
 
  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth()

  const getOrders = async() => {

    try {
      const {data} = await axios.get('/api/v1/auth/orders')
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }

 useEffect(()=> {
  if(auth?.token) getOrders()
 }, [auth?.token])

  return (
    <Layout>
      <div className='order-container'>
      <div>
      <UserMenu/>
    </div>
     <div  className='order-status'>
    <h1 className='Allorders'>All Orders</h1>
      {
        orders?.map((o,i)=> {
          return (
            <div className='order-table'>
                 <table>
       <thead className='thead-order'>
        <tr>
          <th>#</th>
          <th>status</th>
          <th>Buyer</th>
          <th>date</th>
          <th>payment</th>
          <th>quantity</th>
        </tr>
      </thead>
      <tbody className='tbody-order'>
        <tr>
          <td>{i + 1}</td>
          <td>{o?.status}</td>
          <td>{o?.buyer?.name}</td>
          <td>{moment(o?.createdAt).fromNow()}</td>
          <td>{o?.payment.success ? "success" : "falied"}</td>
          <td>{o?.products.length}</td>
        </tr>
      </tbody>
     </table>
              
     <div  className='cart-items'>
            {o?.products?.map((p) => (
                <div key={p._id} className='product-cart'> 
                   <div className='image-cart'> 
                   <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} height={'100px'} className='product-home-image' />
                     </div> 
                     <div className='cart-details'>
                        <h3>{p.name}</h3>
                        <p>{p.description} </p>
                        <h3>${p.price}</h3>
                     </div>
                </div>
            ))}
        </div>
           </div>
          )
        })
      }
      
     </div>
      </div>
    
         
    </Layout>
  )
}

export default Orders