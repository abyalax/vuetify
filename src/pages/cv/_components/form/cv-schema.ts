import type { FieldConfig } from '@/components/ui'
import type { CV } from '@/types'
import z from 'zod'

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  startYear: z.number(),
})

export const experienceSchema = z.object({
  companyName: z
    .string()
    .min(3, 'Company name is required')
    .describe('Company Name'),

  position: z
    .string()
    .min(1)
    .describe('Position'),

  startDate: z
    .string()
    .min(1)
    .describe('Start Date'),
})

export const cvSchema = z.object({
  name: z.string().min(3, 'At Least 3 character for name'),
  skills: z.array(z.string().min(3, 'At least 3 characters for field skills').describe('Skills')),
  experiences: z.array(experienceSchema).optional(),
  educations: z.array(educationSchema).optional(),
  expectedSalary: z.any().transform(Number).refine(
    val => Number.isFinite(val) && val > 0,
    { message: 'Expected salary must be a positive number' },
  ),
})

export type FormDataCV = z.infer<typeof cvSchema>
export type PayloadCV = Partial<CV>

export const experienceShape: Record<string, FieldConfig> = {
  companyName: { label: 'Company Name' },
  position: { label: 'Position' },
  startDate: { label: 'Start Date', type: 'text' },
}

export const educationShape: Record<string, FieldConfig> = {
  institution: { label: 'Institution' },
  degree: { label: 'Degree' },
  startYear: { label: 'Start Year', type: 'number' },
}

export const profileShape: Record<string, FieldConfig> = {
  name: { label: 'Full Name' },
}
