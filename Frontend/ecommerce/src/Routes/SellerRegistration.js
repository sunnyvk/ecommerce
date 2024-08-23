import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify"

const SellerRegistration = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'SELLER',
    mobile: '',
    status: 'PENDING',
  });

  const navigate = useNavigate();

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const Register = () => {
    const token = sessionStorage.getItem("jwt");
    axios
      .post('http://localhost:8081/user/register', user,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        toast.success(res.data.message)
        setUser({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'SELLER',
          mobile: '',
          status: 'PENDING',
        });
        navigate('/login');
      })
      .catch((err) => toast.error("Something went wrong"));
  };

  return (
    <div className='container mt-5'>
      <div className='card shadow'>
        <div className='card-body'>
          <h3 className='card-title mb-4'>Seller Registration</h3>
          <form>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                name='firstName'
                value={user.firstName}
                onChange={onInputChange}
                placeholder='Enter first name'
              />
            </div>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                name='lastName'
                value={user.lastName}
                onChange={onInputChange}
                placeholder='Enter last name'
              />
            </div>
            <div className='mb-3'>
              <input
                type='tel'
                className='form-control'
                name='mobile'
                value={user.mobile}
                onChange={onInputChange}
                placeholder='Enter mobile'
              />
            </div>
            <div className='mb-3'>
              <input
                type='email'
                className='form-control'
                name='email'
                value={user.email}
                onChange={onInputChange}
                placeholder='Enter email'
              />
            </div>
            <div className='mb-3'>
              <input
                type='password'
                className='form-control'
                name='password'
                value={user.password}
                onChange={onInputChange}
                placeholder='Enter Password'
              />
            </div>
            <div>
              <button
                type='button'
                className='btn btn-primary'
                onClick={Register}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistration;
