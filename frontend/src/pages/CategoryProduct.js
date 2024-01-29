import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "./Categoryproduct.css"

const CategoryProduct = () => {

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const params = useParams()
    const navigate = useNavigate()



    useEffect(()=> {
        if(params?.slug) getProductbyCat()
    },[params?.slug])
    // get product by category

    const getProductbyCat = async() => {
    try { 
       const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`)  
       setProducts(data?.products)
       setCategory(data?.category)
    } catch (error) {
        console.log(error);
    }


    }

  return (
    <Layout>
      <div className='catgeory-product-container'>
      <div >
        <h4 className='cat-name'>{category?.name}</h4>
        <h6 className='cat-count'>{products?.length} results</h6>

        <div>
        <div className='product-list-category'>
             {products?.map((p => (
    
          <div key={p._id} className='products-category' > 
           <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className='product-home-image' />
            <h2>{p.name}</h2>
            <p>{p.description.substring(0,20)}</p>
            <h3>${p.price}</h3>
             <div className='product-btn-category'> 
             <button className='product-cat-btn1' onClick={()=> navigate(`/product/${p.slug}`) }>More details</button>
           </div>

          </div>
           )))}
              </div>
           {/*   <div>
                 {products && products.length < total && (
                  <button  onClick={(e)=> { e.preventDefault(); setPage(page + 1)}} >
                    {loading ?  "Loading..." : "Loadmore"}
                    </button>
                 )}
                 </div>*/}
        </div>
        </div>
      </div>
       
    
    </Layout>
  )
}

export default CategoryProduct