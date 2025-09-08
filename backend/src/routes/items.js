import express from "express";
import Item from "../models/Item.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create item
router.post("/", auth, async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error creating item" });
  }
});

// Get items with filters
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

// Update item
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating item" });
  }
});

// Delete item
router.delete("/:id", auth, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

export default router;
