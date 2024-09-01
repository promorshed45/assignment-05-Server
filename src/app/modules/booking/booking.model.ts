import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';


const BookingSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User' },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  slot: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
}, { timestamps: true }
);

// Define and export the Booking model
export const Booking = model<TBooking>('Booking', BookingSchema);
