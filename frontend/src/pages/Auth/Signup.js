import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import "./Signup.css"
 import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
   
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         const res = await axios.post('/api/v1/auth/register', {name, email, password,phone,address,answer})

       if (res && res.data.success) {
            toast.success(res.data.message)
           navigate('/login')
       }else{
        toast.error(res.data.message)
       }

    } catch (error) {
        console.log(error);
        toast.error("something went wrong")
    }

    }


  return (
    <Layout>
       
       <div className='signup-container'>
          <form className='signup-main' onSubmit={handleSubmit}>
            <h2 className='text'>Signup</h2>
           
            <input type='text' placeholder='Enter your name' className='signup-input' value={name} onChange={(e) => setName(e.target.value)} required/>
          
             <input type='email' placeholder='Enter your email' className='signup-input' value={email} onChange={(e) => setEmail(e.target.value) }  required />
          
             <input type='password' placeholder='Enter your password'  className='signup-input' value={password} onChange={(e) => setPassword(e.target.value)} required />
           
             <input type='text' placeholder='Enter your phone number' className='signup-input'  value={phone} onChange={(e) => setPhone(e.target.value)}required />
      
             <input type='text' placeholder='Enter your address' className='signup-input' value={address} onChange={(e) => setAddress(e.target.value)}  required />

             <input type='text' placeholder='what is your favourite sports' className='signup-input' value={answer} onChange={(e) => setAnswer(e.target.value)}  required />
           
             <button type='submit' className='signup-btn'>signup</button>
             
             <Link className='signup-link' to='/login'><p>already have an account please Login?</p></Link>
          </form>
       </div>
    </Layout>
  )
}

export default Signup