import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import "./Home.css"
import axios from 'axios'
import {Checkbox, Radio} from "antd"
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
import toast from 'react-hot-toast'


const Homepage = () => {

  const navigate = useNavigate()
  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page ,setPage] = useState(1)
  const [loading, setLoading] = useState(false)



   // get All category
 const getAllcategory = async() => {

  try {
   const {data} = await axios.get('/api/v1/category/get-category')
   if (data?.success) {
    setCategories(data?.category)
   }

  } catch (error) {
    console.log(error);
  }

 }

useEffect(()=> {
  getAllcategory();
  getTotal();
},[])

//get all products

const getAllproduct = async() => {
  try {
       setLoading(true)
     const {data} = await  axios.get(`/api/v1/product/product-list/${page}`)
       setLoading(false)
       setProducts(data.products)

   } catch (error) {
    setLoading(false)
      console.log(error);
   }
}

  //get total
  const getTotal = async() => {
    try {
       const {data} = await axios.get('/api/v1/product/product-count')
       setTotal(data?.total)
    } catch (error) {
      console.log(error);
    }
  }
 


  useEffect(()=> {
    if(page === 1) return
    Loadmore()
  },[page])
  
  // loadmore

  const Loadmore = async() => {
   
    try {
      setLoading(true)
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`)  
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

// get all filter
const handleFilter = (value, id) => {
 let all = [...checked]
 if (value) {
  all.push(id)

 }else{
  all = all.filter(c => c !== id)
 }
 setChecked(all)
}


useEffect(()=> {
 if(!checked.length || !radio.length) getAllproduct()

},[checked.length, radio.length])


useEffect(()=> {
 if(!checked.length || !radio.length) 
     filterProduct()
},[checked, radio])





 // filter function
  
 const  filterProduct = async() => {
try {
  const {data} =  await axios.post(`/api/v1/product/product-filters`, {checked, radio})
  setProducts(data?.products)
} catch (error) {
  console.log(error);
}

 }


  return (
    
      <Layout>
        <div className='product-banner'>
          <img src='https://storiesflistgv2.blob.core.windows.net/stories/2017/09/mehengaai_mainbanner.jpg' alt='bannerimage' className='banner-img' />
        </div>
      <div className='product-container'>
        
        <div className='filter-category'>
          <h4 className='footer-cat'>filter By categories</h4>
          <div className='filter-check'>
            {categories?.map((c)=> (
              <Checkbox  key={c._id}  onChange={(e)=> handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox> 
            ))}
          </div>
          <div >
            <h4>Filter by price</h4>
          <Radio.Group onChange={(e)=> setRadio(e.target.value)}>
            {Prices?.map((p)=> (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <div>
          <button className='reset-btn' onClick={() => window.location.reload()} >Reset filter</button>
        </div>
        </div>
        
        <div className='Allproduct'>
          <div className='product-main' >
            <div>
              <div className='product-list'>
             {products?.map((p => (
    
          <div key={p._id} className='products' > 
           <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className='product-home-image' />
            <h2 className='product-name'>{p.name}</h2>
            <p>{p.description.substring(0,20)}</p>
            <h3>${p.price}</h3>
             <div className='product-btn-main'> 
             <button className='product-btn1' onClick={()=> navigate(`/product/${p.slug}`) }>More details</button>
             <button className='product-btn2' onClick={()=> {setCart([...cart,p]);
             localStorage.setItem('cart', JSON.stringify([...cart, p]))
              toast.success('Item Added to cart ')
            }}>Add to cart</button>
           </div>

          </div>
           )))}
              </div>
              <div>
                 {products && products.length < total && (
                  <button  className='loadmore' onClick={(e)=> { e.preventDefault(); setPage(page + 1)}} >
                    {loading ?  "Loading..." : "Loadmore"}
                    </button>
                 )}
              </div>
           </div>
          </div>
        </div>
      </div>
      </Layout>
      
  )
}

export default Homepage