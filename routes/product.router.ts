import { Router } from "express";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetAllProducts,
  handleGetSingleProduct,
  handleUpdateProduct,
} from "../controller/product.controller";
import { isAdmin, isLogin } from "../middleware/auth";
import { validateParamsId } from "../validators/common";
import { runValidation } from "../validators";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../validators/product";

const productRouter = Router();

productRouter.post(
  "/create",
  isLogin,
  isAdmin,
  validateCreateProduct,
  runValidation,
  handleCreateProduct
);
productRouter.get("/find", handleGetAllProducts);
productRouter.get("/find-single/:id", isLogin, handleGetSingleProduct);
productRouter.put(
  "/update/:id",
  isLogin,
  isAdmin,
  validateParamsId,
  validateUpdateProduct,
  runValidation,
  handleUpdateProduct
);
productRouter.delete(
  "/delete/:id",
  isLogin,
  isAdmin,
  validateParamsId,
  runValidation,
  handleDeleteProduct
);

export default productRouter;
