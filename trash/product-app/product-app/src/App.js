import React, { useState, useEffect, useMemo } from 'react';

const ProductListApp = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and Sort State
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Using Fake Store API for demonstration
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Logic: Filter and Sort combined
  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by Search
    if (searchTerm) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by Category
    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    // 3. Sort by Price
    result.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    return result;
  }, [products, searchTerm, category, sortOrder]);

  if (loading) return <div className="p-8 text-center">Loading amazing products...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-8">Product Catalog</h1>

      {/* Controls Section */}
      <div className="flex flex-wrap gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded flex-1 min-w-[200px]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select className="border p-2 rounded" onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {[...new Set(products.map(p => p.category))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select className="border p-2 rounded" onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedProducts.map((product) => (
          <div key={product.id} className="border rounded-xl p-4 hover:shadow-lg transition-shadow bg-white">
            <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4" />
            <span className="text-xs font-semibold uppercase text-gray-400">{product.category}</span>
            <h2 className="text-lg font-bold line-clamp-1 mt-1">{product.title}</h2>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-blue-600">${product.price}</span>
              <span className="text-sm bg-yellow-100 px-2 py-1 rounded">⭐ {product.rating?.rate}</span>
            </div>
          </div>
        ))}
      </div>
      
      {processedProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products match your search.</p>
      )}
    </div>
  );
};

export default ProductListApp;