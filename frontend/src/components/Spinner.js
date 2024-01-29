import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = ({path = "login"}) => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()
  
    useEffect(()=> {
       const interval = setInterval(() => {
            setCount((preValue) => --preValue)
       }, 1000)
       count === 0 && navigate(`${path}`, {
        state: location.pathname
       })
       return () => clearInterval(interval)
    }, [count, navigate, location, path])

  return (
    <>
        <div>
            <h2>redirecting to you in {count} seconds</h2>
        <h1>Loding....</h1>
        </div>
        
        </>
  )
}

export default Spinner