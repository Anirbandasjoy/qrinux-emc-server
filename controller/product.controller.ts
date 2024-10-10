import { NextFunction, Request, Response } from "express";
import Product from "../models/product.model";
import { successResponse } from "../helper/response";
import { createError } from "../helper/import";
import slugify from "slugify";

// create product function

export const handleCreateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      product_name,
      product_description,
      product_image,
      product_category,
      product_price,
      stoke,
      product_color,
      quantity,
      shipping,
      sold,
      product_review,
    } = req.body;

    const product = await Product.create({
      product_name,
      slug: slugify(product_name),
      product_description,
      product_image,
      product_category,
      product_price,
      stoke,
      product_color,
      quantity,
      shipping,
      sold,
      product_review,
    });
    if (!product) {
      return next(createError(400, "Product was not created"));
    }

    successResponse(res, {
      statusCode: 201,
      message: "Product created successfully",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

// find all product function

export const handleGetAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find().populate("product_category");

    successResponse(res, {
      statusCode: 200,
      message: "Products fetched successfully",
      payload: products,
    });
  } catch (error) {
    next(error);
  }
};

// find single product function

export const handleGetSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("product_category");

    if (!product) {
      return next(createError(404, "Product not found"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Product fetched successfully",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

//  delete product function

export const handleDeleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return next(createError(404, "Product not found"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// update product function

export const handleUpdateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const {
      product_name,
      slug,
      product_description,
      product_image,
      product_category,
      product_price,
      stoke,
      product_color,
      quantity,
      shipping,
      sold,
      product_review,
    } = req.body;

    const updatedSlug = product_name ? slugify(product_name) : slug;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        product_name,
        slug: updatedSlug,
        product_description,
        product_image,
        product_category,
        product_price,
        stoke,
        product_color,
        quantity,
        shipping,
        sold,
        product_review,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return next(createError(404, "Product not found"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Product updated successfully",
      payload: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
