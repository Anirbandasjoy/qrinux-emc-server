import { body } from "express-validator";
import Product from "../models/product.model";

export const validateCreateProduct = [
  body("product_name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Product name should be between 3 and 50 characters")
    .custom(async (value) => {
      const product = await Product.findOne({ product_name: value });
      if (product) {
        throw new Error("Product name must be unique");
      }
      return true;
    }),

  body("product_description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 10 })
    .withMessage("Product description should be at least 10 characters long"),

  body("product_image")
    .trim()
    .notEmpty()
    .withMessage("Product image is required"),

  body("product_category")
    .trim()
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("id must be a valid MongoDB ID"),

  body("product_price")
    .isFloat({ min: 0 })
    .withMessage("Product price must be a positive number"),

  body("stoke")
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),

  body("product_color").trim().optional(),

  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive integer"),

  body("shipping").isBoolean().withMessage("Shipping must be true or false"),

  body("sold").isInt({ min: 0 }).withMessage("Sold count must be a number"),

  body("product_review")
    .trim()
    .optional()
    .isMongoId()
    .withMessage("id must be a valid MongoDB ID"),
];

// product update validate

export const validateUpdateProduct = [
  body("product_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Product name should be between 3 and 50 characters"),

  body("product_description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 10 })
    .withMessage("Product description should be at least 10 characters long"),

  body("product_image")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product image is required"),

  body("product_category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("id must be a valid MongoDB ID"),

  body("product_price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Product price must be a positive number"),

  body("stoke")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),

  body("product_color").optional().trim(),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive integer"),

  body("shipping")
    .optional()
    .isBoolean()
    .withMessage("Shipping must be true or false"),

  body("sold")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Sold count must be a number"),

  body("product_review")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("id must be a valid MongoDB ID"),
];
