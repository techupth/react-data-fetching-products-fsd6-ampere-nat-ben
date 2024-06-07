function Product(props) {
  const product = props.product;
  const handleProductDelete = props.handleProductDelete;
  return (
    <div className="product">
      <div className="product-preview">
        <img src={product.image} alt="some product" width="350" height="350" />
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
}
export default Product;
