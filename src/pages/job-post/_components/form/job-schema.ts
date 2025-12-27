import type { EmploymentType, JobPost, JobStatus } from '@/types'
import z from 'zod'

export const jobPostSchema = z.object({
  title: z.string().min(4, 'At Least 4 character for title'),
  department: z.string().min(4, 'At Least 4 character for department'),
  location: z.string().min(4, 'At Least 4 character for location'),
  description: z.string().min(4, 'At Least 4 character for description'),
  requirements: z.array(z.string().min(4, 'At Least 4 character for requirements')),
  responsibilities: z.array(z.string().min(4, 'At Least 4 character for responsibilities')),
  minSalary: z.number().min(0),
  maxSalary: z.number().min(0),
  status: z.enum(['closed', 'draft', 'published'] as JobStatus[]),
  employmentType: z.enum(['contract', 'freelance', 'full-time', 'internship', 'part-time'] as EmploymentType[]),
})

export type FormDataJobPost = z.infer<typeof jobPostSchema>
export type PayloadJobPost = Partial<JobPost>
