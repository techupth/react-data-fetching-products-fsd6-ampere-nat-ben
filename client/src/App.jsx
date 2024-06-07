import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const initFetch = async () => {
    const response = await axios.get("http://localhost:4001/products");
    const products = response.data.data;
    // console.log(products);
    // console.log(products[0].description);
    setSearchResult(products);
  };

  const handleProductDelete = async (indexToDelete) => {
    console.log(indexToDelete);

    const request = await axios.delete(
      `http://localhost:4001/products/${indexToDelete}`
    );
    console.log(request);
  };

  useEffect(() => {
    initFetch();
  }, [searchResult]);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {searchResult.map((product, index) => {
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
                onClick={() => handleProductDelete(product.id)}
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
