import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="bookName"
          required="required"
          placeholder="Enter book name..."
          value={editFormData.bookName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="author"
          required="required"
          placeholder="Enter author name..."
          value={editFormData.author}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="registrationId"
          required="required"
          placeholder="Enter Registration Id..."
          value={editFormData.registrationId}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          name="price"
          required="required"
          placeholder="Enter price(in INR)..."
          value={editFormData.price}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit" className="btn btn_primary">
          Save
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          className="btn btn_secondary"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
