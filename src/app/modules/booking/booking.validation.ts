import { z } from 'zod';

export const createBookingValidation = z.object({
  body: z.object({
    customer: z.string().optional(),
    service: z.string().optional(),
    slot: z.string().optional(),
    vehicleType: z.enum(['car', 'truck', 'SUV', 'van', 'motorcycle', 'bus', 'electricVehicle', 'hybridVehicle', 'bicycle', 'tractor']),
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number().int().min(1886, 'Manufacturing year must be 1886 or later'), // The first car was built in 1886
    registrationPlate: z.string(),
  })
});

export const BookingValidations = {
  createBookingValidation
};
