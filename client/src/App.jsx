import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [dataProduct, setDataproduct] = useState([]);

  const getDataproduct = async () => {
    const result = await axios.get("http://localhost:4001/products");
    console.log(result);
    setDataproduct(result.data.data);
  };

  useEffect(() => {
    getDataproduct();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    setDataproduct(dataProduct.filter((product) => product.id !== id));
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {dataProduct.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => deleteProduct(product.id)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
