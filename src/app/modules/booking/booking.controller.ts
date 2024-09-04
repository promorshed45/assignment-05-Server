import catchAsync from '../../utils/catechAsync';
import { BookingService } from './booking.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const createBooking = catchAsync(async (req, res) => {
  const userId = req.userId;
  const result = await BookingService.createBooking(req.body, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking successful",
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
  const userId = req.user.userId;
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
