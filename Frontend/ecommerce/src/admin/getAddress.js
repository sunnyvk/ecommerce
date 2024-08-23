import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './adminnavbar';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = () => {
    axios
      .get('http://localhost:4000/address/get')
      .then((response) => {
        setAddresses(response.data);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error fetching addresses.');
      });
  };

  return (
    <>
      <Adminnavbar/>
      <div className="container mt-5">
      <h2>Available Addresses</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Pincode</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address) => (
            <tr key={address.pincode}>
              <td>{address.pincode}</td>
              <td>{address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AddressList;