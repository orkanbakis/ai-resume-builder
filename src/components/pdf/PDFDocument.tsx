import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import type { ResumeData, TemplateId } from '@/types/resume'
import { ClassicTemplate, ModernTemplate, CompactTemplate, ExecutiveTemplate, CanvaTemplate } from './templates'

interface PDFDocumentProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
  templateId: TemplateId
}

const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  compact: CompactTemplate,
  executive: ExecutiveTemplate,
  canva: CanvaTemplate,
}

export function ResumePDFDocument({ data, aiBullets, templateId }: PDFDocumentProps) {
  const Template = templates[templateId]

  return (
    <Document
      title={`${data.personalDetails.fullName} - Resume`}
      author={data.personalDetails.fullName}
      subject="Professional Resume"
      keywords="resume, cv, professional"
    >
      <Page size="A4" style={styles.page}>
        <Template data={data} aiBullets={aiBullets} />
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
})
