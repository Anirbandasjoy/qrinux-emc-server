import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: [true, "category_name is required"],
    },
    category_image: {
      type: String,
      required: [true, "category_image is required"],
    },
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

export default Category;
