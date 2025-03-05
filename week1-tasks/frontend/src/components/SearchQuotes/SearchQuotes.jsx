import axios from "axios";
import React, { useState } from "react";
import "./SearchQuotes.css";

const SearchQuote = () => {
  const [author, setAuthor] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/quotes/search?author=${author}`
      );
      setQuotes(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching quotes:", error);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Quotes by Author</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul className="quote-list">
        {showResults &&
          quotes.map((quote) => (
            <li key={quote._id} className="quote-item">
              "{quote.content}" - {quote.author}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchQuote;