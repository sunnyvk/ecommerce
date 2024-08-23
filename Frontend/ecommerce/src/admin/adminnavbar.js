import React from 'react';
import { useNavigate } from "react-router-dom";

function Adminnavbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <b>E-Commerce Website</b>
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
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/adminhome">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-disabled="true" href="/asellers">
                Approved Sellers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-disabled="true" href="/psellers">
                Pending Sellers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-disabled="true" href="/cust">
                Customers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-disabled="true" href="/address">
                Address
              </a>
            </li>
          </ul>

          {/* Logout Button */}
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Adminnavbar;
