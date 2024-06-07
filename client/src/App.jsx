import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Components/Product";
import "./App.css";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [status, setStatus] = useState("");

  const delay = (delayInMs) => {
    return new Promise((resolve) => setTimeout(resolve, delayInMs));
  };

  const initFetch = async () => {
    try {
      setStatus("Loading...");
      let delayRes = await delay(300);
      const response = await axios.get("http://localhost:4001/products");
      const products = response.data.data;
      // console.log("products ", products);
      // console.log(products[0].description);
      setSearchResult(products);
      setStatus("Completed");
      setTimeout(() => {
        setStatus(<br />);
      }, 500);
    } catch (error) {
      console.log(error);
      setStatus("Fetching error...");
    }
  };

  const handleProductDelete = async (indexToDelete) => {
    // console.log("indexToDelete ", indexToDelete);

    const requestToDelete = await axios.delete(
      `http://localhost:4001/products/${indexToDelete}`
    );
    // console.log("request to delete ", requestToDelete);
    // console.log("request status ", requestToDelete.status);
    const httpStatusCodes = requestToDelete.status;
    if (httpStatusCodes === 200) {
      initFetch();
    } else {
      console.log("something happened...");
      setStatus("Fetching error...");
    }
  };

  useEffect(() => {
    initFetch();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {status}
        {searchResult.map((product, index) => (
          <Product
            key={product.id}
            product={product}
            index={index}
            handleProductDelete={handleProductDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
