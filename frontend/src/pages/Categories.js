import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import Layout from '../components/layout/Layout'
import useCategory from '../Hooks/useCategory'
import "./Categories.css"

const Categories = () => {
 
const categories = useCategory()
  
  return (
    <Layout>
        <div className='categories-container'>
            <div className='categories-main'> 
             {categories.map((c) => (
                <div className='main-link'  >
                <Link className='categories-link' to={`/category/${c.slug}`}>{c.name}</Link>      
              </div>
             ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories