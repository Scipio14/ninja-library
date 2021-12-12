import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../queries/queries";

const AddBook = () => {
  const { loading, data } = useQuery(GET_AUTHORS);
  // eslint-disable-next-line
  const [bookName, setBookName] = useState("");
  // eslint-disable-next-line
  const [bookGenre, setBookGenre] = useState("");
  // eslint-disable-next-line
  const [bookAuthorId, setBookAuthorId] = useState("");
  const [addBook] = useMutation(ADD_BOOK, {
    variables: {
      name: bookName,
      genre: bookGenre,
      authorId: bookAuthorId,
    },
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const submitForm = (e) => {
    e.preventDefault();
    console.log({ bookName, bookGenre, bookAuthorId });
    addBook();
    document.location.reload();
  };

  return (
    <div>
      <form id="add-book" onSubmit={submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(e) => setBookName(e.target.value)} />
        </div>
        <div className="field">
          <label>Genre</label>
          <input type="text" onChange={(e) => setBookGenre(e.target.value)} />
        </div>
        <div className="field">
          <label>Author</label>
          <select onChange={(e) => setBookAuthorId(e.target.value)}>
            <option>Select author...</option>
            {loading ? (
              <option>Loading Authors</option>
            ) : (
              data.authors.map((author) => {
                return (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                );
              })
            )}
          </select>
        </div>
        <button>+</button>
      </form>
    </div>
  );
};

export default AddBook;
