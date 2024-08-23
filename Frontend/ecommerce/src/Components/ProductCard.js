import { React, useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'


const ProductCard = ({ product }) => {

    const [imageData, setImageData] = useState(null);
    const [productDescription, setProductDescription] = useState({})

    const addToCart = () => {
        if(sessionStorage.getItem("userId") == null) {
          toast.error("Login first");
          return;
        }
        if(product.sellerId == sessionStorage.getItem("userId")) {
          toast.error("You cannot add your own product to your cart")
          return;
        }
        console.log(product)
        let cart = {userId: sessionStorage.getItem("userId"),
                    productId: product.id,
                    quantity: 1}

        axios.post("http://localhost:8081/product/cart", cart)
            .then(res => {
                toast.success("Product added to cart")
            })
    }

    const getProductDescription = (productId) => {
      axios.get("http://localhost:8081/product/description/" + productId)
        .then(res => {
          setProductDescription(res.data);
        })
        .catch(err => console.log(err))
    }

    const getImage = (images) => {
        axios.get("http://localhost:8081/product/images/"+images[0], { responseType: 'arraybuffer' })
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

  useEffect(() => {
    getImage(product.productImageIds);
    getProductDescription(product.id)
  }, [])

  return (
    <div className="card">
      {imageData == null && <div class="spinner-border" role="status" >
        <span class="visually-hidden"></span>
    </div>}
      {imageData && <img src={imageData} alt={product.name} className="card-img-top"  style={{
                    maxHeight: "250px",
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}/>}
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{productDescription.desc}</p>
        <p className="card-price">₹{product.price}</p>
        <button onClick={addToCart} className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;