import React, { useState } from "react";
import { items as itemsService } from "../services/api";

export default function AddItemForm({ onAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await itemsService.add({ name, price: Number(price), category, image });
      alert("Item added!");
      setName("");
      setPrice("");
      setCategory("");
      setImage("");
      if (onAdded) onAdded();
    } catch (err) {
      alert("Failed to add item");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        required
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
