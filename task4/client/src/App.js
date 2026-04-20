import React, { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/cards";
import Sidebar from "./components/filter";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Saved from "./Saved";

function App() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [count, setCount] = useState(0);

  // Fetch products
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

  // Infinite scroll
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

  useEffect(() => {
    const updateCount = () => {
      const data = JSON.parse(localStorage.getItem("savedProducts")) || [];
      setCount(data.length);
    };

    updateCount();

    window.addEventListener("savedUpdated", updateCount);

    return () => window.removeEventListener("savedUpdated", updateCount);
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
  .filter((p) =>
    p.title.toLowerCase().startsWith(search.toLowerCase())
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
    <BrowserRouter>
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

          {/* Top Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>Product List</h1>

            <Link to="/saved">
              Cart ({count})
            </Link>
          </div>

          <Routes>

            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <div className="grid">
                    {filteredProducts.slice(0, visibleCount).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {visibleCount < filteredProducts.length && (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                      Loading more products...
                    </p>
                  )}
                </>
              }
            />

            <Route path="/saved" element={<Saved />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;