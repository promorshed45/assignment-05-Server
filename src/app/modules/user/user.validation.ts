import { z } from 'zod';
import { USER_ROLE } from './user.constants';

export const createUserValidation = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string(),
        role: z.nativeEnum(USER_ROLE),
        address: z.string(),
    })
});

export const UserValidations = {
    createUserValidation
};