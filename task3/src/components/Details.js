import React from "react";

function Details({ item }) {
  return (
    <div className="details">
      <h3>
        {item.firstName} {item.lastName}
      </h3>
      <p>{item.email}</p>
      <p>{ item.phone}</p>
      <p>{item.address.city}</p>

      </div>

  );
}
export default Details