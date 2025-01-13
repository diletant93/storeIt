import { FormTypeProp } from '@/types/props';
import { z } from 'zod';
export const getAuthFormValidationScheme = function (formType: FormTypeProp) {
  return z.object({
    email: z.string().email({ message: 'Provide a correct email' }),
    fullName:
      formType === 'sign-up'
        ? z
            .string()
            .min(2, { message: 'The name is too short' })
            .max(50, { message: 'The name is too long' })
        : z.string().optional(),
  });
};
