import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    console.log("Making request to server...");
    fetch("http://localhost:3001/listings")
      .then((res) => {
        console.log("Received response from server", res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data fetched successfully:", data);
        setListings(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("Render listings:", listings);

  return (
    <div className="App">
      <h1>Listings</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Summary</th>
            {/* Add other table headers here */}
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing._id}>
              <td>{listing.name}</td>
              <td>{listing.summary}</td>
              {/* Render other listing properties here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
