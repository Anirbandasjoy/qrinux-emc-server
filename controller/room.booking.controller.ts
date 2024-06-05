import { NextFunction, Request, Response } from "express";
import { createError, mongoose } from "../helper/import";
import { successResponse } from "../helper/response";
import Booking from "../models/booking.model";
import { findWithId } from "../services";
import Room from "../models/room.model";
export const handleBookingRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }
    if (req.user.role === "admin") {
      return next(createError(403, "Not Book form Admin"));
    }
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid room ID format"));
    }
    // Check if the user already has a booking for this room
    const existingBooking = await Booking.exists({ user: userId, room: id });
    if (existingBooking) {
      return next(createError(409, "User already Send Room Book Request"));
    }

    const bookingRequest = await Booking.create({ user: userId, room: id });

    successResponse(res, {
      message: "Booking request Submitted",
      payload: bookingRequest,
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindAllBookingRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingRequest = await Booking.find();
    successResponse(res, {
      message: "Returned all booking request",
      payload: bookingRequest,
    });
  } catch (error) {
    next(error);
  }
};

export const handleRoomBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const booking = await findWithId(id, Booking);
    const room = await findWithId(booking.room, Room);

    if (room.sitOne === null) {
      room.sitOne = booking.user;
    } else if (room.sitTwo === null) {
      room.sitTwo = booking.user;
    } else if (room.sitThree === null) {
      room.sitThree = booking.user;
    } else {
      return next(createError(400, "No available seat"));
    }
    booking.status = "success";
    await booking.save();
    await room.save();
    successResponse(res, {
      message: "Room booking successfully",
      payload: {
        booking,
        room,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const handleCencelRoomBookingRequest = (re)
