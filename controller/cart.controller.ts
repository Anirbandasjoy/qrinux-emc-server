import { NextFunction, Request, Response } from "express";
import Cart from "../models/cart.model";
import { createError } from "../helper/import";
import { successResponse } from "../helper/response";

export const handleAddToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id } = req.body;
    const existingCart = await Cart.findOne({
      product_id,
      user_id: req.user?._id,
    });
    if (existingCart) {
      return next(createError(400, "Product already in the cart"));
    }
    const newAddToCart = await Cart.create({
      product_id,
      user_id: req.user?._id,
    });
    successResponse(res, {
      statusCode: 201,
      message: "Product AddToCart",
      payload: newAddToCart,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetAllCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user?._id;
    const cartItems = await Cart.find({ user_id }).populate("product_id");

    if (!cartItems.length) {
      return next(createError(404, "No items found in cart"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Cart items retrieved successfully",
      payload: cartItems,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetSingleCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id } = req.params;
    const user_id = req.user?._id;

    const cartItem = await Cart.findOne({ product_id, user_id }).populate(
      "product_id"
    );

    if (!cartItem) {
      return next(createError(404, "Cart item not found"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Cart item retrieved successfully",
      payload: cartItem,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id } = req.params;
    const user_id = req.user?._id;

    const deletedCart = await Cart.findOneAndDelete({ product_id, user_id });

    if (!deletedCart) {
      return next(createError(404, "Cart item not found"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Product removed from cart",
      payload: deletedCart,
    });
  } catch (error) {
    next(error);
  }
};
