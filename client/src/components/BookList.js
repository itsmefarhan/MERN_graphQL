import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries/Queries";
import BookDetail from "./BookDetail";

const BookList = () => {
  const { loading, data } = useQuery(getBooksQuery);

  const [selected, setSelected] = useState(null);

  const displayBooks = () => {
    if (loading) {
      return <div>Loading Books...</div>;
    }
    return (
      data &&
      data.books.map(book => (
        <li key={book.id} onClick={e => setSelected(book.id)}>
          {book.name}
        </li>
      ))
    );
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetail selected={selected} />
    </div>
  );
};

export default BookList;
