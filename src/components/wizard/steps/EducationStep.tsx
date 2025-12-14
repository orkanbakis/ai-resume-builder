import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { WizardNavigation } from '../WizardNavigation'
import { useResumeStore } from '@/store/resumeStore'
import { useWizardStore } from '@/store/wizardStore'
import { educationSchema, type EducationFormData } from '@/utils/validation'
import type { Education } from '@/types/resume'

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

export function EducationStep() {
  const { education, addEducation, updateEducation } = useResumeStore()
  const { nextStep, markStepComplete } = useWizardStore()

  const defaultEducation: Education = {
    id: generateId(),
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    honors: '',
    gpa: '',
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: education.length > 0 ? education : [defaultEducation],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  })

  const onSubmit = (data: EducationFormData) => {
    // Clear existing and add new
    data.education.forEach((edu, index) => {
      if (index < education.length) {
        updateEducation(education[index].id, {
          ...edu,
          id: education[index].id,
        })
      } else {
        addEducation(edu)
      }
    })
    markStepComplete('education')
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Education
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add up to 3 educational qualifications, starting with the most recent.
          </p>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <Card key={field.id} variant="bordered" padding="md">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Education {index + 1}
                </h3>
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
                  label="Institution"
                  placeholder="University Name"
                  required
                  error={errors.education?.[index]?.institution?.message}
                  {...register(`education.${index}.institution`)}
                />
                <Input
                  label="Degree"
                  placeholder="Bachelor of Science"
                  required
                  error={errors.education?.[index]?.degree?.message}
                  {...register(`education.${index}.degree`)}
                />
                <Input
                  label="Field of Study"
                  placeholder="Computer Science"
                  required
                  error={errors.education?.[index]?.fieldOfStudy?.message}
                  {...register(`education.${index}.fieldOfStudy`)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Start Year"
                    type="number"
                    min="1950"
                    max="2030"
                    placeholder="2018"
                    required
                    error={errors.education?.[index]?.startDate?.message}
                    {...register(`education.${index}.startDate`)}
                  />
                  <Input
                    label="End Year"
                    type="number"
                    min="1950"
                    max="2030"
                    placeholder="2022"
                    error={errors.education?.[index]?.endDate?.message}
                    {...register(`education.${index}.endDate`)}
                  />
                </div>
                <Input
                  label="Honors/Awards"
                  placeholder="Magna Cum Laude, Dean's List"
                  helperText="Optional"
                  error={errors.education?.[index]?.honors?.message}
                  {...register(`education.${index}.honors`)}
                />
                <Input
                  label="GPA"
                  placeholder="3.8/4.0"
                  helperText="Optional - include if notable"
                  error={errors.education?.[index]?.gpa?.message}
                  {...register(`education.${index}.gpa`)}
                />
              </div>

              <input type="hidden" {...register(`education.${index}.id`)} />
            </Card>
          ))}
        </div>

        {fields.length < 3 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ ...defaultEducation, id: generateId() })}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add Another Education
          </Button>
        )}
      </div>

      <WizardNavigation />
    </form>
  )
}
