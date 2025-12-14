import { useState } from 'react'
import { useForm, useFieldArray, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, Sparkles, GripVertical } from 'lucide-react'
import { Button, Input, Textarea, Card } from '@/components/ui'
import { WizardNavigation } from '../WizardNavigation'
import { useResumeStore } from '@/store/resumeStore'
import { useWizardStore } from '@/store/wizardStore'
import { useAIGeneration } from '@/hooks/useAIGeneration'
import { workExperienceSchema } from '@/utils/validation'
import type { WorkExperience } from '@/types/resume'

interface WorkExperienceFormValues extends FieldValues {
  workExperience: WorkExperience[]
}

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

export function WorkExperienceStep() {
  const { workExperience, aiBullets, industry, jobLevel, addWorkExperience, updateWorkExperience } = useResumeStore()
  const { nextStep, markStepComplete } = useWizardStore()
  const { generateBullets, isGenerating } = useAIGeneration()
  const [generatingFor, setGeneratingFor] = useState<string | null>(null)
  const [errorFor, setErrorFor] = useState<Record<string, string>>({})

  const defaultExperience: WorkExperience = {
    id: generateId(),
    company: '',
    title: '',
    startDate: '',
    endDate: '',
    isCurrentRole: false,
    responsibilities: '',
    bullets: [],
  }

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WorkExperienceFormValues>({
    resolver: zodResolver(workExperienceSchema) as any,
    defaultValues: {
      workExperience: workExperience.length > 0 ? workExperience : [defaultExperience],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workExperience',
  })

  const watchedExperience = watch('workExperience')

  const handleGenerateAI = async (index: number) => {
    const exp = watchedExperience[index]

    // Clear previous error for this field
    setErrorFor(prev => ({ ...prev, [exp.id]: '' }))

    // Validate industry and job level are selected
    if (!industry || !jobLevel) {
      setErrorFor(prev => ({
        ...prev,
        [exp.id]: 'Please complete Step 2 (Industry & Level) before generating bullets'
      }))
      return
    }

    // Validate responsibilities
    if (!exp.responsibilities || exp.responsibilities.length < 10) {
      setErrorFor(prev => ({
        ...prev,
        [exp.id]: 'Please describe your responsibilities (at least 10 characters)'
      }))
      return
    }

    // Validate title and company
    if (!exp.title || !exp.company) {
      setErrorFor(prev => ({
        ...prev,
        [exp.id]: 'Please fill in job title and company name first'
      }))
      return
    }

    setGeneratingFor(exp.id)

    try {
      const result = await generateBullets(exp.id, exp.title, exp.company, exp.responsibilities)
      if (!result) {
        setErrorFor(prev => ({
          ...prev,
          [exp.id]: 'Failed to generate bullets. Please try again.'
        }))
      }
    } catch (err) {
      setErrorFor(prev => ({
        ...prev,
        [exp.id]: 'An error occurred while generating bullets'
      }))
    } finally {
      setGeneratingFor(null)
    }
  }

  const onSubmit = (data: WorkExperienceFormValues) => {
    // Clear existing and add new
    data.workExperience.forEach((exp, index) => {
      if (index < workExperience.length) {
        updateWorkExperience(workExperience[index].id, {
          ...exp,
          id: workExperience[index].id,
        })
      } else {
        addWorkExperience(exp)
      }
    })
    markStepComplete('experience')
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Work Experience
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add up to 5 positions, starting with your most recent. AI will generate bullet points from your descriptions.
          </p>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => {
            const isCurrentRole = watch(`workExperience.${index}.isCurrentRole`)
            const expId = watchedExperience[index]?.id || field.id
            const hasBullets = aiBullets[expId]?.length > 0

            return (
              <Card key={field.id} variant="bordered" padding="md">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Position {index + 1}
                    </h3>
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company"
                    placeholder="Company Name"
                    required
                    error={errors.workExperience?.[index]?.company?.message}
                    {...register(`workExperience.${index}.company`)}
                  />
                  <Input
                    label="Job Title"
                    placeholder="Software Engineer"
                    required
                    error={errors.workExperience?.[index]?.title?.message}
                    {...register(`workExperience.${index}.title`)}
                  />
                  <Input
                    label="Start Date"
                    type="month"
                    required
                    error={errors.workExperience?.[index]?.startDate?.message}
                    {...register(`workExperience.${index}.startDate`)}
                  />
                  <div>
                    <Input
                      label="End Date"
                      type="month"
                      disabled={isCurrentRole}
                      error={errors.workExperience?.[index]?.endDate?.message}
                      {...register(`workExperience.${index}.endDate`)}
                    />
                    <label className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        {...register(`workExperience.${index}.isCurrentRole`)}
                        onChange={(e) => {
                          setValue(`workExperience.${index}.isCurrentRole`, e.target.checked)
                          if (e.target.checked) {
                            setValue(`workExperience.${index}.endDate`, '')
                          }
                        }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        I currently work here
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <Textarea
                    label="Responsibilities"
                    placeholder="Describe your key responsibilities and achievements..."
                    helperText="Be specific - the AI will transform this into professional bullet points"
                    rows={3}
                    required
                    error={errors.workExperience?.[index]?.responsibilities?.message}
                    {...register(`workExperience.${index}.responsibilities`)}
                  />
                </div>

                <div className="mt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleGenerateAI(index)}
                    isLoading={generatingFor === expId}
                    disabled={isGenerating}
                    leftIcon={<Sparkles className="h-4 w-4" />}
                  >
                    {hasBullets ? 'Regenerate Bullets' : 'Generate AI Bullets'}
                  </Button>

                  {errorFor[expId] && (
                    <p className="mt-2 text-sm text-red-500">{errorFor[expId]}</p>
                  )}

                  {hasBullets && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Generated Bullet Points:
                      </h4>
                      <ul className="space-y-1">
                        {aiBullets[expId].map((bullet, bulletIndex) => (
                          <li
                            key={bulletIndex}
                            className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <input type="hidden" {...register(`workExperience.${index}.id`)} />
              </Card>
            )
          })}
        </div>

        {fields.length < 5 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ ...defaultExperience, id: generateId() })}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add Another Position
          </Button>
        )}
      </div>

      <WizardNavigation />
    </form>
  )
}
