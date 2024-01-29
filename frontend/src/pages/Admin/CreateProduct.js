import React, { useState , useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import Adminmenu from '../../components/layout/Adminmenu'
import "./Alladmin.css"
import toast from 'react-hot-toast'
import axios from 'axios'
import {Select} from "antd"
import { useNavigate } from 'react-router-dom'
const {Option} = Select


const CreateProduct = () => {
 
   const [categories, setCategories] = useState([])
   const [name, setName] = useState("")
   const [description, setDescription] = useState("")
   const [price, setPrice] = useState("")
   const [quantity, setQuantity] = useState("")
   const [shipping, setShipping] = useState("")
   const [photo, setPhoto] = useState("")
   const [category, setCategory] = useState("")
   
   const navigate = useNavigate()
   

   // get All category
 const getAllcategory = async() => {

  try {
   const {data} = await axios.get('/api/v1/category/get-category')
   if (data?.success) {
    setCategories(data?.category)
   }

  } catch (error) {
    console.log(error);
    toast.error("somethin went wrong while getting a category")
  }

 }

useEffect(()=> {
  getAllcategory()
  // eslint-disable-next-line
},[])

// create product function
const handleCreate = async (e) => {
e.preventDefault();
  try {
   const productdata = new FormData()
    productdata.append("name", name)
    productdata.append("description", description)
    productdata.append("price", price)
    productdata.append("quantity", quantity)
    productdata.append("photo", photo)
    productdata.append("category", category)

    const {data} =  axios.post('/api/v1/product/create-product', productdata)
  if (data?.success) {
    toast.error(data?.message)
    
  }else{
    toast.success("product created successfully")
    navigate('/dashboard/admin/products')
  }

  } catch (error) {
    console.log(error);
    toast.error("something went wrong while creating a product")
  }
}


  return (
    <Layout>
      <div className='Admin-Routes-container'>
        <div>
          <Adminmenu />
        </div>
        <div>
          <h2>create products</h2>
          <div>
            <Select bordered={false} placeholder="select a category" size='large' showSearch onChange={(value) => {setCategory(value)}}  >
              {categories.map((c)=> (
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}


            </Select>

            <div>
              <label>
                {photo ? photo.name : "upload photos"} 
              <input type='file'name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
              </label>
             
            </div>
            <div>
              {photo && (
                <div> 
                  <img src={URL.createObjectURL(photo)} alt='product-image' height={'200px'} />
                </div>
              )}
            </div>
            <div>
              <input type='text' placeholder='write name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
            <input type='textarea' placeholder='write description' value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
            <input type='number' placeholder='write price' value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
            <input type='number' placeholder='write quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
           <div>
            <Select bordered={false} placeholder="select shipping" size='large'   showSearch  onChange={(value) => setShipping(value)}  >

              <Option value="1">yes</Option>
              <Option value="0">no</Option>
            </Select>
           </div>
           <div>
            <button onClick={handleCreate}>create product</button>
           </div>
          </div>
          </div>

      </div>




    </Layout>
  )
}

export default CreateProduct