import { z } from 'zod';

export const createSlotValidation = z.object({
  body: z.object({
    service: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    isBooked: z.enum(['available', 'booked', 'cancelled']).optional(),
  })
});

export const SlotValidations = {
  createSlotValidation
};
