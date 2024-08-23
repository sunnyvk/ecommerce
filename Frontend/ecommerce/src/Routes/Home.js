import axios from "axios";
import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react"


function Home() {
    
    const [products, setProducts] = useState([])
    const [data, setData] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8081/product/allProducts`)
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err));
        }, [])

    return(
        <>
        <Navbar setData={setData} data = {data}/>
        <div className="container my-4">
        <div className="row">
          {products.map((product, index) => {
            if(data.length > 0) {
              if(product.name.toLowerCase().includes(data.toLowerCase())) {
                return (
                  <div key={index} className="col-md-4 col-sm-6 mb-4">
                    <ProductCard product={product} />
                  </div>
                )
              }
            }
            else {
              return (
                <div key={index} className="col-md-4 col-sm-6 mb-4">
                  <ProductCard product={product} />
                </div>
              )
            }
          })}
        </div>
      </div>
        </>
    )
}

export default Home;