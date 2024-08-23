import {useParams, useNavigate} from "react-router-dom"
import React, { useEffect, useState } from 'react';
import axios from "axios";

function EditProduct() {
    const {productId} = useParams();

    const [product, setProduct] = useState({
        id: '',
        name: '',
        price: '',
        productImageIds: [],
        quantity: '',
        sellerId: sessionStorage.getItem("userId"),
        categoryId: '',
      });

      const [imageIds, setImageIds] = useState([])

      const [imageData, setImageData] = useState(null);
    
      const navigate = useNavigate();

      const getImage = (images) => {
            // console.log(product);
            // console.log(imageIds)
            console.log(images)
            const token = sessionStorage.getItem("jwt");
            axios.get("http://localhost:8081/product/images/"+images[0], { responseType: 'arraybuffer' },{
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            .then(response => {
                const base64Image = btoa(
                new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                setImageData(`data:image/jpeg;base64,${base64Image}`);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
        });
      }

      const handleInputChange = (event) => {
        let copyOfProduct = { ...product }
        copyOfProduct[event.target.name] = event.target.value;
        setProduct(copyOfProduct);
      };
    
      const handleSubmit = (event) => {
        console.log(product)
        event.preventDefault();
        const token = sessionStorage.getItem("jwt");
        axios.put("http://localhost:8081/product/editProduct", product,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
            .then(res => {
                navigate("/seller/products")
            })
            .catch(err => {console.log(err)})
      };

      useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        axios.get("http://localhost:8081/product/" + productId,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
            .then(res => {
                //console.log(res.data)
                setProduct(res.data)
                setImageIds([...res.data.productImageIds])
                getImage(res.data.productImageIds)
            })
            .catch(err => console.log(err)) 
          
      }, [])

      return (
        <div
        className="container d-flex justify-content-center align-items-center vh-100">
        <div
          className="d-flex flex-column p-4"
          style={{
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2 className="mb-4 fs-4">Edit Product</h2>
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
              <div className="form-group">
              <label>ID:</label>
              <input
                type="text"
                disabled
                className="form-control"
                name="id"
                value={product.id}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex justify-content-between mb-3" style={{paddingTop:"10px"}}>
                <button type="submit" className="btn btn-primary">Update Product</button>
              </div>
              </form>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              {imageData && (
                <img
                  style={{
                    maxHeight: "500px",
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                  src={imageData}
                  alt="Product"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      );
}

export default EditProduct;