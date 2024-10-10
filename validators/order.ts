import { body } from "express-validator";

export const validateOrder = [
  body("product_ids")
    .isArray({ min: 1 })
    .withMessage("At least one product_id is required")
    .custom((value) => {
      // Validate that all items in the array are valid MongoDB ObjectIds
      if (!value.every((id: string) => /^[a-fA-F0-9]{24}$/.test(id))) {
        throw new Error("Each product_id must be a valid MongoDB ID");
      }
      return true;
    }),
  body("total_price")
    .notEmpty()
    .withMessage("Total price is required")
    .isFloat({ gt: 0 })
    .withMessage("Total price must be a positive number"),

  body("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ID"),
];
