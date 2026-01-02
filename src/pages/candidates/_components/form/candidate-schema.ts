import type { Candidate } from '@/types'
import z from 'zod'

const phoneSchema = z
  .string()
  .regex(/^\d+$/, 'Phone must contain only digits')
  .refine(
    val => val.length >= 10 && val.length <= 15,
    { message: 'Phone must be between 10 and 15 digits' },
  )

export const candidateSchema = z.object({
  fullName: z.string().min(4, 'At Least 4 character for fullname'),
  email: z.email(),
  phoneNumbers: z.array(phoneSchema),
  location: z.string().optional(),
  status: z.enum(['active', 'blacklisted', 'inactive']),
})

export type FormDataCandidate = z.infer<typeof candidateSchema>
export type PayloadCandidate = Partial<Candidate>
