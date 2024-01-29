import React,{useState, useEffect} from 'react'
import Adminmenu from '../../components/layout/Adminmenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Link} from "react-router-dom"
import "./Alladmin.css"

const Products = () => {
const [products, setProducts] = useState([])

// get All products
const getAllproducts = async() => {

  try {
    const {data} = await axios.get('/api/v1/product/get-product')
    setProducts(data.products)

  } catch (error) {
    console.log(error);
    toast.error("something went wrong")
  }
}
//lifecycle method
useEffect(()=> {
  getAllproducts()

},[])


  return (
    <Layout>
        <div className='product-container'>
        <div>
            <Adminmenu/>
        </div>
        <div className='product listing'>
           <h2>All products List </h2>
           <div>
           {products?.map((p => (
            <Link className='product-link'  key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
            <div> 
              <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className='product-image' />
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <h3>{p.price}</h3>
              <p>{p.quantity}</p>
            </div>
            </Link>
           )))}
           </div>
         
        </div>
        </div>
      
    </Layout>
  )
}

export default Products