import { NextFunction, Request, Response } from "express";
import Wishlist from "../models/wishlist.model";
import { createError } from "../helper/import";
import Product from "../models/product.model";
import { successResponse } from "../helper/response";

export const handleAddToWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id } = req.body;
    const user_id = req.user?._id;

    const existingWishlist = await Wishlist.findOne({ product_id, user_id });
    if (existingWishlist) {
      return next(createError(400, "Product is already in the wishlist"));
    }

    const productExists = await Product.findById(product_id);
    if (!productExists) {
      return next(createError(404, "Product not found"));
    }

    const newWishlist = await Wishlist.create({ product_id, user_id });
    successResponse(res, {
      statusCode: 201,
      message: "Product added to wishlist successfully",
      payload: newWishlist,
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

export const handleDeleteFromWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user_id = req.user?._id;

    const deletedWishlist = await Wishlist.findOneAndDelete({
      id,
      user_id,
    });

    if (!deletedWishlist) {
      return next(createError(404, "Product not found in wishlist"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Product removed from wishlist",
      payload: deletedWishlist,
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

export const handleGetAllWishlistItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user?._id;

    const wishlistItems = await Wishlist.find({ user_id }).populate(
      "product_id"
    );

    if (wishlistItems.length === 0) {
      return next(createError(404, "No products found in wishlist"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "All wishlist items retrieved successfully",
      payload: wishlistItems,
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};
