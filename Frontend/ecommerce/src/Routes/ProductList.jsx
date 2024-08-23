import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

function ProductList() {

  //
    const [products, setProduct] = useState([]);

  //
  useEffect({},[])
    return (
            <div className='container'>
      <h3>List of Categories</h3>
      <hr />
      <div>
        <td>
        <Link to='/addProduct' className='btn btn-primary mb-2'>
          Add Product
        </Link>
        </td>
        <table className='table table-bordered table-striped'>
          <thead className='thead-dark'>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>CategoryID</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category_id}</td>
                <td>
                  <Link
                    className='btn btn-info'
                    to={`/product/edit/${product.id}`}
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    className='btn btn-danger ml-2'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      );
}

export default ProductList;