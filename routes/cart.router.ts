import { Router } from "express";
import {
  handleAddToCart,
  handleDeleteFromCart,
  handleGetAllCartItems,
} from "../controller/cart.controller";
import { isLogin } from "../middleware/auth";
import { validateParamsId } from "../validators/common";
import { runValidation } from "../validators";
import { validateAddToCart } from "../validators/cart";

const cartRouter = Router();

cartRouter.get("/find", isLogin, handleGetAllCartItems);
cartRouter.delete(
  "/delete/:id",
  isLogin,
  validateParamsId,
  runValidation,
  handleDeleteFromCart
);
cartRouter.post(
  "/create",
  isLogin,
  validateAddToCart,
  runValidation,
  handleAddToCart
);
