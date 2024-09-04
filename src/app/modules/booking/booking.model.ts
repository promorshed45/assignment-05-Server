import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';


const BookingSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User' },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  slot: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.serviceId;
      delete ret.slotId;
      delete ret.__v;
      return ret;
    }
  }
})


// Virtual populate for service 
BookingSchema.virtual('serviceInfo', {
  ref: 'Service',
  localField: 'service',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for slot 
BookingSchema.virtual('slotInfo', {
  ref: 'Slot',
  localField: 'slot',
  foreignField: '_id',
  justOne: true,
});


// Define and export the Booking model
export const Booking = model<TBooking>('Booking', BookingSchema);
