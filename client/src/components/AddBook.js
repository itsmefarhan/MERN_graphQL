import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/Queries";

const AddBook = () => {
  const { loading, data } = useQuery(getAuthorsQuery);

  const [addBook] = useMutation(addBookMutation);

  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    authorId: ""
  });

  const { name, genre, authorId } = formData;

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading Authors...</option>;
    }
    return (
      data &&
      data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    );
  };

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="">Book Name</label>
        <input type="text" name="name" value={name} onChange={handleChange} />
      </div>
      <div className="field">
        <label htmlFor="">Genre</label>
        <input type="text" name="genre" value={genre} onChange={handleChange} />
      </div>
      <div className="field">
        <label htmlFor="">Author</label>
        <select name="authorId" onChange={handleChange}>
          <option value="">Select Author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
