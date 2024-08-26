import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';


const SlotSchema = new Schema<TSlot>({
    service: { type: Schema.Types.ObjectId, ref: 'Service'},
    date: { type: String, required: [true, 'Date of the booking is required'] },
    startTime: { type: String, required: [true, 'Start time of the slot is required'] },
    endTime: { type: String, required: [true, 'Approximate end time of the slot is required'] },
    isBooked: {
        type: String,
        enum: ['available', 'booked', 'canceled'],
        default: 'available'
    },
},{
    timestamps: true
});

export const Slot = model<TSlot>('Slot', SlotSchema);