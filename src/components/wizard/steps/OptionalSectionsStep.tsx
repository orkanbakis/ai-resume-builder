import { useState } from 'react'
import { useForm, useFieldArray, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, Award, Globe, FolderKanban } from 'lucide-react'
import { Button, Input, Textarea, Card, Select } from '@/components/ui'
import { WizardNavigation } from '../WizardNavigation'
import { useResumeStore } from '@/store/resumeStore'
import { useWizardStore } from '@/store/wizardStore'
import { optionalSectionsSchema } from '@/utils/validation'
import type { Certification, Language, Project } from '@/types/resume'

interface OptionalSectionsFormValues extends FieldValues {
  certifications: Certification[]
  languages: Language[]
  projects: Project[]
}

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

type TabId = 'certifications' | 'languages' | 'projects'

export function OptionalSectionsStep() {
  const {
    certifications,
    languages,
    projects,
    addCertification,
    removeCertification,
    addLanguage,
    removeLanguage,
    addProject,
    removeProject,
  } = useResumeStore()
  const { nextStep, markStepComplete } = useWizardStore()
  const [activeTab, setActiveTab] = useState<TabId>('certifications')

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OptionalSectionsFormValues>({
    resolver: zodResolver(optionalSectionsSchema) as any,
    defaultValues: {
      certifications: certifications.length > 0 ? certifications : [],
      languages: languages.length > 0 ? languages : [],
      projects: projects.length > 0 ? projects : [],
    },
  })

  const certificationsArray = useFieldArray({ control, name: 'certifications' })
  const languagesArray = useFieldArray({ control, name: 'languages' })
  const projectsArray = useFieldArray({ control, name: 'projects' })

  const tabs: { id: TabId; label: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'certifications',
      label: 'Certifications',
      icon: <Award className="h-4 w-4" />,
      count: certificationsArray.fields.length,
    },
    {
      id: 'languages',
      label: 'Languages',
      icon: <Globe className="h-4 w-4" />,
      count: languagesArray.fields.length,
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <FolderKanban className="h-4 w-4" />,
      count: projectsArray.fields.length,
    },
  ]

  const onSubmit = (data: OptionalSectionsFormValues) => {
    // Update stores
    // Clear and re-add certifications
    certifications.forEach((c) => removeCertification(c.id))
    data.certifications?.forEach((c) => addCertification(c))

    // Clear and re-add languages
    languages.forEach((l) => removeLanguage(l.id))
    data.languages?.forEach((l) => addLanguage(l))

    // Clear and re-add projects
    projects.forEach((p) => removeProject(p.id))
    data.projects?.forEach((p) => addProject(p))

    markStepComplete('optional')
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Optional Sections
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add certifications, languages, or projects to strengthen your resume.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-1 py-3 text-sm font-medium border-b-2 transition-colors
                  ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            {certificationsArray.fields.map((field, index) => (
              <Card key={field.id} variant="bordered" padding="sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Certification Name"
                      error={errors.certifications?.[index]?.name?.message}
                      {...register(`certifications.${index}.name`)}
                    />
                    <Input
                      placeholder="Issuer (e.g., AWS, Google)"
                      error={errors.certifications?.[index]?.issuer?.message}
                      {...register(`certifications.${index}.issuer`)}
                    />
                    <Input
                      type="month"
                      placeholder="Date"
                      {...register(`certifications.${index}.date`)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => certificationsArray.remove(index)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <input type="hidden" {...register(`certifications.${index}.id`)} />
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                certificationsArray.append({ id: generateId(), name: '', issuer: '', date: '' })
              }
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Add Certification
            </Button>
          </div>
        )}

        {/* Languages Tab */}
        {activeTab === 'languages' && (
          <div className="space-y-4">
            {languagesArray.fields.map((field, index) => (
              <Card key={field.id} variant="bordered" padding="sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Language"
                      error={errors.languages?.[index]?.name?.message}
                      {...register(`languages.${index}.name`)}
                    />
                    <Select
                      placeholder="Proficiency"
                      options={[
                        { value: 'Basic', label: 'Basic' },
                        { value: 'Conversational', label: 'Conversational' },
                        { value: 'Professional', label: 'Professional' },
                        { value: 'Native', label: 'Native' },
                      ]}
                      error={errors.languages?.[index]?.proficiency?.message}
                      {...register(`languages.${index}.proficiency`)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => languagesArray.remove(index)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <input type="hidden" {...register(`languages.${index}.id`)} />
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                languagesArray.append({
                  id: generateId(),
                  name: '',
                  proficiency: 'Professional',
                })
              }
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Add Language
            </Button>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {projectsArray.fields.map((field, index) => (
              <Card key={field.id} variant="bordered" padding="sm">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <Input
                    placeholder="Project Name"
                    className="flex-1"
                    error={errors.projects?.[index]?.name?.message}
                    {...register(`projects.${index}.name`)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => projectsArray.remove(index)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  placeholder="Brief description of the project..."
                  rows={2}
                  error={errors.projects?.[index]?.description?.message}
                  {...register(`projects.${index}.description`)}
                />
                <Input
                  placeholder="Project URL (optional)"
                  className="mt-3"
                  error={errors.projects?.[index]?.url?.message}
                  {...register(`projects.${index}.url`)}
                />
                <input type="hidden" {...register(`projects.${index}.id`)} />
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                projectsArray.append({ id: generateId(), name: '', description: '', url: '' })
              }
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Add Project
            </Button>
          </div>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          All sections are optional. Skip or add entries as needed.
        </p>
      </div>

      <WizardNavigation nextLabel="Continue" />
    </form>
  )
}
