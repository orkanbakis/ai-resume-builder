import { useResumeStore } from '@/store/resumeStore'
import { useWizardStore } from '@/store/wizardStore'
import { WizardNavigation } from '../WizardNavigation'
import { Card } from '@/components/ui'
import { TEMPLATES } from '@/constants/templates'
import type { TemplateId } from '@/types/resume'
import { Check } from 'lucide-react'

export function TemplateSelectionStep() {
  const { selectedTemplate, setTemplate } = useResumeStore()
  const { nextStep, markStepComplete } = useWizardStore()

  const handleSelect = (templateId: TemplateId) => {
    setTemplate(templateId)
  }

  const handleContinue = () => {
    markStepComplete('template')
    nextStep()
  }

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Choose Your Template
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Select a professional template that best represents your style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEMPLATES.map((template) => {
            const isSelected = selectedTemplate === template.id

            return (
              <Card
                key={template.id}
                variant="bordered"
                padding="none"
                selectable
                selected={isSelected}
                onClick={() => handleSelect(template.id)}
                className="overflow-hidden"
              >
                {/* Template Preview */}
                <div className="relative aspect-[8.5/11] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <TemplatePreview templateId={template.id} />
                  {isSelected && (
                    <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {template.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {template.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                    Best for: {template.bestFor.join(', ')}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      <WizardNavigation onNext={handleContinue} />
    </div>
  )
}

// Simple template previews using CSS
function TemplatePreview({ templateId }: { templateId: TemplateId }) {
  const previewStyles: Record<TemplateId, React.ReactNode> = {
    classic: (
      <div className="w-4/5 h-4/5 bg-white shadow-sm p-4 text-left">
        <div className="h-3 w-1/2 bg-gray-800 mb-2" />
        <div className="h-2 w-3/4 bg-gray-300 mb-4" />
        <div className="border-t border-gray-300 pt-2 mb-3">
          <div className="h-2 w-1/4 bg-gray-700 mb-1" />
          <div className="h-1.5 w-full bg-gray-200 mb-1" />
          <div className="h-1.5 w-5/6 bg-gray-200 mb-1" />
          <div className="h-1.5 w-4/5 bg-gray-200" />
        </div>
        <div className="border-t border-gray-300 pt-2">
          <div className="h-2 w-1/4 bg-gray-700 mb-1" />
          <div className="h-1.5 w-full bg-gray-200 mb-1" />
          <div className="h-1.5 w-3/4 bg-gray-200" />
        </div>
      </div>
    ),
    modern: (
      <div className="w-4/5 h-4/5 bg-white shadow-sm p-4 text-left">
        <div className="text-center mb-3">
          <div className="h-3 w-1/2 bg-gray-800 mx-auto mb-1" />
          <div className="h-1.5 w-2/3 bg-gray-300 mx-auto" />
          <div className="h-0.5 w-1/3 bg-primary-500 mx-auto mt-2" />
        </div>
        <div className="mb-3">
          <div className="h-2 w-1/4 bg-gray-700 mb-1 uppercase" style={{ letterSpacing: '1px' }} />
          <div className="h-1.5 w-full bg-gray-200 mb-1" />
          <div className="h-1.5 w-5/6 bg-gray-200" />
        </div>
        <div>
          <div className="h-2 w-1/4 bg-gray-700 mb-1 uppercase" style={{ letterSpacing: '1px' }} />
          <div className="h-1.5 w-full bg-gray-200 mb-1" />
          <div className="h-1.5 w-4/5 bg-gray-200" />
        </div>
      </div>
    ),
    compact: (
      <div className="w-4/5 h-4/5 bg-white shadow-sm p-3 text-left flex gap-3">
        <div className="w-1/3 border-r border-gray-200 pr-3">
          <div className="h-2.5 w-full bg-gray-800 mb-2" />
          <div className="h-1.5 w-full bg-gray-300 mb-1" />
          <div className="h-1.5 w-3/4 bg-gray-300 mb-3" />
          <div className="h-2 w-1/2 bg-gray-600 mb-1" />
          <div className="h-1 w-full bg-gray-200 mb-0.5" />
          <div className="h-1 w-full bg-gray-200 mb-0.5" />
          <div className="h-1 w-3/4 bg-gray-200" />
        </div>
        <div className="flex-1">
          <div className="mb-2">
            <div className="h-2 w-1/3 bg-gray-700 mb-1" />
            <div className="h-1 w-full bg-gray-200 mb-0.5" />
            <div className="h-1 w-5/6 bg-gray-200 mb-0.5" />
            <div className="h-1 w-4/5 bg-gray-200" />
          </div>
          <div>
            <div className="h-2 w-1/3 bg-gray-700 mb-1" />
            <div className="h-1 w-full bg-gray-200 mb-0.5" />
            <div className="h-1 w-3/4 bg-gray-200" />
          </div>
        </div>
      </div>
    ),
    executive: (
      <div className="w-4/5 h-4/5 bg-white shadow-sm p-6 text-left">
        <div className="mb-6">
          <div className="h-4 w-2/3 bg-gray-800 mb-2" />
          <div className="h-2 w-1/2 bg-gray-400" />
        </div>
        <div className="mb-6">
          <div className="h-2 w-1/4 bg-gray-600 mb-2" />
          <div className="h-1.5 w-full bg-gray-200 mb-1.5" />
          <div className="h-1.5 w-5/6 bg-gray-200 mb-1.5" />
          <div className="h-1.5 w-4/5 bg-gray-200" />
        </div>
        <div>
          <div className="h-2 w-1/4 bg-gray-600 mb-2" />
          <div className="h-1.5 w-full bg-gray-200 mb-1.5" />
          <div className="h-1.5 w-3/4 bg-gray-200" />
        </div>
      </div>
    ),
    canva: (
      <div className="w-4/5 h-4/5 bg-white shadow-sm p-3 text-left">
        {/* Header with name and contact */}
        <div className="flex justify-between mb-3">
          <div>
            <div className="h-3 w-16 bg-gray-400 mb-0.5" />
            <div className="h-3 w-20 bg-gray-800" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 justify-end">
              <div className="h-2 w-2 rounded-full bg-teal-400" />
              <div className="h-1.5 w-12 bg-gray-300" />
            </div>
            <div className="flex items-center gap-1 justify-end">
              <div className="h-2 w-2 rounded-full bg-teal-400" />
              <div className="h-1.5 w-14 bg-gray-300" />
            </div>
            <div className="flex items-center gap-1 justify-end">
              <div className="h-2 w-2 rounded-full bg-teal-400" />
              <div className="h-1.5 w-10 bg-gray-300" />
            </div>
          </div>
        </div>
        {/* Two column body */}
        <div className="flex gap-3">
          <div className="w-1/3">
            <div className="h-2 w-3/4 bg-gray-700 mb-1" />
            <div className="h-1 w-full bg-gray-200 mb-0.5" />
            <div className="h-1 w-3/4 bg-gray-200 mb-2" />
            <div className="h-2 w-1/2 bg-gray-700 mb-1" />
            <div className="h-1 w-full bg-gray-200 mb-0.5" />
            <div className="h-1 w-full bg-gray-200" />
          </div>
          <div className="flex-1">
            <div className="h-2 w-1/3 bg-gray-700 mb-1" />
            <div className="h-1.5 w-full bg-gray-200 mb-0.5" />
            <div className="h-1 w-5/6 bg-gray-200 mb-0.5" />
            <div className="h-1 w-4/5 bg-gray-200 mb-2" />
            <div className="h-1.5 w-full bg-gray-200 mb-0.5" />
            <div className="h-1 w-3/4 bg-gray-200" />
          </div>
        </div>
      </div>
    ),
  }

  return previewStyles[templateId] || null
}
