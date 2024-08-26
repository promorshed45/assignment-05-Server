import { Schema, model } from 'mongoose';
import { TService } from './service.interface';


const ServiceSchema = new Schema<TService>({
    name: { type: String, required: [true, 'Title of the service is required']},
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    duration: { type: Number, required: [true, 'Duration is required'] },
    isDeleted: { type: Boolean, required: true, default: false },
},{
    timestamps: true
});

export const Service = model<TService>("Service", ServiceSchema);
