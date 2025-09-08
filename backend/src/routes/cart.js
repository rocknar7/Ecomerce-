import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Add to cart
router.post("/add", auth, async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    const user = await User.findById(req.user);
    const existing = user.cart.find(c => c.item.toString() === itemId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({ item: itemId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// Remove from cart
router.post("/remove", auth, async (req, res) => {
  const { itemId } = req.body;
  try {
    const user = await User.findById(req.user);
    user.cart = user.cart.filter(c => c.item.toString() !== itemId);
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Error removing from cart" });
  }
});

// Get cart
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate("cart.item");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

export default router;
