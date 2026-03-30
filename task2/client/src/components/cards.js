
function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.title}</h3>
      <p className="category">{product.category}</p>
      <p className="price">₹{product.price}</p>
      <p className="rating">{product.rating}</p>
    </div>
  );
}

export default ProductCard;