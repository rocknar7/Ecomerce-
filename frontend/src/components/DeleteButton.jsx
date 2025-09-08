import React from "react";
import { items as itemsService } from "../services/api";

export default function DeleteButton({ itemId, onDeleted }) {
  const handleDelete = async () => {
    if (window.confirm("Delete this item?")) {
      try {
        await itemsService.delete(itemId);
        alert("Item deleted!");
        if (onDeleted) onDeleted();
      } catch (err) {
        alert("Failed to delete item");
      }
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
