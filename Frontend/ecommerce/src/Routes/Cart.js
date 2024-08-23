import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from "react-router-dom"
import Navbar from '../Components/Navbar';
import {toast} from 'react-toastify'
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate()

  const getCartItems = () => {
    const token = sessionStorage.getItem("jwt");
    axios.get("http://localhost:8081/user/cart/" + sessionStorage.getItem("userId"),{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
        .then(res => setCartItems(res.data))
        .catch(err => console.log(err))
  }

  const deleteItem = (id) => {
    axios.delete("http://localhost:8081/product/cart/"+id)
        .then(res => getCartItems())
        .catch(err => console.log(err))
  }

  useEffect(() => {
    getCartItems();
  }, [])

  const handleQuantityChange = (itemId, newQuantity) => {
    let cart = {userId: sessionStorage.getItem("userId"),
                productId: itemId,
                quantity: newQuantity}
                const token = sessionStorage.getItem("jwt");
    axios.post("http://localhost:8081/product/cart/", cart,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
        .then(res => {
            getCartItems();
        })
    
  };

  const checkout = () => {
    axios.get("http://localhost:8081/user/checkout/" + sessionStorage.getItem("userId"))
        .then(res => {
          navigate("/");
          toast.success("Thank You for your purchase")
        })
        .catch(err => console.log(err))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);
  };

  return (
   <>
    <Navbar/>
    <div className="container mt-5">
      <h1>Shopping Cart</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td>₹{item.product.price}</td>
              <td>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() =>
                    handleQuantityChange(item.product.id, -1)
                  }
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                {item.quantity}
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() =>
                    handleQuantityChange(item.product.id, 1)
                  }
                >
                  +
                </button>
              </td>
              <td>₹{item.product.price * item.quantity}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => deleteItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     {cartItems.length > 0 &&  <div className="text-right">
        <h5>Total Price: ₹{calculateTotal()}</h5>
        <button className="btn btn-primary" onClick={checkout}>Checkout</button>
      </div>
    }
    {cartItems.length === 0 && <h2>Empty Cart</h2>}
    </div>
   </>
  );
};

export default CartPage;
