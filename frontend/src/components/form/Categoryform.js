import React from 'react'

const Categoryform = ({handleSubmit, value, setValue}) => {
  return (
    <div>
 <form onSubmit={handleSubmit}>
  <div>
  <input type='text' placeholder='Enter category name' value={value} onChange={(e)=> setValue(e.target.value)} />
    <button type='submit'>submit</button>
  </div>
 
 </form>
   
    </div>
  )
}

export default Categoryform