import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function MultiLevelDropdown() {
  const [dropdownData, setDropdownData] = useState([]);

  const data = [
    {
      "id": 2,
      "subSubCatName": "shirt",
      "subCategory": {
        "id": 3,
        "subCatName": "Men",
        "category": {
          "id": 1,
          "categoryName": "Clothing"
        }
      }
    },
    {
      "id": 3,
      "subSubCatName": "pant",
      "subCategory": {
        "id": 3,
        "subCatName": "Men",
        "category": {
          "id": 1,
          "categoryName": "Clothing"
        }
      }
    }
  ]

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual API endpoint that provides JSON data
    axios.get('your-api-endpoint')
      .then(response => {
        setDropdownData(response.data);
      })
      .catch(error => {
        console.error('Error fetching dropdown data:', error);
      });
  }, []);

  const renderDropdownItems = (items) => {
    return items.map(item => (
      <li key={item.id}>
        <a href="#">{item.name}</a>
        {item.children && (
          <ul className="dropdown-menu">
            {renderDropdownItems(item.children)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="multiLevelDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Select an Option
      </button>
      <ul className="dropdown-menu" aria-labelledby="multiLevelDropdown">
        {renderDropdownItems(dropdownData)}
      </ul>
    </div>
  );
}

export default MultiLevelDropdown;
