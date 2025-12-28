export interface PersonalDetails {
  fullName: string
  title?: string
  email: string
  phone: string
  location: string
  linkedIn?: string
  website?: string
  professionalSummary?: string
}

export interface WorkExperience {
  id: string
  company: string
  title: string
  startDate: string
  endDate?: string
  isCurrentRole: boolean
  responsibilities: string
  bullets: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate?: string
  honors?: string
  gpa?: string
}

export interface Project {
  id: string
  name: string
  description: string
  url?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date?: string
}

export interface Language {
  id: string
  name: string
  proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Native'
}

export interface Award {
  id: string
  name: string
  issuer?: string
  date?: string
}

export type Industry =
  | 'Technology'
  | 'Finance'
  | 'Healthcare'
  | 'Marketing'
  | 'Education'
  | 'Engineering'
  | 'Legal'
  | 'Sales'
  | 'Human Resources'
  | 'Operations'
  | 'Consulting'
  | 'Other'

export type JobLevel =
  | 'Entry-level'
  | 'Mid-level'
  | 'Senior'
  | 'Manager'
  | 'Executive'

export type TemplateId = 'heritage' | 'clarity' | 'impact' | 'precision' | 'executive-edge'

export interface ResumeData {
  personalDetails: PersonalDetails
  industry: Industry | ''
  jobLevel: JobLevel | ''
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
  certifications: Certification[]
  languages: Language[]
  projects: Project[]
  awards: Award[]
  selectedTemplate: TemplateId
}

export interface AIGeneratedContent {
  bullets: Record<string, string[]> // keyed by work experience ID
  summary?: string
}
