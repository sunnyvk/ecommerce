import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: "",
        sellerId: sessionStorage.getItem("userId"),
        categoryId: "",
        productImageIds: []
    });

    const [desc, setDesc] = useState({ desc: "", productId: "" });
    const [file, setFile] = useState(null);

    
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onInputDescChange = (event) => {
        let copyOfDesc = { ...desc };
        copyOfDesc[event.target.name] = event.target.value;
        setDesc(copyOfDesc);
    };

    const onInputChange = (event) => {
        let copyOfProduct = { ...product };
        copyOfProduct[event.target.name] = event.target.value;
        setProduct(copyOfProduct);
    };

    const addProduct = async () => {
        try {
            const token = sessionStorage.getItem("jwt");
            const response1 = await axios.post("http://localhost:8081/product/addProduct", product,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
            console.log(response1.data);
            let newDesc = { ...desc };
            newDesc.productId = response1.data.message;
            console.log(newDesc);
            const response2 = await axios.post("http://localhost:8081/product/description", newDesc);
            const formData = new FormData();
            formData.append('imageFile', file);
            const response3 = await axios.post(`http://localhost:8081/product/images/${response1.data.message}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/seller/products");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-5 fw-bold" style={{ color: "#3498db", fontFamily: "Arial, sans-serif", fontSize: "28px" }}>Add New Product</h2>
                <form className="p-4 shadow-lg">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="name" onChange={onInputChange} value={product.name} name="name" />
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" onChange={onInputChange} value={product.price} name="price" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input type="number" className="form-control" id="quantity" onChange={onInputChange} value={product.quantity} name="quantity" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="categoryId" className="form-label">Category ID</label>
                            <input type="number" className="form-control" id="categoryId" onChange={onInputChange} value={product.categoryId} name="categoryId" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Product Description</label>
                        <input type="text" className="form-control" id="desc" onChange={onInputDescChange} value={desc.desc} name="desc" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imageFile" className="form-label">Product Image</label>
                        <input type="file" required className="form-control" id="imageFile" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <button type="button" onClick={addProduct} className="btn btn-primary">Add Product</button>
                </form>
        </div>
    );
}

export default AddProduct;
