import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';


function Navbar( props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" onClick={() => navigate('/')}>
          VastraDalan
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => navigate('/')}>
                Home
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => navigate('/cart')}>
                Cart
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => navigate('/orders')}>
                Orders
              </button>
            </li>
            {
              sessionStorage.getItem("role") === "SELLER" ?             <li className="nav-item">
              <button className="nav-link btn" onClick={() => navigate('/seller/products')}>
                Products
              </button>
            </li> : ""
            }
          </ul>
          <Search setData={props.setData} data={props.data}/>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
