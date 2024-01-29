import React,{useState} from 'react'
import {Link} from "react-router-dom"
import "./Header.css"
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import Searchinput from '../form/Searchinput'
import useCategory from '../../Hooks/useCategory'
import { useCart } from '../../context/Cart'
import {Badge} from "antd"

const Header = () => {

  const [auth, setAuth] = useAuth()
  const [cart] = useCart()
   const categories = useCategory()
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handlelogout = () => {

   setAuth({
    ...auth , user: null, token: ''
   })
   localStorage.removeItem('auth')
   toast.success("logout successfully")
  }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <div className='header-container' >
        <img src='https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg' alt='logo' className='logo' />
        <div>
          <Searchinput/>
        </div>
    
      <nav className='Navbar' >
        <Link to='/' className='nav-link'> Home</Link>
        <Link>
        <div className='dropdown'>
          <button onClick={toggleDropdown} className='dropbtn'>
            Categories <i className='fa-solid fa-chevron-down'></i>
          </button>
          {isDropdownOpen && (
            <div className='dropdown-content'>
             <Link to={'/categories'}>All categories</Link>
              {categories?.map((c) => (
                <Link key={c._id}  className='nav-link-1' to={`/category/${c.slug}`}>
                     {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        </Link>
       

         {
            !auth.user ? (<>
              <Link to='/register' className='nav-link'> <i class="fa-solid fa-user"></i> signup</Link>
              <Link to='/login' className='nav-link'>login</Link>
          </>): (
             <>
             <div className="dropdown">
               <button onClick={toggleDropdown} className="dropbtn">
                 {auth?.user.name} <i className="fa-solid fa-chevron-down"></i>
               </button>
               {isDropdownOpen && (
                 <div className="dropdown-content">
          
                   <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="nav-dashboard">
                     <p className='nav-h2'> Dashboard</p> 
                   </Link>
                     <Link to='/login' onClick={handlelogout} className="nav-link">
                        <p className='nav-h2'>Logout</p>
                   </Link>
                 </div>
               )}
             </div>
           </>
          )
         }
        
        <Badge count={cart?.length} showZero>
      <Link to='/cart' className='nav-link'>cart<i class="fa-solid fa-cart-shopping"></i></Link>
    </Badge>
         
        
        
      
      </nav>
    </div>
  )
}

export default Header