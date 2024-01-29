import React, { useState, useEffect } from 'react'
import Adminmenu from "../../components/layout/Adminmenu"
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import moment from "moment"
import axios from 'axios'
import { Select } from 'antd'
const {Option} = Select


const AdminOrders = () => {
    const [status, setStatus] = useState(["Not process", "processing", "shipped", "deliverd", "cancel"])
    const [changestatus, setChangestatus] = useState("")

    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth()
  
    const getOrders = async() => {
  
      try {
        const {data} = await axios.get('/api/v1/auth/all-orders')
        setOrders(data)
      } catch (error) {
        console.log(error);
      }
    }
  
   useEffect(()=> {
    if(auth?.token) getOrders()
   }, [auth?.token])
  

 const handleChange = async(orderID, value) => {
   
try {
     const {data} = await axios.put(`/api/v1/auth/order-status/${orderID}`, {status: value})
   getOrders()

} catch (error) {
    console.log(error);
}

 }

  return (
    <Layout>
  <div>
        <div>
            <Adminmenu />
        </div>
        <div>
            <h1>All orders</h1>
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
          <td>
            <Select bordered={false} onChange={(value)=> handleChange(o._id, value)} defaultValue={o?.status}>
           {status.map((s,i) => (
            <Option key={i} value={s}  >{s}</Option>
           ))}
            </Select>
          </td>
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

export default AdminOrders