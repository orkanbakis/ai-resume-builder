import { useWizardStore } from '@/store/wizardStore'
import { WizardProgress } from './WizardProgress'
import { PersonalDetailsStep } from './steps/PersonalDetailsStep'
import { IndustryJobLevelStep } from './steps/IndustryJobLevelStep'
import { WorkExperienceStep } from './steps/WorkExperienceStep'
import { EducationStep } from './steps/EducationStep'
import { SkillsStep } from './steps/SkillsStep'
import { OptionalSectionsStep } from './steps/OptionalSectionsStep'
import { TemplateSelectionStep } from './steps/TemplateSelectionStep'
import { PreviewStep } from './steps/PreviewStep'
import { Card } from '@/components/ui/Card'

export function WizardContainer() {
  const { currentStep } = useWizardStore()

  const renderStep = () => {
    switch (currentStep) {
      case 'personal':
        return <PersonalDetailsStep />
      case 'industry':
        return <IndustryJobLevelStep />
      case 'experience':
        return <WorkExperienceStep />
      case 'education':
        return <EducationStep />
      case 'skills':
        return <SkillsStep />
      case 'optional':
        return <OptionalSectionsStep />
      case 'template':
        return <TemplateSelectionStep />
      case 'preview':
        return <PreviewStep />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <WizardProgress />
      <Card variant="bordered" className="mt-8">
        {renderStep()}
      </Card>
    </div>
  )
}
