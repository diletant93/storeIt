import { FormTypeProp } from '@/types/props';
import { Fullscreen } from 'lucide-react';
import { z } from 'zod';
const baseAuthSchema = {
  email: z.string({required_error:'Email is required'})
    .email({message:'Provide a correct email'})
};

const signInSchema = z.object({
  ...baseAuthSchema
});

const signUpSchema = z.object({
  ...baseAuthSchema,
  fullName: z.string({ required_error: 'Name is required' })
    .min(2, { message: 'The name is too short' })
    .max(50, { message: 'The name is too long' })
});

export const getAuthFormValidationScheme = (formType: FormTypeProp) => {
  return formType === 'sign-up' ? signUpSchema : signInSchema;
};
export type AuthFormType = z.infer<typeof signUpSchema> | z.infer<typeof signInSchema>;