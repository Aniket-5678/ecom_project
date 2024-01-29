import React, {useState} from 'react'
import Layout from '../../components/layout/Layout'
import "./Login.css"
 import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate, Link , useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth';


 const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
    const location = useLocation()
 

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         const res = await axios.post('/api/v1/auth/login', { email, password})

       if (res && res.data.success) {
            toast.success(res.data &&res.data.message)
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token
            })
            localStorage.setItem('auth', JSON.stringify(res.data))
            navigate( location.state ||'/')
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
       
    <div className='login-container'>
       <form className='login-main' onSubmit={handleSubmit}>
         <h2 className='text'>Login</h2>
        
          <input type='email' placeholder='Enter your email' className='login-input' value={email} onChange={(e) => setEmail(e.target.value) }  required />
       
          <input type='password' placeholder='Enter your password' className='login-input' value={password} onChange={(e) => setPassword(e.target.value)} required />
        
          <button type='submit' className='login-btn'>Login</button>
          <button type='button' className='forget-login-btn' onClick={ ()=> navigate('/forgot-password')} >forget password?</button>
          <Link className='login-link' to='/register'> Not have an account please Signup?</Link>
       </form>
      
    </div>
 </Layout>
  )
}

export default Login