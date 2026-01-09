// router/types.ts
import type { RouteAuthMeta } from '@/stores/auth'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta extends RouteAuthMeta {
    permissions?: string[] | string[][] // Support AND (string[]) or OR of ANDs (string[][])
  }
}

export type CandidateStatus
  = | 'active'
    | 'inactive'
    | 'blacklisted'

export interface Candidate {
  id: string
  fullName: string
  email: string
  phoneNumbers: string[]
  location?: string
  status: CandidateStatus

  createdAt: string
  updatedAt: string
}

export type CreateCandidate = Omit<Candidate, 'id'>
export type UpdateCandidate = Partial<Candidate>

export type EmploymentType
  = | 'full-time'
    | 'part-time'
    | 'contract'
    | 'internship'
    | 'freelance'

export interface CVExperience {
  companyName: string
  position: string
  startDate: string
  endDate?: string
  description?: string
}

export interface CVEducation {
  institution: string
  degree: string
  startYear: number
  endYear?: number
}

export interface CV {
  id: string
  candidateId: string

  name: string
  summary?: string

  skills: string[]
  experiences: CVExperience[]
  educations: CVEducation[]

  expectedSalary?: number
  preferredEmploymentType?: EmploymentType

  createdAt: string
  updatedAt: string
}

export type CreateCV = Omit<CV, 'id'>
export type UpdateCV = Partial<CV>

export type JobStatus
  = | 'draft'
    | 'published'
    | 'closed'

export interface JobPost {
  id: string

  title: string
  department?: string
  location: string

  description: string
  requirements: string[]
  responsibilities?: string[]

  employmentType: EmploymentType
  minSalary: number
  maxSalary: number

  status: JobStatus

  createdAt: string
  updatedAt: string
}

export type CreateJobPost = Omit<JobPost, 'id'>
export type UpdateJobPost = Partial<JobPost>

export type Permission = {
  id: number
  key: string
  name: string
  created_at?: string | null
  updated_at?: string | null
  deleted_at?: string | null
}

export type Role = {
  id: string
  name: string
  key: string
  permissions: Permission[]
  created_at?: string | null
  updated_at?: string | null
  deleted_at?: string | null
}

export type User = {
  id: string
  name: string
  email: string
  password: string
  roles: Role[] // New structure: user has multiple roles
  permissions?: Permission[] // Keep for backward compatibility, but prefer using roles[].permissions
}

export type CreateUser = Omit<User, 'id'>
export type UpdateUser = Partial<User>
