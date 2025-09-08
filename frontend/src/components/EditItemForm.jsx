import React, { useState, useEffect } from "react";
import { items as itemsService } from "../services/api";

export default function EditItemForm({ itemId, onUpdated }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await itemsService.list();
        const item = res.find((i) => i._id === itemId);
        if (item) {
          setName(item.name);
          setPrice(item.price);
          setCategory(item.category);
          setImage(item.image);
        }
      } catch {
        alert("Failed to fetch item details");
      }
    }
    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await itemsService.update(itemId, {
        name,
        price: Number(price),
        category,
        image,
      });
      alert("Item updated!");
      if (onUpdated) onUpdated();
    } catch (err) {
      alert("Failed to update item");
    }
  };

  if (!itemId) return null;

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
      <button type="submit">Update Item</button>
    </form>
  );
}
