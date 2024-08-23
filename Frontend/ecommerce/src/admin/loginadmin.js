import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const history = useNavigate();


  const loginUser = () => {
    axios
      .post('http://localhost:4000/users/login', {
        email,
        password,
      })
      .then(function (response) {
        console.log(response);
       history("/adminhome")
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h1 className="text-center mb-4">Login</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button onClick={loginUser} className="btn btn-success w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginAdmin;
