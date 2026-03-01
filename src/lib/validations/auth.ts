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

export const SignInSchema = z.object({
  email: z.string().nonempty('Email Is Required').email('Invalid Email Address'),
  password: z.string().min(1, 'Password Is Required')
})


export const ForgotPasswordSchema = z.object({
  email: z.string().nonempty('Email Is Required').email()
})

export const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, 'Password Must Be At least 8 character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords Do Not Match',
  path: ['confirmPassword']
})