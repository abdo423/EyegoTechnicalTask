import * as z from 'zod';


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(20, { message: 'Password must be at most 20 characters' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&#]/, { message: 'Password must contain at least one special character' }),
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters' })
        .max(30, { message: 'Name must be at most 50 characters' }),
});