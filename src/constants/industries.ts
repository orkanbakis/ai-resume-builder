import type { Industry } from '@/types/resume'

export interface IndustryOption {
  value: Industry
  label: string
  description: string
}

export const INDUSTRIES: IndustryOption[] = [
  {
    value: 'Technology',
    label: 'Technology',
    description: 'Software, IT, SaaS, Hardware',
  },
  {
    value: 'Finance',
    label: 'Finance',
    description: 'Banking, Investment, Insurance',
  },
  {
    value: 'Healthcare',
    label: 'Healthcare',
    description: 'Medical, Pharmaceutical, Biotech',
  },
  {
    value: 'Marketing',
    label: 'Marketing',
    description: 'Advertising, Digital Marketing, PR',
  },
  {
    value: 'Education',
    label: 'Education',
    description: 'Teaching, EdTech, Training',
  },
  {
    value: 'Engineering',
    label: 'Engineering',
    description: 'Mechanical, Civil, Electrical',
  },
  {
    value: 'Legal',
    label: 'Legal',
    description: 'Law, Compliance, Legal Services',
  },
  {
    value: 'Sales',
    label: 'Sales',
    description: 'Business Development, Account Management',
  },
  {
    value: 'Human Resources',
    label: 'Human Resources',
    description: 'Recruiting, HR Management, Training',
  },
  {
    value: 'Operations',
    label: 'Operations',
    description: 'Supply Chain, Logistics, Manufacturing',
  },
  {
    value: 'Consulting',
    label: 'Consulting',
    description: 'Management, Strategy, Advisory',
  },
  {
    value: 'Other',
    label: 'Other',
    description: 'Other industries not listed',
  },
]
