import { Edit2 } from 'lucide-react'
import { Card } from '@/components/ui'
import { WizardNavigation } from '../WizardNavigation'
import { useResumeStore } from '@/store/resumeStore'
import { useWizardStore } from '@/store/wizardStore'
import { TEMPLATES } from '@/constants/templates'
import { PDFDownloadButton } from '@/components/pdf'
import { ResumePreview } from '@/components/resume/ResumePreview'

export function PreviewStep() {
  const resumeStore = useResumeStore()
  const { goToStep } = useWizardStore()

  const {
    personalDetails,
    workExperience,
    education,
    skills,
    certifications,
    languages,
    projects,
    aiBullets,
    selectedTemplate,
    industry,
    jobLevel,
  } = resumeStore

  const template = TEMPLATES.find((t) => t.id === selectedTemplate)

  // Build the resume data object for PDF generation
  const resumeData = {
    personalDetails,
    workExperience,
    education,
    skills,
    certifications,
    languages,
    projects,
    industry,
    jobLevel,
    selectedTemplate,
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Preview & Download
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review your resume and download when ready.
            </p>
          </div>
          <PDFDownloadButton
            data={resumeData}
            aiBullets={aiBullets}
            templateId={selectedTemplate}
          />
        </div>

        {/* Resume Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <Card variant="bordered" padding="none" className="overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-8">
                <div className="bg-white shadow-lg mx-auto max-w-[612px] aspect-[8.5/11] p-6 sm:p-8 overflow-hidden">
                  <ResumePreview
                    data={resumeData}
                    aiBullets={aiBullets}
                    templateId={selectedTemplate}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Summary Panel */}
          <div className="space-y-4">
            <Card variant="bordered">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Resume Summary
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Template</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {template?.name}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Industry</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {industry || '-'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Level</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {jobLevel || '-'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Positions</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {workExperience.length}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Education</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {education.length}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Skills</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {skills.length}
                  </dd>
                </div>
              </dl>
            </Card>

            <Card variant="bordered">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Quick Edit
              </h3>
              <div className="space-y-2">
                {[
                  { step: 'personal', label: 'Personal Details' },
                  { step: 'experience', label: 'Work Experience' },
                  { step: 'education', label: 'Education' },
                  { step: 'skills', label: 'Skills' },
                  { step: 'template', label: 'Template' },
                ].map(({ step, label }) => (
                  <button
                    key={step}
                    onClick={() => goToStep(step as any)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{label}</span>
                    <Edit2 className="h-4 w-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <WizardNavigation showNext={false} />
    </div>
  )
}
