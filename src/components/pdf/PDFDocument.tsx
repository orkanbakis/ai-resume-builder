import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import type { ResumeData, TemplateId } from '@/types/resume'
import {
  HeritageTemplate,
  ClarityTemplate,
  ImpactTemplate,
  PrecisionTemplate,
  ExecutiveEdgeTemplate,
} from './templates'

interface PDFDocumentProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
  templateId: TemplateId
}

// Map template IDs to their components
const templates = {
  heritage: HeritageTemplate,
  clarity: ClarityTemplate,
  impact: ImpactTemplate,
  precision: PrecisionTemplate,
  'executive-edge': ExecutiveEdgeTemplate,
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
