import { Request, Response, NextFunction } from "express";
import { createError } from "../helper/import";
import { successResponse } from "../helper/response";
import Order from "../models/order.model";
import Product from "../models/product.model";

export const handleCreateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_ids, total_price } = req.body;
    const user_id = req.user?._id;

    for (const productId of product_ids) {
      const product = await Product.findById(productId);
      if (!product) {
        return next(createError(404, `Product with ID ${productId} not found`));
      }

      if (product.stoke <= 0) {
        return next(
          createError(400, `Product ${product.product_name} is out of stock`)
        );
      }
      product.stoke -= 1;
      product.sold += 1;
      await product.save();
    }
    const newOrder = new Order({
      product_ids,
      total_price,
      user_id,
    });

    await newOrder.save();

    successResponse(res, {
      statusCode: 201,
      message: "Order Created Successfully",
      payload: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const handleCancelOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return next(createError(404, "Order not found"));
    }

    if (order.user_id.toString() !== req.user?._id.toString()) {
      return next(
        createError(403, "You are not authorized to cancel this order")
      );
    }

    for (const productId of order.product_ids) {
      const product = await Product.findById(productId);
      if (product) {
        product.stoke += 1;

        product.sold = Math.max(product.sold - 1, 0);

        await product.save();
      }
    }

    await order.deleteOne();

    successResponse(res, {
      message: "Order was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
