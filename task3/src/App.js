import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SuggestionsList from "./components/Suggestions";
import Loader from "./components/loader";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${debouncedQuery}`
        );
        const data = await res.json();
        const filtered = (data.products || []).filter((item) =>
          item.title.toLowerCase().startsWith(debouncedQuery.toLowerCase())
        );   
        setResults(filtered);
         } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="container">
      <h2>Live Search</h2>

      <SearchBar query={query} setQuery={setQuery} />

      {loading && <Loader />}

    {!loading && results.length > 0 && (
        <SuggestionsList
          results={results}
          onSelect={(item) => {
            console.log("Selected:", item); 
            setSelected(item);

           
            setQuery(item.title); 
          }}
        />
      )}

      {/* No Results */}
      {!loading && query && results.length === 0 && (
        <p className="no-results">No results found</p>
      )}

      {selected && (
        <div className="details">
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <p><b>Price:</b> ${selected.price}</p>
          <p><b>Brand:</b> {selected.brand}</p>
          <img src={selected.thumbnail} alt={selected.title} />
        </div>
      )}
    </div>
  );
}

export default App;