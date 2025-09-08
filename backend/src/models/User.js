import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  cart: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const User = mongoose.model("User", UserSchema);
export default User;
