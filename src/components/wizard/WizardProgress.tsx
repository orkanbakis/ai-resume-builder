import { Check } from 'lucide-react'
import { useWizardStore } from '@/store/wizardStore'
import { WIZARD_STEPS, WIZARD_STEP_INFO } from '@/types/wizard'

export function WizardProgress() {
  const { currentStep, completedSteps, goToStep, canNavigateToStep } = useWizardStore()

  return (
    <div className="w-full">
      {/* Desktop: Horizontal stepper */}
      <div className="hidden lg:block">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {WIZARD_STEPS.map((step, index) => {
              const stepInfo = WIZARD_STEP_INFO[step]
              const isCompleted = completedSteps.has(step)
              const isCurrent = currentStep === step
              const canNavigate = canNavigateToStep(step)
              const isLast = index === WIZARD_STEPS.length - 1

              return (
                <li key={step} className={`relative ${isLast ? '' : 'flex-1'}`}>
                  <div className="flex items-center">
                    <button
                      onClick={() => canNavigate && goToStep(step)}
                      disabled={!canNavigate}
                      className={`relative flex flex-col items-center group ${
                        canNavigate ? 'cursor-pointer' : 'cursor-not-allowed'
                      }`}
                    >
                      <span
                        className={`
                          flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors z-10
                          ${
                            isCompleted
                              ? 'bg-primary-600 border-primary-600 dark:bg-primary-500 dark:border-primary-500'
                              : isCurrent
                              ? 'border-primary-600 bg-white dark:border-primary-500 dark:bg-gray-900'
                              : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900'
                          }
                        `}
                      >
                        {isCompleted ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <span
                            className={`text-xs font-medium ${
                              isCurrent
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {index + 1}
                          </span>
                        )}
                      </span>
                      <span
                        className={`mt-1 text-[10px] font-medium text-center w-16 leading-tight ${
                          isCurrent
                            ? 'text-primary-600 dark:text-primary-400'
                            : isCompleted
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {stepInfo.title}
                      </span>
                    </button>
                    {!isLast && (
                      <div
                        className={`flex-1 h-0.5 mx-2 ${
                          isCompleted
                            ? 'bg-primary-600 dark:bg-primary-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>

      {/* Mobile/Tablet: Compact stepper */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {WIZARD_STEP_INFO[currentStep].title}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Step {WIZARD_STEPS.indexOf(currentStep) + 1} of {WIZARD_STEPS.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((WIZARD_STEPS.indexOf(currentStep) + 1) / WIZARD_STEPS.length) * 100
              }%`,
            }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {WIZARD_STEP_INFO[currentStep].description}
        </p>
      </div>
    </div>
  )
}
