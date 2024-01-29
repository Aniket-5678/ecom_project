import React from 'react'
import Header from './Header'
import Footer from './Footer'
import  { Toaster } from 'react-hot-toast';
import "./Layout.css"

const Layout = ({ children }) => {
  return (
    <div className='Layout-container'>
     
            <Header />
           
            <main style={{ minHeight: "70vh" }}>
               <Toaster />
              {children}
              </main>
            <Footer />

          </div>
          )
}

          export default Layout