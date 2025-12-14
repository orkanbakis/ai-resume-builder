import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from '@/components/ui'
import { WizardNavigation } from '../WizardNavigation'
import { useResumeStore } from '@/store/resumeStore'
import { useWizardStore } from '@/store/wizardStore'
import { industryJobLevelSchema, type IndustryJobLevelFormData } from '@/utils/validation'
import { INDUSTRIES } from '@/constants/industries'
import { JOB_LEVELS, JOB_LEVEL_GUIDANCE } from '@/constants/jobLevels'
import type { JobLevel } from '@/types/resume'

export function IndustryJobLevelStep() {
  const { industry, jobLevel, setIndustry, setJobLevel } = useResumeStore()
  const { nextStep, markStepComplete } = useWizardStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IndustryJobLevelFormData>({
    resolver: zodResolver(industryJobLevelSchema),
    defaultValues: {
      industry: industry || '',
      jobLevel: jobLevel || '',
    },
  })

  const selectedJobLevel = watch('jobLevel') as JobLevel

  const onSubmit = (data: IndustryJobLevelFormData) => {
    setIndustry(data.industry as typeof industry)
    setJobLevel(data.jobLevel as typeof jobLevel)
    markStepComplete('industry')
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Industry & Job Level
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            This helps the AI tailor your resume with industry-appropriate language.
          </p>
        </div>

        <Select
          label="Industry"
          required
          placeholder="Select your industry"
          options={INDUSTRIES.map((i) => ({
            value: i.value,
            label: i.label,
            description: i.description,
          }))}
          error={errors.industry?.message}
          {...register('industry')}
        />

        <Select
          label="Job Level"
          required
          placeholder="Select your experience level"
          options={JOB_LEVELS.map((j) => ({
            value: j.value,
            label: `${j.label} (${j.yearsExperience})`,
            description: j.description,
          }))}
          error={errors.jobLevel?.message}
          {...register('jobLevel')}
        />

        {selectedJobLevel && (
          <div className="rounded-lg bg-primary-50 dark:bg-primary-900/20 p-4">
            <h3 className="text-sm font-medium text-primary-800 dark:text-primary-200 mb-2">
              AI Writing Style for {selectedJobLevel}
            </h3>
            <p className="text-sm text-primary-700 dark:text-primary-300">
              {JOB_LEVEL_GUIDANCE[selectedJobLevel]}
            </p>
          </div>
        )}
      </div>

      <WizardNavigation />
    </form>
  )
}
