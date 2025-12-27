import * as z from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'E-mail is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(10, 'Password must be less than 10 characters')
    .refine(val => val === val.trim(), 'Password cannot start or end with spaces'),
  remember: z.boolean().optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
