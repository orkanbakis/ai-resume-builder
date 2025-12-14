import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TagInput } from '@/components/ui'
import { WizardNavigation } from '../WizardNavigation'
import { useResumeStore } from '@/store/resumeStore'
import { useWizardStore } from '@/store/wizardStore'
import { skillsSchema, type SkillsFormData } from '@/utils/validation'

const SUGGESTED_SKILLS: Record<string, string[]> = {
  Technology: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'SQL',
    'AWS',
    'Docker',
    'Git',
    'Agile',
  ],
  Finance: [
    'Financial Analysis',
    'Excel',
    'Financial Modeling',
    'Risk Management',
    'Bloomberg',
    'SQL',
    'Python',
    'Accounting',
    'Budgeting',
    'Forecasting',
  ],
  Healthcare: [
    'Patient Care',
    'EMR Systems',
    'HIPAA',
    'Clinical Documentation',
    'Medical Terminology',
    'CPR',
    'Team Collaboration',
    'Communication',
  ],
  Marketing: [
    'Digital Marketing',
    'SEO',
    'Content Strategy',
    'Social Media',
    'Google Analytics',
    'Copywriting',
    'Brand Management',
    'Email Marketing',
  ],
  default: [
    'Communication',
    'Leadership',
    'Problem Solving',
    'Project Management',
    'Team Collaboration',
    'Time Management',
    'Microsoft Office',
    'Data Analysis',
  ],
}

export function SkillsStep() {
  const { skills, setSkills, industry } = useResumeStore()
  const { nextStep, markStepComplete } = useWizardStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: skills.length > 0 ? skills : [],
    },
  })

  const currentSkills = watch('skills')
  const suggestedSkills = SUGGESTED_SKILLS[industry || 'default'] || SUGGESTED_SKILLS.default

  const handleAddSuggestion = (skill: string) => {
    if (!currentSkills.includes(skill)) {
      setValue('skills', [...currentSkills, skill])
    }
  }

  const onSubmit = (data: SkillsFormData) => {
    setSkills(data.skills)
    markStepComplete('skills')
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Skills
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add your professional skills. Include both technical and soft skills.
          </p>
        </div>

        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <TagInput
              label="Your Skills"
              value={field.value}
              onChange={field.onChange}
              placeholder="Type a skill and press Enter"
              error={errors.skills?.message}
              helperText="Add at least 3 skills"
            />
          )}
        />

        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Suggested Skills for {industry || 'Your Industry'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill) => {
              const isAdded = currentSkills.includes(skill)
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleAddSuggestion(skill)}
                  disabled={isAdded}
                  className={`
                    px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${
                      isAdded
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 cursor-default'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {isAdded ? '✓ ' : '+ '}
                  {skill}
                </button>
              )
            })}
          </div>
        </div>

        {currentSkills.length > 0 && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Added Skills ({currentSkills.length})
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentSkills.join(' • ')}
            </p>
          </div>
        )}
      </div>

      <WizardNavigation isNextDisabled={currentSkills.length < 3} />
    </form>
  )
}
