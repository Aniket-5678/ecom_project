
import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/Search'

const Search = () => {
     const [values, setValues] = useSearch()

  return (
    <Layout>
        <div className='search-container'>
            <div>
               <h1>search results</h1>
               <h6>{values?.results.length < 1 ? 'No product found' :`Found${values?.results.length}`}</h6>

                 <div className='product-list'>
               {values?.results.map((p => (
    
          <div key={p._id} className='products' > 
           <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className='product-home-image' />
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <h3>${p.price}</h3>
             <div className='product-btn-main'> 
             <button className='product-btn1'>More details</button>
             <button className='product-btn2'>Add to cart</button>
           </div>

          </div>
           )))}
              </div>
            </div>
        </div>
   </Layout>
  )
}

export default Search