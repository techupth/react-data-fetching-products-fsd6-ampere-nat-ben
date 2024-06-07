import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Components/Product";
import "./App.css";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const delay = (delayInMs) => {
    return new Promise((resolve) => setTimeout(resolve, delayInMs));
  };

  const initFetch = async () => {
    try {
      setIsLoading(true);
      let delayRes = await delay(300);
      const response = await axios.get("http://localhost:4001/products");
      const products = response.data.data;
      // console.log("products ", products);
      // console.log(products[0].description);
      setSearchResult(products);
      setIsLoading(false);
      setIsComplete(true);
      setTimeout(() => {
        setIsComplete(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setIsError(true);
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
      setIsError(true);
    }
  };

  const displayFetchingStatus = () => {
    if (isError) {
      return "Fetching Error...";
    } else if (isLoading) {
      return "Loading...";
    } else if (isComplete) {
      return "Complete";
    } else {
      return <br />;
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
        {displayFetchingStatus()}
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
