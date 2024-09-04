/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../errors/AppError";
import { Slot } from "../slot/slot.model";
import { JwtPayload } from "jsonwebtoken";
import { Service } from "../service/service.model";
import { User } from "../user/user.model";
import { initiatePayment } from "../payment/payment.utilis";


const createBooking = async (payload: TBooking, userId: JwtPayload) => {
  // Validate the service exists
  const service = await Service.findById(payload.service);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  // Validate the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Validate the slot exists
  const slot = await Slot.findById(payload.slot);
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }

  // Ensure the slot is available
  if (slot.isBooked !== "available") {
    throw new AppError(httpStatus.BAD_REQUEST, "Slot is already booked");
  }

  // Create the booking
  const bookingPayload = { ...payload, customer: userId };
  const booking = await Booking.create(bookingPayload);

  const transactionId = `TXN-${Date.now()}`;

  const paymentData = {
    transactionId,
    totalPrice: service.price, // Assuming the service price is the total price
    customerName: user.name,
    customerEmail: user.email,
    customerPhone: user.phone,
    customerAddress: user.address,
  };

  //! Payment
  const paymentSession = await initiatePayment(paymentData);
  // console.log(paymentSession);

  // Update slot status to booked
  slot.isBooked = "booked";
  await slot.save();

  // Populate related fields
  const populatedBooking = await booking.populate([
    {
      path: "customer",
      select: "_id name email phone address",
    },
    {
      path: "service",
      select: "_id name description image price duration isDeleted",
    },
    {
      path: "slot",
      select: "_id service date startTime endTime isBooked",
    },
  ]);

  return { populatedBooking, paymentSession };
};


const getAllBookings = async () => {
  const bookings = await Booking.find()
    .populate("customer service slot");

  return bookings;
};

const getUserBookings = async (userId: JwtPayload) => {
  const bookings = await Booking.find({ customer: userId })
    .select("-customer")
    .populate({
      path: "service",
      select: "_id name description price duration isDeleted",
    })
    .populate({
      path: "slot",
      select: "_id service date startTime endTime isBooked",
    });
  // .lean();

  return bookings;
};


export const BookingService = {
  createBooking,
  getAllBookings,
  getUserBookings
};
