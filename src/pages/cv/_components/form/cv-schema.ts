import type { FieldConfig } from '@/components/ui'
import type { CV } from '@/types'
import z from 'zod'

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  startYear: z.number(),
})

const experienceSchema = z.object({
  companyName: z.string(),
  position: z.string(),
  startDate: z.string(),
})

export const cvSchema = z.object({
  name: z.string().min(3, 'At Least 3 character for name'),
  skills: z.array(z.string()),
  experiences: z.array(experienceSchema),
  educations: z.array(educationSchema),
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
