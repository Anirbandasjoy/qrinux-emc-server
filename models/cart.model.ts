import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "product_id is required"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user_id is required"],
    },
  },

  { timestamps: true }
);

const Cart = model("Cart", cartSchema);

export default Cart;
