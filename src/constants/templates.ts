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
    id: 'classic',
    name: 'Classic',
    description: 'Single-column, clean serif typography, traditional layout',
    features: ['Serif typography', 'Traditional layout', 'Formal appearance'],
    bestFor: ['Finance', 'Legal', 'Academia', 'Government'],
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Single-column, sans-serif, subtle accent line',
    features: ['Sans-serif typography', 'Clean design', 'Accent colors'],
    bestFor: ['Technology', 'Startups', 'Creative roles', 'Most industries'],
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Two-column, space-efficient, good for extensive experience',
    features: ['Two-column layout', 'Space efficient', 'Information dense'],
    bestFor: ['Experienced professionals', 'Multiple roles', 'Detailed skills'],
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Elegant spacing, refined typography, understated sophistication',
    features: ['Premium feel', 'Generous whitespace', 'Refined typography'],
    bestFor: ['C-level executives', 'Directors', 'Senior leadership'],
  },
  {
    id: 'canva',
    name: 'Canva Style',
    description: 'Modern two-column design with teal accents and clean typography',
    features: ['Two-column layout', 'Icon accents', 'Modern design'],
    bestFor: ['Marketing', 'Creative roles', 'Modern companies', 'All industries'],
  },
]

export const getTemplateById = (id: TemplateId): TemplateDefinition | undefined => {
  return TEMPLATES.find((t) => t.id === id)
}
