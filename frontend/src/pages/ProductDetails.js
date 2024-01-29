
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import {  useParams } from 'react-router-dom'
import "./Productdetails.css"
import { useCart } from '../context/Cart'
import toast from 'react-hot-toast' 

const ProductDetails = () => {
 const params = useParams()
 const [product, setProduct] = useState({})
 const [relatedproducts, setRelatedproducts] = useState([])
 const [cart, setCart] = useCart()



 //initialize p 
useEffect(()=> {
 if(params?.slug) getProduct();

}, [params?.slug])

// get product
const  getProduct = async()=> {

    try {
        const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
        setProduct(data?.product)
         getSimilarproducts(data?.product._id, data?.product.category._id)
    } catch (error) {
        console.log(error);
    }
}

// get similar products
const getSimilarproducts = async(pid,cid) => {

try {
    const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
    setRelatedproducts(data?.products)
} catch (error) {
    console.log(error);
}

}


  return (
    <Layout>
    <div className='productdetails-container'>
    <div className='productdteails-1'>
    <img src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} height={'450px'} />
    </div>
    <div className='productdetails-2'>
    <h1>Product details</h1>
    <h3>Name: {product.name}</h3>
    <p> Description: {product.description}</p>  
    <p> Price: ${product.price}</p>
    <p>category: {product.category?.name}</p>
    <button className='product-detalis-btn' onClick={()=> {setCart([...cart,product]);
             localStorage.setItem('cart', JSON.stringify([...cart, product]))
              toast.success('Item Added to cart ')
            }} >Add to cart</button>
    </div>
    <hr/>
    <div className='product-detailes-main'>
        <h6 className='similar-h6'>similar product</h6>
        {relatedproducts.length < 1 && (<p>no similar product found</p>) }
        <div className='product-details-list'>
             {relatedproducts?.map((p => (
    
          <div key={p._id} className='products-similar' > 
           <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className='product-home-image' />
            <h2>{p.name}</h2>
            <p>{p.description.substring(0,20)}</p>
            <h3>${p.price}</h3>
             <div className='product-btn-main'> 
             <button className='product-details-btn2' onClick={()=> {setCart([...cart, p]);
             localStorage.setItem('cart', JSON.stringify([...cart, p]))
              toast.success('Item Added to cart ')
            }}>Add to cart</button>
           </div>
            
          </div>
           )))}
              </div>
     </div>
    </div>
    </Layout>
  )
}

export default ProductDetails