import { z } from 'zod';

export const createServiceValidation = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.number(),
    duration: z.number(),
    isDeleted: z.boolean().default(false),
  })
});

export const updateServiceValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
    isDeleted: z.boolean().optional(),
  })
});

export const ServiceValidations = {
  createServiceValidation,
  updateServiceValidation
};
