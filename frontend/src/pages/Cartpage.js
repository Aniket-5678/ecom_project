import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/Cart'
import { useNavigate } from 'react-router-dom'
import  "./Cartpage.css"
import DropIn from "braintree-web-drop-in-react"
import axios from 'axios'
import toast from 'react-hot-toast'


const Cartpage = () => {
  
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    //total price
    const totalPrice = () => {
        try {
            let total = 0;
               cart?.map((item) => { total =total + item.price})
                return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
             })

        } catch (error) {
            console.log(error);
        }
    }
    
    // delete item
    const removeCartitem = (pid) => {
    
        try {
             let mycart = [...cart]
             let index = mycart.findIndex((item) =>  item._id === pid)
             mycart.splice(index, 1)
             setCart(mycart)
             localStorage.setItem('cart', JSON.stringify(mycart))
           
        } catch (error) {
            console.log(error);
        }
    }
   
  // get payment gateway token
  const getToken = async() => {
    try {
        const {data} = await axios.get('/api/v1/product/braintree/token') 
        setClientToken(data?.clientToken)
    } catch (error) {
        console.log(error);
    }
  }

useEffect(()=> {
    getToken()
},[auth?.token])

  // handle payment
  const handlePayment = async() => {

try {
    setLoading(true)
    const {nonce} = await instance.requestPaymentMethod()
    const {data} = await axios.post('/api/v1/product/braintree/payment', {nonce, cart})
     setLoading(false)
    localStorage.removeItem('cart')
    setCart([])
    navigate('/dashboard/user/orders')
    toast.success("payment completed successfully ")
 } catch (error) {
  console.log(error);
  setLoading(false)
}

  }


  return (
    <Layout>
        <div className='car-container'>
        <div >
        <h1 className='cart-text'>
          {`Hello  ${auth?.token && auth?.user.name}`}
        </h1>
        <h4 className='cart-results'>
           {cart?.length  ? `you have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}` : "your cart is empty "  }
        </h4>
       </div>
        <div className='cart-main' >
         <div  className='cart-items'>
            {cart?.map((p) => (
              
                <div key={p._id} className='product-cart'> 
                <div className='image-cart'> 
                <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className='product-cart-image' />
                  </div> 
                  <div className='cart-details'>
                      <h3>{p.name}</h3>
                      <p>{p.description} </p>
                      <h3> price: ${p.price}</h3>
                      <button className='remove-btn' onClick={()=> removeCartitem(p._id)}>remove</button>
                  </div>
             </div>

            ))}
        </div>
        <div className='cart-payment'>
           <h4>Cart summary</h4>
           <p>total checkout || payment</p>
           <h2>total:${totalPrice()}</h2>
           {auth?.user?.address ? (
            <>
            <div className='curren-address'>
                <h4>current Address</h4>
                 <h5>{auth?.user?.address}</h5>
                 <button className='update-btn' onClick={()=> navigate('/dashboard/user/profile')}>update Address</button>
            </div>
            </>
           ): (
            <div>
               {auth?.token ? (
                <button  onClick={() => navigate('/dashboard/user/profile')}></button>
               ) : (
                <button className='login-cart-btn' onClick={()=> navigate('/login', {state: '/cart'})}>please login to checkout</button>
               )}
            </div>
              )}
              <div>
          {!clientToken || !cart?.length ? (
            ""
          ) : (
           <>
            <DropIn 
              options={{
                authorization: clientToken,
              }}
              onInstance={instance => setInstance(instance)}
            
            />
              <button className='make-payment'  onClick={handlePayment} disabled={ !instance || !auth?.user?.address || loading}>
                 {loading ? "processing..."  : "make payment" }
              </button>
           
           </>
          )}
           
        </div>  
         </div>
       </div>
        </div>
    </Layout>
  )
}

export default Cartpage