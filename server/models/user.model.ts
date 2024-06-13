import { Schema, model } from "mongoose";

const userSchema = new Schema({
  clerkId: { type: String, required: true },
  shoppingList: { type: [String], default: [""] },
});

const User = model("users", userSchema);

export default User;
