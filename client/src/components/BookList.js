import { useQuery } from "@apollo/client";
//import { graphql } from "graphql";
import { GET_BOOKS } from "../queries/queries";
import React, { useState } from "react";

const BookList = () => {
  const { loading, data } = useQuery(GET_BOOKS);
  const [selected, setSelected] = useState(null);
  //console.log({ loading, data });
  if (loading) return <div>Loading books...</div>;
  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => {
          return (
            <li
              key={book.id}
              onClick={(e) => {
                setSelected(book.id);
              }}
            >
              {book.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookList;
