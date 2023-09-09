import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Display = () => {
  const [fdc, chfdc] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({ title: "", fd: "" });

  useEffect(() => {
    fetch("http://localhost:3000/food")
      .then((res) => res.json())
      .then((resp) => {
        chfdc(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleDelete = (id) => {
    // Send a DELETE request to your API endpoint to delete the item
    fetch(`http://localhost:3000/food/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          // If the request is successful, update the UI by removing the deleted item
          chfdc(fdc.filter((item) => item.id !== id));
        } else {
          console.error("Failed to delete item");
        }
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };
  
  const handleEdit = (id) => {
    // Find the item to edit by its id
    const itemToEdit = fdc.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingItemId(id);
      setEditedItem({ title: itemToEdit.title, fd: itemToEdit.fd });
    }
  };

  const handleUpdate = () => {
    // Send a PUT request to your API endpoint to update the item
    fetch(`http://localhost:3000/food/${editingItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedItem),
    })
      .then((res) => {
        if (res.ok) {
          // If the request is successful, update the UI by replacing the old item with the edited item
          chfdc((prevFdc) =>
            prevFdc.map((item) =>
              item.id === editingItemId ? { ...item, ...editedItem } : item
            )
          );
          setEditingItemId(null);
          setEditedItem({ title: "", fd: "" });
        } else {
          console.error("Failed to update item");
        }
      })
      .catch((err) => {
        console.error("Error updating item:", err);
      });
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedItem({ title: "", fd: "" });
  };

  return (
    <div className="card-container">
      <h1>Find What to Cook Today</h1>
      {fdc.map((item) => (
        <div key={item.id} className="card">
          {editingItemId === item.id ? (
            <div>
              <input
                type="text"
                value={editedItem.title}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, title: e.target.value })
                }
              />
              <textarea
                value={editedItem.fd}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, fd: e.target.value })
                }
              />
              <div className="card-buttons">
                <button className="btn btn-success" onClick={handleUpdate}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="recipe-box">
              <h2 className="card-title">{item.title}</h2>
              <p className="card-content">{item.fd}</p>
              <div className="card-buttons">
                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <Link to={'/add'} className="btn btn-success">Add your recipe</Link>
    </div>
  );
};

export default Display;
