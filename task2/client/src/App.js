import React, { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/cards"; // your cards.js
import Sidebar from "./components/filter"; // your filter.js

function App() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching data");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        setVisibleCount((prev) => prev + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setVisibleCount(20);
  }, [search, category, sortOrder]);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      category === "all" ? true : p.category === category
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  if (loading) return <h2 className="center">Loading products...</h2>;
  if (error) return <h2 className="center">{error}</h2>;

  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        categories={categories}
      />

      {/* Main Content */}
      <div className="main">
        <h1>Product List</h1>

        <div className="grid">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Optional loading text */}
        {visibleCount < filteredProducts.length && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Loading more products...
          </p>
        )}
      </div>
    </div>
  );
}

export default App;