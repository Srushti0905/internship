
function Sidebar({
    search,
    setSearch,
    category,
    setCategory,
    sortOrder,
    setSortOrder,
    categories,
  }) {
    return (
      <div className="sidebar">
        <h2>Filters</h2>
  
        <input
          type="text"
          placeholder="Search product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
  
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
  
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Price Low → High</option>
          <option value="desc">Price High → Low</option>
        </select>
      </div>
    );
  }
  
  export default Sidebar;