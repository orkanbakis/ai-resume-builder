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

// Simple template previews using CSS - Visual mockups that match the PDF templates
function TemplatePreview({ templateId }: { templateId: TemplateId }) {
  const previewStyles: Record<TemplateId, React.ReactNode> = {
    // Heritage - Classic/Traditional with serif feel and gold accents
    heritage: (
      <div className="w-4/5 h-4/5 bg-white shadow-sm p-4 text-left font-serif">
        {/* Centered header with gold accent line */}
        <div className="text-center mb-3">
          <div className="h-3 w-1/2 bg-gray-900 mx-auto mb-1" />
          <div className="h-0.5 w-1/4 bg-amber-700 mx-auto mb-2" />
          <div className="h-1.5 w-2/3 bg-gray-300 mx-auto" />
        </div>
        {/* Section with gold underline */}
        <div className="mb-2">
          <div className="h-2 w-1/4 bg-gray-800 mb-1 border-b border-amber-700 pb-1" />
          <div className="h-1.5 w-full bg-gray-200 mb-1" />
          <div className="h-1.5 w-5/6 bg-gray-200" />
        </div>
        <div>
          <div className="h-2 w-1/4 bg-gray-800 mb-1 border-b border-amber-700 pb-1" />
          <div className="h-1.5 w-full bg-gray-200 mb-1" />
          <div className="h-1.5 w-3/4 bg-gray-200" />
        </div>
      </div>
    ),

    // Clarity - Modern/Minimalist with blue accent line
    clarity: (
      <div className="w-4/5 h-4/5 bg-white shadow-sm p-4 text-left">
        {/* Left-aligned header with blue accent */}
        <div className="mb-3">
          <div className="h-4 w-1/2 bg-gray-900 mb-1" />
          <div className="h-1.5 w-2/3 bg-gray-300 mb-2" />
          <div className="h-0.5 w-12 bg-blue-500" />
        </div>
        {/* Section with light gray underline */}
        <div className="mb-2">
          <div className="h-2 w-1/4 bg-gray-700 mb-1 border-b border-gray-200 pb-1" />
          <div className="flex gap-1 mb-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full mt-0.5 flex-shrink-0" />
            <div className="h-1.5 flex-1 bg-gray-200" />
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full mt-0.5 flex-shrink-0" />
            <div className="h-1.5 w-5/6 bg-gray-200" />
          </div>
        </div>
        <div>
          <div className="h-2 w-1/4 bg-gray-700 mb-1 border-b border-gray-200 pb-1" />
          <div className="h-1.5 w-full bg-gray-200" />
        </div>
      </div>
    ),

    // Impact - Creative with teal sidebar
    impact: (
      <div className="w-4/5 h-4/5 bg-white shadow-sm flex">
        {/* Teal sidebar */}
        <div className="w-1/3 bg-teal-600 p-2">
          <div className="h-2.5 w-full bg-white/90 mb-1" />
          <div className="h-1.5 w-3/4 bg-white/60 mb-3" />
          <div className="h-1.5 w-1/2 bg-white/80 mb-1 border-b border-white/30 pb-1" />
          <div className="h-1 w-full bg-white/50 mb-0.5" />
          <div className="h-1 w-3/4 bg-white/50 mb-2" />
          <div className="h-1.5 w-1/2 bg-white/80 mb-1 border-b border-white/30 pb-1" />
          <div className="h-1 w-full bg-white/50 mb-0.5" />
          <div className="h-1 w-full bg-white/50" />
        </div>
        {/* Main content */}
        <div className="flex-1 p-2">
          <div className="h-2 w-1/3 bg-teal-600 mb-1 border-b border-gray-200 pb-1" />
          <div className="h-1.5 w-full bg-gray-200 mb-0.5" />
          <div className="h-1.5 w-5/6 bg-gray-200 mb-2" />
          <div className="h-2 w-1/3 bg-teal-600 mb-1 border-b border-gray-200 pb-1" />
          <div className="h-1.5 w-full bg-gray-200 mb-0.5" />
          <div className="h-1.5 w-4/5 bg-gray-200" />
        </div>
      </div>
    ),

    // Precision - ATS-friendly, simple black and white
    precision: (
      <div className="w-4/5 h-4/5 bg-white shadow-sm p-4 text-left">
        {/* Simple header */}
        <div className="mb-3">
          <div className="h-3 w-2/5 bg-black mb-1" />
          <div className="h-1.5 w-3/4 bg-gray-400" />
        </div>
        {/* Simple sections with black underlines */}
        <div className="border-t border-black pt-2 mb-2">
          <div className="h-2 w-1/4 bg-black mb-1" />
          <div className="h-1.5 w-full bg-gray-300 mb-0.5" />
          <div className="h-1.5 w-5/6 bg-gray-300" />
        </div>
        <div className="border-t border-black pt-2 mb-2">
          <div className="h-2 w-1/4 bg-black mb-1" />
          <div className="h-1.5 w-full bg-gray-300" />
        </div>
        <div className="border-t border-black pt-2">
          <div className="h-2 w-1/5 bg-black mb-1" />
          <div className="h-1.5 w-4/5 bg-gray-300" />
        </div>
      </div>
    ),

    // Executive Edge - Premium with gold accents
    'executive-edge': (
      <div className="w-4/5 h-4/5 bg-white shadow-sm p-5 text-left font-serif">
        {/* Elegant centered header */}
        <div className="text-center mb-4">
          <div className="h-4 w-1/2 bg-gray-800 mx-auto mb-2" style={{ letterSpacing: '2px' }} />
          <div className="h-0.5 w-1/4 bg-amber-700 mx-auto mb-2" />
          <div className="h-1.5 w-1/2 bg-gray-300 mx-auto" />
        </div>
        {/* Section with gold accent */}
        <div className="mb-3">
          <div className="h-2 w-1/3 bg-gray-700 mb-1 border-b border-amber-600 pb-1" />
          <div className="h-1.5 w-full bg-gray-200 mb-1" />
          <div className="h-1.5 w-4/5 bg-gray-200" />
        </div>
        <div>
          <div className="h-2 w-1/3 bg-gray-700 mb-1 border-b border-amber-600 pb-1" />
          <div className="h-1.5 w-full bg-gray-200" />
        </div>
      </div>
    ),
  }

  return previewStyles[templateId] || null
}
