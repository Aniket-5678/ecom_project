
import {Routes, Route} from "react-router-dom"
import Homepage from "./pages/Homepage";
import About from "./pages/About"
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import PagenotFound from "./pages/PagenotFound"
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./components/Routes/Private";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import AdminRoute from "./components/Routes/AdminRoute";
import Admindashboard from "./pages/Admin/Admindashboard";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/CreateCategory";
import Users from "./pages/Admin/Users";
import Dashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Cartpage from "./pages/Cartpage";
import AdminOrders from "./pages/Admin/AdminOrders";








function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Homepage/>} />
       <Route path="/categories" element={<Categories/>} />
       <Route path="/cart" element={<Cartpage/>} />
       <Route path="/category/:slug" element={<CategoryProduct/>} />
      <Route path="/product/:slug" element={<ProductDetails/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/dashboard" element={<PrivateRoute/>} >
         <Route path="user" element={<Dashboard />} />
         <Route path="user/orders" element={<Orders/>} />
         <Route path="user/profile" element={<Profile/>} />

      </Route>
     
     <Route path="/dashboard" element={<AdminRoute/>} >
         <Route path="admin" element={<Admindashboard/>} />
         <Route path="admin/create-product" element={<CreateProduct/>} />
         <Route path="admin/product/:slug" element={<UpdateProduct/>} />
         <Route path="admin/create-category" element={<CreateCategory/>} />
         <Route path="admin/products" element={<Products/>} />
         <Route path="admin/create-users" element={<Users/>} />
         <Route path="admin/orders" element={<AdminOrders/>} />
     </Route>
     
      
      <Route path="/register" element={<Signup/>} />
      <Route path="/forgot-password" element={<Forgotpassword/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/policy" element={<Policy/>} />
      <Route path="*" element={<PagenotFound/>} />
      
    </Routes>
    </div>
  );
}

export default App;
