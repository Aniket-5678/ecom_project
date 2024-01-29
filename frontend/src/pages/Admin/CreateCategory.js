import React,{useEffect, useState} from 'react'
import Layout from '../../components/layout/Layout'
import Adminmenu from '../../components/layout/Adminmenu'
import "./Alladmin.css"
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../components/form/Categoryform'
import { Modal } from "antd"


const CreateCategory = () => {
 const [categories, setCategories] = useState([])
 const [name, setName] = useState("")
 const [visible, setVisible] = useState(false)
 const [selected ,setSelected] = useState(null)
 const [updatename, setUpdatename] = useState("")

 //handle form  creating category form
const handleSubmit = async(e) => {
 e.preventDefault()
  
 try {
  const {data} = await axios.post('/api/v1/category/create-category' ,{name})
   if (data.success) {
      toast.success(`${name} is created`)
      getAllcategory()
   }else{
    toast.error(data.message)
   }

 } catch (error) {
    console.log(error);
    toast.error("something went wrong in input")

 }

}

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
},[])

  // update category 

  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name: updatename})
   if (data.success) {
       toast.success(`${updatename}`)
       setSelected(null)
       setUpdatename("")
       setVisible(false)
       getAllcategory()
   }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong while updating ")
    }
  }


  // handle delete
  const handleDelete = async(pId) => {
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${pId}`)
   if (data.success) {
       toast.success(`category is deleted succcessfully`)
  
       getAllcategory()
   }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong while updating ")
    }
  }


  return (
    <Layout>
    <div className='Admin-Routes-container'>
     <div>
     <Adminmenu/>
      </div>

      <div className='table-main'>
        <h1>Manage category</h1>
        <div>
           <Categoryform handleSubmit={handleSubmit} value={name} setValue={setName} />
        </div>

       <table>
     <thead>
        <tr>
          <th>name</th>
          <th>Action</th>
        </tr>
     </thead>
    <tbody>
  
      {categories?.map((c)=> (
         <>
         <tr>
            <td key={c._id} >{c.name}</td>
            <td><button onClick={()=> {setVisible(true); setUpdatename(c.name);setSelected(c)} }>edit</button></td>
            <td><button onClick={()=> handleDelete(c._id)}>delete</button></td>
          </tr>
      
          </>
      ))}
      

    </tbody>

       </table>


        </div>
        <div>
          <Modal onCancel={()=> setVisible(false)} footer={null} visible={visible} >
          
          <Categoryform value={updatename} setValue={setUpdatename} handleSubmit={handleUpdate} />
          </Modal>
        </div>
        </div>
   
   
    
</Layout>
  )
}

export default CreateCategory