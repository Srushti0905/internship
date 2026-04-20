
import { useState, useEffect } from "react";
import {
  saveProduct,
  removeProduct,
  isProductSaved,
} from "../bm";


// function ProductCard({ product }) {
//   return (
//     <div className="card">
//       <h3>{product.title}</h3>
//       <p className="category">{product.category}</p>
//       <p className="price">₹{product.price}</p>
//       <p className="rating">{product.rating}</p>
//     </div>
//   );
// }

function ProductCard({ product }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isProductSaved(product.id));
  }, [product.id]);

  const handleSave = () => {
    if (saved) {
      removeProduct(product.id);
      setSaved(false);
    } else {
      saveProduct(product);
      setSaved(true);
    }
  
    window.dispatchEvent(new Event("savedUpdated"));  };

  return (
    <div className="card">
      <h3>{product.title}</h3>
      <p className="category">{product.category}</p>
      <p className="price">₹{product.price}</p>
      <p className="rating">{product.rating}</p>

      <button onClick={handleSave}>
        {saved ? " Added to Cart" : " Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;

