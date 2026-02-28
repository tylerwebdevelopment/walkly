// Zod Schemas For Form Validation
import {z} from 'zod';

export const SignUpSchema = z.object({
  firstname: z.string().min(1, 'Firstname is Required'),
  lastname: z.string().min(1, 'Lastname is required'),
  email: z.email('Invalid Email Address'),
  password: z.string().min(8, 'Password Must Be At Least 8 Characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords Do Not Match',
  path: ['confirmPassword']
})