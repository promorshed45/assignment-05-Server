import catchAsync from '../../utils/catechAsync';
import { BookingService } from './booking.service';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Service } from '../service/service.model';
import { Slot } from '../slot/slot.model';
import sendResponse from '../../utils/sendResponse';

const createBooking = catchAsync(async (req, res) => {

  const { serviceId, slotId } = req.body;
  const customer = req.user._id;

  if (customer !== req.user._id) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "User is not found to create booking",
    );
  }

  const isServiceExist = await Service.findById(serviceId);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  const isSlotExist = await Slot.findById(slotId);
  if (!isSlotExist || isSlotExist.isBooked !== "available") {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found or not available");
  }

  const bookingData = {
    ...req.body,
    customer: req.user._id,
    service: serviceId,
    slot: slotId,
  };

  const result = await BookingService.createBookServiceIntoDB(bookingData, req.user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookings();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});


const getUserBookings = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await BookingService.getUserBookings(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});


export const BookingController = {
  createBooking,
  getAllBookings,
  getUserBookings
};
