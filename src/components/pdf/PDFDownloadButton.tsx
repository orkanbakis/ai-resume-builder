import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { Download, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui'
import { ResumePDFDocument } from './PDFDocument'
import type { ResumeData, TemplateId } from '@/types/resume'

interface PDFDownloadButtonProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
  templateId: TemplateId
  className?: string
}

export function PDFDownloadButton({ data, aiBullets, templateId, className }: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Check if there's enough data to generate a meaningful PDF
  const hasMinimalData = data.personalDetails.fullName && data.personalDetails.email

  const handleDownload = async () => {
    if (!hasMinimalData) {
      setError('Please fill in at least your name and email before downloading')
      return
    }

    setError(null)
    setSuccess(false)
    setIsGenerating(true)

    try {
      const doc = <ResumePDFDocument data={data} aiBullets={aiBullets} templateId={templateId} />
      const blob = await pdf(doc).toBlob()

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const filename = data.personalDetails.fullName.trim()
        ? `${data.personalDetails.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf'
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Error generating PDF:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(`Failed to generate PDF: ${errorMessage}`)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className={className}>
      <Button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        leftIcon={
          isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )
        }
      >
        {isGenerating ? 'Generating PDF...' : 'Download PDF'}
      </Button>
      {error && (
        <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </p>
        </div>
      )}
      {success && (
        <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
            PDF downloaded successfully!
          </p>
        </div>
      )}
    </div>
  )
}
