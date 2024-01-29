import React,{useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import "./Alluserdashboard.css"


const Profile = () => {
  const [auth, setAuth] = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")


 useEffect(()=> {
  const {name, email, address , phone} = auth.user
  setName(name)
  setEmail(email)
  setPhone(phone)
  setAddress(address)

 }, [auth.user])
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
         const {data} = await axios.put('/api/v1/auth/profile', {name, email, password,phone,address})
         
           if (data?.error) {
              toast.error(data?.error)
           }else{
            setAuth({...auth, user:data?.updatedUser})
            let ls = localStorage.getItem("auth")
             ls =  JSON.parse(ls)
             ls.user = data.updatedUser
             localStorage.setItem('auth', JSON.stringify(ls)) 
             toast.success("profile update susccessfully")
           }
    } catch (error) {
        console.log(error);
        toast.error("something went wrong")
    }

    }

  return (
    <Layout>
    <div className='profile-container'>
      <UserMenu/>
    </div>
     <div className='user-main'>
    <div className='signup-container'>
          <form className='signup-main' onSubmit={handleSubmit}>
            <h2 className='text'>User profile</h2>
           
            <input type='text' placeholder='Enter your name' className='signup-input' value={name} onChange={(e) => setName(e.target.value)} />
          
             <input type='email' placeholder='Enter your email' className='signup-input' value={email} onChange={(e) => setEmail(e.target.value) }    disabled/>
          
             <input type='password' placeholder='Enter your password'  className='signup-input' value={password} onChange={(e) => setPassword(e.target.value)}   />
           
             <input type='text' placeholder='Enter your phone number' className='signup-input'  value={phone} onChange={(e) => setPhone(e.target.value) } />
      
             <input type='text' placeholder='Enter your address' className='signup-input' value={address} onChange={(e) => setAddress(e.target.value)}   />


           
             <button type='submit' className='signup-btn'>update</button>
             
        
          </form>
       </div>
     </div>
         
    </Layout>
  )
}

export default Profile