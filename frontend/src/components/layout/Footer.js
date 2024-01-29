import React from 'react'
import "./Footer.css"
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div className='footer-container'>
  <div className='footer-heading'>
    <h1 className='footer-h1'>ANIKET ECOMMERCE </h1>
  </div>
  <div  className='footer-main'>
    <Link  className= 'footer-nav' to='/about'>About us</Link>
    <Link  className= 'footer-nav' to='/policy'>policy</Link>
    <Link  className= 'footer-nav' to='/contact'>contact us</Link>
  </div>
    </div>
  )
}

export default Footer