import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../helper/response";
import Category from "../models/category.model";
import { createError } from "../helper/import";

// category create function

export const handleCreateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category_name, category_image } = req.body;
    const category = await Category.create({ category_name, category_image });
    if (!category) {
      return next(createError(400, "Category was not created"));
    }
    successResponse(res, {
      statusCode: 201,
      message: "Category was created",
      payload: category,
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

// category update function

export const handleUpdateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { category_name, category_image } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { category_name, category_image },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return next(createError(404, "Category not found"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Category updated successfully",
      payload: updatedCategory,
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

// category delete function

export const handleDeleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return next(createError(404, "Category not found"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

// category find function

export const handleGetAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();

    successResponse(res, {
      statusCode: 200,
      message: "Categories fetched successfully",
      payload: categories,
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

// single category find function

export const handleGetCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return next(createError(404, "Category not found"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Category fetched successfully",
      payload: category,
    });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};
