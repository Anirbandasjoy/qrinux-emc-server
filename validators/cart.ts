import { body } from "express-validator";

export const validateAddToCart = [
  body("product_id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("id must be a valid MongoDB ID"),

  body("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("id must be a valid MongoDB ID"),
];
