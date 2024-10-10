import { body } from "express-validator";

const validateCategoryCreation = [
  body("category_name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Category name must be between 3 and 50 characters long"),

  body("category_image")
    .optional()
    .isURL()
    .withMessage("Category image must be a valid URL if provided"),
];

const validateCategoryUpdate = [
  body("category_name")
    .trim()
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Category name must be between 3 and 50 characters long"),

  body("category_image")
    .optional()
    .isURL()
    .withMessage("Category image must be a valid URL if provided"),
];

export { validateCategoryCreation, validateCategoryUpdate };
