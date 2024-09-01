import { z } from 'zod';

export const createBookingValidation = z.object({
  body: z.object({
    customer: z.string().optional(),
    service: z.string().optional(),
    slot: z.string().optional(),
  })
});

export const BookingValidations = {
  createBookingValidation
};
