import type { TemplateId } from '@/types/resume'

export interface TemplateDefinition {
  id: TemplateId
  name: string
  description: string
  features: string[]
  bestFor: string[]
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'heritage',
    name: 'Heritage',
    description: 'Timeless elegance with serif typography and traditional layout',
    features: ['Serif typography', 'Traditional layout', 'Formal appearance'],
    bestFor: ['Finance', 'Legal', 'Academia', 'Government'],
  },
  {
    id: 'clarity',
    name: 'Clarity',
    description: 'Clean, contemporary design with strategic whitespace',
    features: ['Sans-serif typography', 'Clean lines', 'Blue accents'],
    bestFor: ['Technology', 'Startups', 'Marketing', 'Design'],
  },
  {
    id: 'impact',
    name: 'Impact',
    description: 'Bold two-column layout with teal sidebar for creative professionals',
    features: ['Two-column layout', 'Colored sidebar', 'Modern design'],
    bestFor: ['Creative roles', 'Design', 'Marketing', 'Media'],
  },
  {
    id: 'precision',
    name: 'Precision',
    description: 'ATS-optimized design for maximum parseability',
    features: ['ATS-friendly', 'Simple structure', 'High parseability'],
    bestFor: ['Engineering', 'IT', 'Corporate', 'Government'],
  },
  {
    id: 'executive-edge',
    name: 'Executive Edge',
    description: 'Sophisticated design for senior leadership positions',
    features: ['Premium feel', 'Refined typography', 'Executive styling'],
    bestFor: ['C-Suite', 'Directors', 'VPs', 'Senior leaders'],
  },
]

export const getTemplateById = (id: TemplateId): TemplateDefinition | undefined => {
  return TEMPLATES.find((t) => t.id === id)
}
