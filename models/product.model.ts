import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: [true, "product_name is required"],
      trim: true,
      unique: true,
      minlength: [3, "The length of Product can be minimam 3 char"],
      maxlength: [150, "The length of Product can be maximam 150 char"],
    },
    slug: {
      type: String,
      required: [true, "Product is required , please filup name"],
      lowercase: true,
      unique: true,
    },
    product_description: {
      type: String,
      trim: true,
      required: [true, "product_description is required"],
      minlength: [3, "The length of Product can be Description 3 char"],
    },
    product_image: {
      type: String,
      required: [true, "product_image is required"],
    },
    product_category: {
      type: Schema.Types.ObjectId,
      required: [true, "product_category is required"],
      ref: "Category",
    },
    product_price: {
      type: Number,
      required: [true, "product_price is required"],
    },
    stoke: {
      type: Number,
      required: [true, "stoke is required"],
    },
    product_color: {
      type: [String],
      required: true,
      validate: {
        validator: (v: String[]) => {
          return v.length > 0;
        },
        message: "At least one product color is required",
      },
    },

    quantity: {
      type: Number,
      trim: true,
      required: [true, "Product quantity is required , please filup name"],
      validate: {
        validator: (v: any) => v > 0,
        message: (props) =>
          `${props} not a valid quantity ! quantity must be grater then 0`,
      },
    },
    shipping: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      trim: true,
      default: 0,
      required: [true, "Sold quantity is required , please filup name"],
    },
    product_review: {
      type: Schema.Types.ObjectId,
      required: [true, "product_review is required"],
      ref: "Review",
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
