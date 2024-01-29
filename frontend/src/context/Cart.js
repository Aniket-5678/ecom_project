import { useState,  useContext, createContext, useEffect} from "react";



const cartContext = createContext()

 

  const CartProvider = ({children}) => {

   const [cart, setCart] = useState([]);


   useEffect(()=> {
    let existingcartItem = localStorage.getItem("cart")
    if(existingcartItem) setCart(JSON.parse(existingcartItem))

   }, [])


   return(
   < cartContext.Provider value={[cart, setCart]}> 
   {children}
   </cartContext.Provider>
   )

}

// custom Hook

const useCart= () => useContext(cartContext)

 export  {useCart , CartProvider}