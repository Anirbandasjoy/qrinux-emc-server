import { Router } from "express";
import {
  handleAddToWishlist,
  handleDeleteFromWishlist,
  handleGetAllWishlistItems,
} from "../controller/wishlist.controller";
import { isLogin } from "../middleware/auth";
import { validateWishlist } from "../validators/wishlist";
import { runValidation } from "../validators";
import { validateParamsId } from "../validators/common";

const wishlistRouter = Router();

wishlistRouter.post(
  "/create",
  isLogin,
  validateWishlist,
  runValidation,
  handleAddToWishlist
);
wishlistRouter.delete(
  "/delete/:id",
  isLogin,
  validateParamsId,
  runValidation,
  handleDeleteFromWishlist
);
wishlistRouter.get("/find", isLogin, handleGetAllWishlistItems);

export default wishlistRouter;
