export type WizardStep =
  | 'personal'
  | 'industry'
  | 'experience'
  | 'education'
  | 'skills'
  | 'optional'
  | 'template'
  | 'preview'

export const WIZARD_STEPS: WizardStep[] = [
  'personal',
  'industry',
  'experience',
  'education',
  'skills',
  'optional',
  'template',
  'preview',
]

export interface WizardStepInfo {
  id: WizardStep
  title: string
  description: string
}

export const WIZARD_STEP_INFO: Record<WizardStep, WizardStepInfo> = {
  personal: {
    id: 'personal',
    title: 'Personal Details',
    description: 'Enter your contact information',
  },
  industry: {
    id: 'industry',
    title: 'Industry & Level',
    description: 'Select your industry and job level',
  },
  experience: {
    id: 'experience',
    title: 'Work Experience',
    description: 'Add your work history',
  },
  education: {
    id: 'education',
    title: 'Education Information',
    description: 'Add your educational background',
  },
  skills: {
    id: 'skills',
    title: 'Technical & Soft Skills',
    description: 'List your professional skills',
  },
  optional: {
    id: 'optional',
    title: 'Optional Sections',
    description: 'Add certifications, languages, or projects',
  },
  template: {
    id: 'template',
    title: 'Choose Template',
    description: 'Select a resume template',
  },
  preview: {
    id: 'preview',
    title: 'Preview & Download',
    description: 'Review and download your resume',
  },
}
