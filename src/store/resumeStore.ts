import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  PersonalDetails,
  WorkExperience,
  Education,
  Certification,
  Language,
  Project,
  Industry,
  JobLevel,
  TemplateId,
} from '@/types/resume'

interface ResumeState {
  // Personal Details
  personalDetails: PersonalDetails

  // Industry & Job Level
  industry: Industry | ''
  jobLevel: JobLevel | ''

  // Experience & Education
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]

  // Optional Sections
  certifications: Certification[]
  languages: Language[]
  projects: Project[]

  // AI Generated Content
  aiBullets: Record<string, string[]>
  aiSummary: string | null

  // Template
  selectedTemplate: TemplateId

  // Actions - Personal Details
  setPersonalDetails: (details: Partial<PersonalDetails>) => void

  // Actions - Industry & Job Level
  setIndustry: (industry: Industry | '') => void
  setJobLevel: (jobLevel: JobLevel | '') => void

  // Actions - Work Experience
  addWorkExperience: (exp: WorkExperience) => void
  updateWorkExperience: (id: string, exp: Partial<WorkExperience>) => void
  removeWorkExperience: (id: string) => void
  reorderWorkExperience: (fromIndex: number, toIndex: number) => void

  // Actions - Education
  addEducation: (edu: Education) => void
  updateEducation: (id: string, edu: Partial<Education>) => void
  removeEducation: (id: string) => void

  // Actions - Skills
  setSkills: (skills: string[]) => void
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void

  // Actions - Optional Sections
  addCertification: (cert: Certification) => void
  updateCertification: (id: string, cert: Partial<Certification>) => void
  removeCertification: (id: string) => void

  addLanguage: (lang: Language) => void
  updateLanguage: (id: string, lang: Partial<Language>) => void
  removeLanguage: (id: string) => void

  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void

  // Actions - AI Content
  setAIBullets: (expId: string, bullets: string[]) => void
  updateAIBullet: (expId: string, index: number, text: string) => void
  setAISummary: (summary: string) => void

  // Actions - Template
  setTemplate: (template: TemplateId) => void

  // Reset
  reset: () => void
}

const initialPersonalDetails: PersonalDetails = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedIn: '',
  professionalSummary: '',
}

const initialState = {
  personalDetails: initialPersonalDetails,
  industry: '' as const,
  jobLevel: '' as const,
  workExperience: [] as WorkExperience[],
  education: [] as Education[],
  skills: [] as string[],
  certifications: [] as Certification[],
  languages: [] as Language[],
  projects: [] as Project[],
  aiBullets: {} as Record<string, string[]>,
  aiSummary: null as string | null,
  selectedTemplate: 'modern' as TemplateId,
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      ...initialState,

      // Personal Details
      setPersonalDetails: (details) =>
        set((state) => ({
          personalDetails: { ...state.personalDetails, ...details },
        })),

      // Industry & Job Level
      setIndustry: (industry) => set({ industry }),
      setJobLevel: (jobLevel) => set({ jobLevel }),

      // Work Experience
      addWorkExperience: (exp) =>
        set((state) => ({
          workExperience: [...state.workExperience, exp],
        })),

      updateWorkExperience: (id, exp) =>
        set((state) => ({
          workExperience: state.workExperience.map((e) =>
            e.id === id ? { ...e, ...exp } : e
          ),
        })),

      removeWorkExperience: (id) =>
        set((state) => {
          const { [id]: _, ...restBullets } = state.aiBullets
          return {
            workExperience: state.workExperience.filter((e) => e.id !== id),
            aiBullets: restBullets,
          }
        }),

      reorderWorkExperience: (fromIndex, toIndex) =>
        set((state) => {
          const newExperience = [...state.workExperience]
          const [removed] = newExperience.splice(fromIndex, 1)
          newExperience.splice(toIndex, 0, removed)
          return { workExperience: newExperience }
        }),

      // Education
      addEducation: (edu) =>
        set((state) => ({
          education: [...state.education, edu],
        })),

      updateEducation: (id, edu) =>
        set((state) => ({
          education: state.education.map((e) =>
            e.id === id ? { ...e, ...edu } : e
          ),
        })),

      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((e) => e.id !== id),
        })),

      // Skills
      setSkills: (skills) => set({ skills }),

      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, skill],
        })),

      removeSkill: (skill) =>
        set((state) => ({
          skills: state.skills.filter((s) => s !== skill),
        })),

      // Certifications
      addCertification: (cert) =>
        set((state) => ({
          certifications: [...state.certifications, cert],
        })),

      updateCertification: (id, cert) =>
        set((state) => ({
          certifications: state.certifications.map((c) =>
            c.id === id ? { ...c, ...cert } : c
          ),
        })),

      removeCertification: (id) =>
        set((state) => ({
          certifications: state.certifications.filter((c) => c.id !== id),
        })),

      // Languages
      addLanguage: (lang) =>
        set((state) => ({
          languages: [...state.languages, lang],
        })),

      updateLanguage: (id, lang) =>
        set((state) => ({
          languages: state.languages.map((l) =>
            l.id === id ? { ...l, ...lang } : l
          ),
        })),

      removeLanguage: (id) =>
        set((state) => ({
          languages: state.languages.filter((l) => l.id !== id),
        })),

      // Projects
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),

      updateProject: (id, project) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...project } : p
          ),
        })),

      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),

      // AI Content
      setAIBullets: (expId, bullets) =>
        set((state) => ({
          aiBullets: { ...state.aiBullets, [expId]: bullets },
        })),

      updateAIBullet: (expId, index, text) =>
        set((state) => {
          const bullets = [...(state.aiBullets[expId] || [])]
          bullets[index] = text
          return {
            aiBullets: { ...state.aiBullets, [expId]: bullets },
          }
        }),

      setAISummary: (summary) => set({ aiSummary: summary }),

      // Template
      setTemplate: (template) => set({ selectedTemplate: template }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({
        personalDetails: state.personalDetails,
        industry: state.industry,
        jobLevel: state.jobLevel,
        workExperience: state.workExperience,
        education: state.education,
        skills: state.skills,
        certifications: state.certifications,
        languages: state.languages,
        projects: state.projects,
        aiBullets: state.aiBullets,
        aiSummary: state.aiSummary,
        selectedTemplate: state.selectedTemplate,
      }),
    }
  )
)
