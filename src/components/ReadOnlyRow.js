import React from "react";

const ReadOnlyRow = ({ book, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{book.bookName}</td>
      <td>{book.author}</td>
      <td>{book.registrationId}</td>
      <td>{book.price}</td>
      <td>
        <button
          type="button"
          className="btn btn_primary"
          onClick={(event) => handleEditClick(event, book)}
        >
          Edit
        </button>
        <button
          className="btn btn_secondary"
          type="button"
          onClick={() => handleDeleteClick(book.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
