import React from "react";
import AddQuote from "./components/AddQuote/AddQuote";
import QuoteList from "./components/QuoteList/QuoteList";
import SearchQuotes from "./components/SearchQuotes/SearchQuotes";

const App = () => {
  return (
    <div>
      <AddQuote />
      <QuoteList />
      <SearchQuotes />
    </div>
  );
};

export default App;
