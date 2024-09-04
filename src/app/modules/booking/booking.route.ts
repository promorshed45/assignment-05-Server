import express from "express";
import { auth } from "../../middleware/auth";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidations } from "./booking.validation";

const router = express.Router();

router.post(
  "/bookings",
  auth("user"),
  validateRequest(BookingValidations.createBookingValidation),
  BookingController.createBooking
);

router.get(
  "/bookings",
  auth("admin"),
  BookingController.getAllBookings
);

router.get(
  "/my-bookings",
  auth("user"),
  BookingController.getUserBookings
);


export const BookingRoute = router;

