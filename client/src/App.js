import React from "react";
import "./App.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Book Ready List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
