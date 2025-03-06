import axios from "axios";
import React, { useState } from "react";
import "./AddQuote.css";

const AddQuote = () => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://techplement-u9bt.onrender.com/api/quotes", { content, author });
      setContent("");
      setAuthor("");
      alert("Quote added successfully!");
    } catch (error) {
      console.error("Error adding quote:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Quote</h2>
      <input
        type="text"
        placeholder="Enter Quote"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <button type="submit">Add Quote</button>
    </form>
  );
};

export default AddQuote;
