import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  email: { type: String, required: true },
});

const Admin = model("admins", adminSchema);

export default Admin;
