import { Schema, model } from "mongoose";

const productSchema = new Schema({
  img: { type: String },
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imgName: { type: String, required: true },
});

const Product = model("products", productSchema);

export default Product;
