import { useEffect, useState } from "react";
import ProductCard from "./components/cards";

function Saved() {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    const updateSaved = () => {
      const data = JSON.parse(localStorage.getItem("savedProducts")) || [];
      setSavedProducts(data);
    };

    updateSaved();

    window.addEventListener("savedUpdated", updateSaved);
    return () => window.removeEventListener("savedUpdated", updateSaved);

   
  }, []);

  return (
    <div className="main">
      <h1>Saved Products</h1>

      {savedProducts.length === 0 ? (
        <p>No saved products</p>
      ) : (
        <div className="grid">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Saved;