import axios from "axios";
import React, { useEffect, useState } from "react";
import "./QuoteList.css";

const QuoteList = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    axios.get("https://techplement-u9bt.onrender.com/api/quotes/today")
      .then(response => setQuote(response.data))
      .catch(error => console.error("Error fetching today's quote:", error));
  }, []);

  return (
    <div>
      {quote ? (
        <p className="quote-container">"{quote.content}" - {quote.author}</p>
      ) : (
        <p className="quote-container">"No quote available for today."</p>
      )}
    </div>
  );
};

export default QuoteList;
