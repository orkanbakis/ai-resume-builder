import type { JobLevel } from '@/types/resume'

export interface JobLevelOption {
  value: JobLevel
  label: string
  description: string
  yearsExperience: string
}

export const JOB_LEVELS: JobLevelOption[] = [
  {
    value: 'Entry-level',
    label: 'Entry-level',
    description: 'Starting your career, recent graduate',
    yearsExperience: '0-2 years',
  },
  {
    value: 'Mid-level',
    label: 'Mid-level',
    description: 'Established professional with growing expertise',
    yearsExperience: '3-5 years',
  },
  {
    value: 'Senior',
    label: 'Senior',
    description: 'Expert-level individual contributor',
    yearsExperience: '6-10 years',
  },
  {
    value: 'Manager',
    label: 'Manager',
    description: 'Team lead or department manager',
    yearsExperience: '5+ years',
  },
  {
    value: 'Executive',
    label: 'Executive',
    description: 'Director, VP, or C-level',
    yearsExperience: '10+ years',
  },
]

export const JOB_LEVEL_GUIDANCE: Record<JobLevel, string> = {
  'Entry-level':
    'Focus on learning, growth, foundational skills, and potential. Emphasize training completed, skills developed, and eagerness to contribute.',
  'Mid-level':
    'Balance technical execution with emerging leadership. Show project ownership, collaboration, and measurable contributions.',
  Senior:
    'Emphasize expertise, mentorship, and significant project leadership. Demonstrate strategic thinking and impact on team/organization.',
  Manager:
    'Focus on team leadership, resource management, and department-level impact. Include team size, budget responsibility, and organizational improvements.',
  Executive:
    'Emphasize strategic vision, organizational transformation, P&L responsibility, and enterprise-level impact. Show board-level communication and stakeholder management.',
}
