import React from 'react'
import { useSearch}  from "../../context/Search"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./Searchinput.css"


const Searchinput = () => {
    const [values,setValues] = useSearch()
    const navigate = useNavigate()

  // handle submit 
  const handleSubmit = async (e) => {
    e.preventDefault()
  try {
       const {data} = await axios.get(`/api/v1/product/search/${values.keyword}`)
       setValues({...values, results: data})
        navigate('/search')
  } catch (error) {
    console.log(error);
  }
  }


  return (
    <div>
        <form role='search' onSubmit={handleSubmit} className='search-main'>
            <input type='search' placeholder='Search for products' className='search-input' value={values.keyword} onChange={(e)=> setValues({...values, keyword: e.target.value})}  />
            <button type='submit' className='search-btn'><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>

    </div>
  )
}

export default Searchinput