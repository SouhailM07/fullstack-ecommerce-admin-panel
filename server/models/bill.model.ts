import { Schema, model } from "mongoose";

const billSchema = new Schema(
  {
    userId: { type: String, required: true },
    // using this because it's still the same even after updating or deleting the product
    shoppingListDataExact: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const Bill = model("bills", billSchema);

export default Bill;
