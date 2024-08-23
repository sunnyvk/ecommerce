import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnavbar from './adminnavbar';
import { useNavigate } from 'react-router-dom';

function Customers() {
  const [customers, setCustomers] = useState([]);

  const history = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/cust")
      .then((result) => {
        setCustomers(result.data);
      })
      .catch(err => console.log("Error occurred"));
  }, []);

  return (
    <>
      <Adminnavbar />

      <div className="container mt-5">
        <h2>Customer List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Status</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.email}</td>
                <td>{customer.mobile}</td>
                <td>{customer.status}</td>
                <td>{customer.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Customers;