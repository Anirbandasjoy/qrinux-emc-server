import { Router } from "express";
import { isLogin } from "../middleware/auth";
import { validateOrder } from "../validators/order";
import { runValidation } from "../validators";
import { validateParamsId } from "../validators/common";
import {
  handleCancelOrder,
  handleCreateOrder,
} from "../controller/order.controller";
const orderRouter = Router();

orderRouter.post(
  "/create",
  isLogin,
  validateOrder,
  runValidation,
  handleCreateOrder
);

orderRouter.delete("/delete/:id", isLogin, validateParamsId, handleCancelOrder);

export default orderRouter;
