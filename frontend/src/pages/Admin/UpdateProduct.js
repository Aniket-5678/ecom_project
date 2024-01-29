import React, { useState , useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import Adminmenu from '../../components/layout/Adminmenu'
import "./Alladmin.css"
import toast from 'react-hot-toast'
import axios from 'axios'
import {Select} from "antd"
import { useNavigate, useParams } from 'react-router-dom'
const {Option} = Select

const UpdateProduct = () => {

  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [shipping, setShipping] = useState("")
  const [photo, setPhoto] = useState("")
  const [category, setCategory] = useState("")
  const [id, setId] = useState("")

  
  const navigate = useNavigate()
  const params = useParams()
 
// get single product
  
const getSingleproduct = async() => {

try {
  const {data}= await axios.get(`/api/v1/product/get-product/${params.slug}`);
    setName(data.product.name)  
    setId(data.product._id)
    setDescription(data.product.description)  
    setPrice(data.product.price)
    setQuantity(data.product.quantity)
     setShipping(data.product.shipping)
     setCategory(data.product.category._id)

} catch (error) {
  console.log(error);
}

}
  useEffect(()=> {
   getSingleproduct();
  // eslint-disable-next-line
  },[]);

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
},[]);

// create product function
const handleUpdate = async (e) => {
    e.preventDefault();
 try {
  const productdata = new FormData()
    productdata.append("name", name)
    productdata.append("description", description)
    productdata.append("price", price)
    productdata.append("quantity", quantity)
    photo && productdata.append("photo", photo)
    productdata.append("category", category)
    
    const {data} =  axios.put(`/api/v1/product/update-product/${id}`, productdata)
     if (data?.success) {
     toast.error(data?.message)
   
 }else{
    toast.success("product update successfully")
     navigate('/dashboard/admin/products')
 }

 } catch (error) {
   console.log(error);
   toast.error("something went wrong while updating a product")
 }
}

// Delte function

const handleDelete = async() => {
  try {
    let answer = window.prompt("Are you sure want to delete product")
    if (!answer) return
     const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`)
     toast.success("product deleted successfully")
      navigate('/dashboard/admin/products')

  } catch (error) {
    console.log(error);
  }
}

  return (
    <Layout>
    <div className='Admin-Routes-container'>
      <div>
        <Adminmenu />
      </div>
      <div>
        <h2>update products</h2>
        <div>
          <Select bordered={false} placeholder="select a category" size='large' showSearch onChange={(value) => {setCategory(value)}}  value={category}>
            {categories?.map((c)=> (
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
            {photo ? (
              <div> 
                <img src={URL.createObjectURL(photo)} alt='product' height={'200px'} />
              </div>
            ): (
              <div> 
              <img src={`/api/v1/product/product-photo/${id}`} alt='product' height={'200px'} />
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
          <Select bordered={false} placeholder="select shipping" size='large'   showSearch  onChange={(value) => setShipping(value)}  value={shipping ? "yes" : "no"} >

            <Option value="1">yes</Option>
            <Option value="0">no</Option>
          </Select>
         </div>
         <div>
          <button onClick={handleUpdate}>update product</button>
         </div>
         <div>
          <button onClick={handleDelete}>Delete product</button>
         </div>
        </div>
        </div>

    </div>




  </Layout>
)
  
}

export default UpdateProduct