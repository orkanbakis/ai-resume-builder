import { z } from 'zod'

export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  location: z.string().min(2, 'Location is required'),
  linkedIn: z.url('Invalid LinkedIn URL').optional().or(z.literal('')),
  professionalSummary: z.string().max(500, 'Summary must be under 500 characters').optional(),
})

export const industryJobLevelSchema = z.object({
  industry: z.string().min(1, 'Please select an industry'),
  jobLevel: z.string().min(1, 'Please select a job level'),
})

export const workExperienceItemSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company name is required'),
  title: z.string().min(1, 'Job title is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrentRole: z.boolean(),
  responsibilities: z.string().min(10, 'Please describe your responsibilities (at least 10 characters)'),
  bullets: z.array(z.string()).default([]),
})

export const workExperienceSchema = z.object({
  workExperience: z
    .array(workExperienceItemSchema)
    .min(1, 'Add at least one work experience')
    .max(5, 'Maximum 5 work experiences allowed'),
})

export const educationItemSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  honors: z.string().optional(),
  gpa: z.string().optional(),
})

export const educationSchema = z.object({
  education: z
    .array(educationItemSchema)
    .min(1, 'Add at least one education entry')
    .max(3, 'Maximum 3 education entries allowed'),
})

export const skillsSchema = z.object({
  skills: z
    .array(z.string().min(1))
    .min(3, 'Please add at least 3 skills'),
})

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.string().optional(),
})

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Language name is required'),
  proficiency: z.enum(['Basic', 'Conversational', 'Professional', 'Native']),
})

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(10, 'Please provide a brief description'),
  url: z.url('Invalid URL').optional().or(z.literal('')),
})

export const optionalSectionsSchema = z.object({
  certifications: z.array(certificationSchema).default([]),
  languages: z.array(languageSchema).default([]),
  projects: z.array(projectSchema).default([]),
})

export const templateSelectionSchema = z.object({
  selectedTemplate: z.enum(['classic', 'modern', 'compact', 'executive']),
})

// Type exports for form data
export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>
export type IndustryJobLevelFormData = z.infer<typeof industryJobLevelSchema>
export type WorkExperienceFormData = z.infer<typeof workExperienceSchema>
export type EducationFormData = z.infer<typeof educationSchema>
export type SkillsFormData = z.infer<typeof skillsSchema>
export type OptionalSectionsFormData = z.infer<typeof optionalSectionsSchema>
export type TemplateSelectionFormData = z.infer<typeof templateSelectionSchema>
