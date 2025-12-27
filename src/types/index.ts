export type CandidateStatus
  = | 'active'
    | 'inactive'
    | 'blacklisted'

export interface Candidate {
  id: string
  fullName: string
  email: string
  phoneNumbers: string[] // dynamic input
  location?: string
  status: CandidateStatus

  createdAt: string
  updatedAt: string
}

// domains/cv/types/cv.type.ts

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

  skills: string[] // dynamic input
  experiences: CVExperience[] // dynamic group input
  educations: CVEducation[]

  expectedSalary?: number
  preferredEmploymentType?: EmploymentType

  createdAt: string
  updatedAt: string
}

export type CreateCV = Omit<CV, 'id'>
export type UpdateCV = Partial<CV>

// domains/job-posts/types/job-post.type.ts

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
  requirements: string[] // dynamic input
  responsibilities?: string[]

  employmentType: EmploymentType
  salaryRange?: {
    min: number
    max: number
  }

  status: JobStatus

  createdAt: string
  updatedAt: string
}
