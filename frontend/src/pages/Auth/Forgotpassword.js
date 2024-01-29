import React, {useState} from 'react'
import Layout from '../../components/layout/Layout'
 import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const Forgotpassword = () => {
  const [email, setEmail] = useState("")
  const [newpassword, setNewPassword] = useState("")
  const [answer, setAnswer] = useState("")
   

  const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         const res = await axios.post('/api/v1/auth/forgot-password', { email, newpassword, answer})

       if (res && res.data.success) {
            toast.success(res.data &&res.data.message)
        
            navigate( '/login')
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
         <h2 className='text'>Reset</h2>
        
          <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value) }  required />
          <input type='text' placeholder='Enter your favrouite sport' value={answer} onChange={(e) => setAnswer(e.target.value) }  required />
       
          <input type='password' placeholder='Enter your password' value={newpassword} onChange={(e) => setNewPassword(e.target.value)} required />
        
          <button type='submit'>Reset password</button>
      
       </form>
      
    </div>


    </Layout>
  )
}

export default Forgotpassword