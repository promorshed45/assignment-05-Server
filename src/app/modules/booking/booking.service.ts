import httpStatus from "http-status";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../errors/AppError";
import { Slot } from "../slot/slot.model";


const createBookServiceIntoDB = async (bookingData: Partial<TBooking>, userId: string) => {
  // Check if slot is available
  const slot = await Slot.findById(bookingData.slot);
  if (!slot || slot.isBooked !== "available") {
    throw new AppError(httpStatus.BAD_REQUEST, "Slot is not available");
  }


  // Create booking
  const newBooking = await Booking.create({
    ...bookingData,
    customer: userId,
  });


  // Update slot status to booked
  slot.isBooked = "booked";
  await slot.save();

  return newBooking.populate("customer service slot");
};

const getAllBookings = async () => {
  const bookings = await Booking.find()
    .populate("customer service slot");

  return bookings;
};

const getUserBookings = async (userId: string) => {
  const bookings = await Booking.find({ customer: userId })
  .populate('service slot').exec();

  // Map through bookings to extract relevant data
  const mapBookings = bookings.map(booking => {
    const { customer, ...bookingData } = booking.toObject();
    return bookingData;
  });
 return {
      bookings: mapBookings
    };
};


export const BookingService = {
  createBookServiceIntoDB,
  getAllBookings,
  getUserBookings
};
