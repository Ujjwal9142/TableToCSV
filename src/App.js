import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { CSVLink } from "react-csv";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [books, setBooks] = useState(data);
  const [addFormData, setAddFormData] = useState({
    bookName: "",
    author: "",
    registrationId: "",
    price: "",
  });

  const [editFormData, setEditFormData] = useState({
    bookName: "",
    author: "",
    registrationId: "",
    price: "",
  });

  const [editBookId, setEditBookId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newBook = {
      id: nanoid(),
      bookName: addFormData.bookName,
      author: addFormData.author,
      registrationId: addFormData.registrationId,
      price: addFormData.price,
    };

    const newBooks = [...books, newBook];
    setBooks(newBooks);
    document.getElementById("add-book-form").reset();
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedBook = {
      id: editBookId,
      bookName: editFormData.bookName,
      author: editFormData.author,
      registrationId: editFormData.registrationId,
      price: editFormData.price,
    };

    const newBooks = [...books];

    const index = books.findIndex((book) => book.id === editBookId);

    newBooks[index] = editedBook;

    setBooks(newBooks);
    setEditBookId(null);
  };

  const handleEditClick = (event, book) => {
    event.preventDefault();
    setEditBookId(book.id);

    const formValues = {
      bookName: book.bookName,
      author: book.author,
      registrationId: book.registrationId,
      price: book.price,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditBookId(null);
  };

  const handleDeleteClick = (bookId) => {
    const newBooks = [...books];

    const index = books.findIndex((book) => book.id === bookId);

    newBooks.splice(index, 1);

    setBooks(newBooks);
  };

  return (
    <div className="app-container">
      <h1 className="header_main">Table to CSV</h1>

      <form onSubmit={handleEditFormSubmit}>
        {books.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author</th>
                <th>Registration ID</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <Fragment>
                  {editBookId === book.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      book={book}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="no_display">
            No books to display. Please add more Books!
          </h2>
        )}
      </form>
      <h2 className="header_add">Add a Book</h2>
      <form
        onSubmit={handleAddFormSubmit}
        id="add-book-form"
        className="addBook_form"
      >
        <input
          type="text"
          name="bookName"
          required="required"
          placeholder="Enter book name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="author"
          required="required"
          placeholder="Enter author name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="registrationId"
          required="required"
          placeholder="Enter Registration Id..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="price"
          required="required"
          placeholder="Enter price(in INR)..."
          onChange={handleAddFormChange}
        />
        <button type="submit" className="btn_danger">
          Add Book
        </button>
      </form>
      <CSVLink data={books} filename={"books.csv"} className="btn_download">
        Generate CSV
      </CSVLink>
    </div>
  );
};

export default App;
