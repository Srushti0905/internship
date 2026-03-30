import React from "react";

function SuggestionsList({ results, onSelect }) {
  return (
    <ul className="suggestions">
      {results.map((item) => (
        <li
          key={item.id}
          onMouseDown={() => onSelect(item)} 
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
}

export default SuggestionsList;