import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Textarea } from '@/components/ui'
import { WizardNavigation } from '../WizardNavigation'
import { useResumeStore } from '@/store/resumeStore'
import { useWizardStore } from '@/store/wizardStore'
import { personalDetailsSchema, type PersonalDetailsFormData } from '@/utils/validation'

export function PersonalDetailsStep() {
  const { personalDetails, setPersonalDetails } = useResumeStore()
  const { nextStep, markStepComplete } = useWizardStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: personalDetails,
  })

  const summaryValue = watch('professionalSummary') || ''

  const onSubmit = (data: PersonalDetailsFormData) => {
    setPersonalDetails(data)
    markStepComplete('personal')
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Personal Details
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enter your contact information for the resume header.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            required
            error={errors.fullName?.message}
            {...register('fullName')}
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            required
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            required
            error={errors.phone?.message}
            {...register('phone')}
          />
          <Input
            label="Location"
            placeholder="New York, NY"
            required
            error={errors.location?.message}
            {...register('location')}
          />
        </div>

        <Input
          label="LinkedIn URL"
          type="url"
          placeholder="https://linkedin.com/in/johndoe"
          helperText="Optional but recommended"
          error={errors.linkedIn?.message}
          {...register('linkedIn')}
        />

        <Textarea
          label="Professional Summary"
          placeholder="Brief summary of your professional background and key achievements..."
          helperText="Optional. You can also have AI generate this later."
          rows={4}
          maxLength={500}
          showCharCount
          value={summaryValue}
          error={errors.professionalSummary?.message}
          {...register('professionalSummary')}
        />
      </div>

      <WizardNavigation />
    </form>
  )
}
