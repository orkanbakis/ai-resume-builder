import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useWizardStore } from '@/store/wizardStore'
import { WIZARD_STEPS } from '@/types/wizard'

interface WizardNavigationProps {
  onNext?: () => void | Promise<void>
  onBack?: () => void
  nextLabel?: string
  backLabel?: string
  isNextDisabled?: boolean
  isNextLoading?: boolean
  showBack?: boolean
  showNext?: boolean
}

export function WizardNavigation({
  onNext,
  onBack,
  nextLabel,
  backLabel = 'Back',
  isNextDisabled = false,
  isNextLoading = false,
  showBack = true,
  showNext = true,
}: WizardNavigationProps) {
  const { currentStep, previousStep, nextStep } = useWizardStore()
  const currentIndex = WIZARD_STEPS.indexOf(currentStep)
  const isFirstStep = currentIndex === 0
  const isLastStep = currentIndex === WIZARD_STEPS.length - 1

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      previousStep()
    }
  }

  const handleNext = async () => {
    if (onNext) {
      await onNext()
    } else {
      nextStep()
    }
  }

  const defaultNextLabel = isLastStep ? 'Download Resume' : 'Continue'

  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
      <div>
        {showBack && !isFirstStep && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            {backLabel}
          </Button>
        )}
      </div>
      <div>
        {showNext && (
          <Button
            type={onNext ? 'button' : 'submit'}
            onClick={onNext ? handleNext : undefined}
            disabled={isNextDisabled}
            isLoading={isNextLoading}
            rightIcon={!isLastStep && !isNextLoading ? <ArrowRight className="h-4 w-4" /> : undefined}
          >
            {nextLabel || defaultNextLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
