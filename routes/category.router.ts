import { Router } from "express";
import {
  handleCreateCategory,
  handleDeleteCategory,
  handleGetAllCategories,
  handleGetCategoryById,
  handleUpdateCategory,
} from "../controller/category.controller";
import { isAdmin, isLogin } from "../middleware/auth";
import { validateParamsId } from "../validators/common";
import { runValidation } from "../validators";
import {
  validateCategoryCreation,
  validateCategoryUpdate,
} from "../validators/category";
const categoryRouter = Router();

categoryRouter.post(
  "/create",
  isLogin,
  isAdmin,
  validateCategoryCreation,
  runValidation,
  handleCreateCategory
);
categoryRouter.put(
  "/update/:id",
  isLogin,
  isAdmin,
  validateParamsId,
  validateCategoryUpdate,
  runValidation,
  handleUpdateCategory
);
categoryRouter.delete(
  "/delete/:id",
  isLogin,
  isAdmin,
  validateParamsId,
  runValidation,
  handleDeleteCategory
);
categoryRouter.get("/find", handleGetAllCategories);
categoryRouter.get("/single-find/:id", handleGetCategoryById);

export default categoryRouter;
