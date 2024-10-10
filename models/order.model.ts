import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    product_ids: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      required: true,
      validate: {
        validator: (v: String[]) => {
          return v.length > 0;
        },
        message: "At least one product_id is required",
      },
    },
    total_price: {
      type: Number,
      required: [true, "total_price is required"],
    },
    user_id: {
      type: Schema,
      ref: "User",
      required: [true, "user_id is required"],
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
