import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Routes/Login";
import Products from "./Routes/Products";
import SellerRegistration from "./Routes/SellerRegistration"
import AddProduct from "./Routes/AddProduct";
import EditProduct from "./Routes/EditProduct";
import Home from "./Routes/Home";
import Cart from "./Routes/Cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from "./Routes/Orders";
import CustomerRegistration from "./Routes/CustomerRegistration";
import ProtectedRoute from "./Routes/ProtectedRoute";
import SellerProtectedRoute from "./Routes/SellerProtectedRoute";
import Asellers from "./admin/approvedsellers";
import Aboutadmin from "./admin/about";
import AddAddressForm from "./admin/address";
import Adminhome from "./admin/adminhome";
import Customers from "./admin/customer";
import AddressList from "./admin/getAddress";
import Pendingseller from "./admin/pendingseller";
import LoginAdmin from "./admin/loginadmin";
import AdminProtectedRoute from "./Routes/AdminProtectedRoute";

function App() {
  // axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('jwt')}`;
  return (
   <>
    <BrowserRouter>
    <Routes>
         <Route Exact path="/" element={<Home/>}/>
         <Route Exact path="/login" element={<Login/>}/>
         <Route exact path="/seller/products" element={<SellerProtectedRoute path="/seller/products" component={<Products/>}/>}/>
         <Route exact path="/sellerRegistration" element={<SellerRegistration/>}/>
         <Route exact path="/registration" element={<CustomerRegistration/>}/>
         <Route exact path="/seller/addProduct" element={<SellerProtectedRoute path="/seller/addProduct" component={<AddProduct/>}/>}/>
         <Route exact path="/product/edit/:productId" element={<SellerProtectedRoute path="/product/edit/:productId" component={<EditProduct/>}/>}/>
         <Route exact path="/cart" element={<ProtectedRoute path="/cart" component={<Cart/>}/>}/>
         <Route exact path="/orders" element={<ProtectedRoute path="/orders" component={<Orders/>}/>}/>

          {/* admin routes */}
          <Route exact path="/asellers" element={<AdminProtectedRoute path="/asellers" component={<Asellers/>}/>}/>
          <Route exact path="/psellers" element={<AdminProtectedRoute path="/psellers" component={<Pendingseller/>}/>}/>
          <Route exact path="/address" element={<AdminProtectedRoute path="/address" component={<AddAddressForm/>}/>}/>
          <Route exact path="/adminhome" element={<AdminProtectedRoute path="/adminhome" component={<Adminhome/>}/>}/>
          <Route exact path="/cust" element={<AdminProtectedRoute path="/cust" component={<Customers/>}/>}/>
          <Route exact path="/getaddress" element={<AdminProtectedRoute path="/getaddress" component={<AddressList/>}/>}/>






    </Routes>
    </BrowserRouter>
    <ToastContainer autoClose={1000}/>
   </>
  );
}

export default App;
