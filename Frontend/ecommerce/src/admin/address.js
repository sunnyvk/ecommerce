import React, { useState } from 'react';
import axios from 'axios';
import Adminnavbar from './adminnavbar';

const AddAddressForm = () => {
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddAddress = () => {
    axios
      .post('http://localhost:4000/address/add', { pincode, city })
      .then((response) => {
        setSuccessMessage('Address added successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error adding address.');
        setSuccessMessage('');
      });
  };

  return (
   <>
    <Adminnavbar/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg rounded">
            <div className="card-body">
              <h2 className="card-title">Add Address</h2>
              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">
                  Pincode:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <button onClick={handleAddAddress} className="btn btn-success">
                Add Address
              </button>
              {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
              {successMessage && <p className="text-success mt-3">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="/getaddress">
              Get Address
            </a>
          </li>
        </ul>
      </div>
    </div>
   </>
  );
};

export default AddAddressForm;
