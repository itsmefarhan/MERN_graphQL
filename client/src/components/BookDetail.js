import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../queries/Queries";

const BookDetail = props => {
  const [loadBook, { called, loading, data }] = useLazyQuery(getBookQuery, {
    variables: { id: props.selected }
  });

  if (called && loading) return <p>Loading ...</p>;
  if (!called) {
    return loadBook();
  }
  const { book } = data;

  const displayBookDetails = () =>
    book && (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author</p>
        <ul className="other-books">
          {book.author.books.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetail;
