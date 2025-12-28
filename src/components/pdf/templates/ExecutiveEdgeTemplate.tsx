import { View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import type { ResumeData } from '@/types/resume'

// Executive Edge Template - Executive/Leadership Style
// Features: Refined serif typography, gold/bronze accents, generous whitespace
// Best for: C-Suite, Directors, VPs, Senior leaders

interface ExecutiveEdgeTemplateProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
}

export function ExecutiveEdgeTemplate({ data, aiBullets }: ExecutiveEdgeTemplateProps) {
  // Extract all the data we need from the resume
  const { personalDetails, workExperience, education, skills, certifications, languages } = data

  return (
    <View style={styles.container}>
      {/* Header Section - Elegant centered layout */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalDetails.fullName}</Text>
        {personalDetails.title && <Text style={styles.title}>{personalDetails.title}</Text>}
        <View style={styles.headerDivider} />
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{personalDetails.email}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.contactItem}>{personalDetails.phone}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.contactItem}>{personalDetails.location}</Text>
        </View>
        {personalDetails.linkedIn && (
          <Link src={personalDetails.linkedIn} style={styles.link}>
            {personalDetails.linkedIn.replace('https://', '')}
          </Link>
        )}
      </View>

      {/* Executive Summary - Premium label for leadership roles */}
      {personalDetails.professionalSummary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.summaryText}>{personalDetails.professionalSummary}</Text>
        </View>
      )}

      {/* Professional Experience - Premium formatting */}
      {workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {workExperience.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.jobTitle}>{exp.title}</Text>
                <Text style={styles.dates}>
                  {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}
                </Text>
              </View>
              <Text style={styles.company}>{exp.company}</Text>
              {aiBullets[exp.id]?.length > 0 && (
                <View style={styles.bulletList}>
                  {aiBullets[exp.id].map((bullet, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bullet}>■</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education - Refined styling */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={styles.educationItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.degree}>
                  {edu.degree} in {edu.fieldOfStudy}
                </Text>
                <Text style={styles.dates}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
              <Text style={styles.institution}>{edu.institution}</Text>
              {edu.honors && <Text style={styles.honors}>{edu.honors}</Text>}
              {edu.gpa && <Text style={styles.gpa}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Core Competencies - Executive label for skills */}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Competencies</Text>
          <Text style={styles.skillsText}>{skills.join('   •   ')}</Text>
        </View>
      )}

      {/* Certifications & Credentials */}
      {certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications & Credentials</Text>
          {certifications.map((cert) => (
            <View key={cert.id} style={styles.certItem}>
              <Text style={styles.certName}>{cert.name}</Text>
              <Text style={styles.certIssuer}>
                {cert.issuer}
                {cert.date && ` • ${cert.date}`}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text style={styles.skillsText}>
            {languages.map((lang) => `${lang.name} (${lang.proficiency})`).join('   •   ')}
          </Text>
        </View>
      )}
    </View>
  )
}

// Styles for the Executive Edge template
const styles = StyleSheet.create({
  // Main container - refined serif typography
  container: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    color: '#2C2C2C',
  },

  // Header styles - elegant centered layout
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: '#2C2C2C',
    marginBottom: 6,
  },
  title: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 10,
    letterSpacing: 1,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#8B7355', // Gold/bronze accent
    marginHorizontal: 100,
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  contactItem: {
    fontSize: 9,
    color: '#4a4a4a',
  },
  separator: {
    fontSize: 9,
    color: '#8B7355', // Gold accent
    marginHorizontal: 10,
  },
  link: {
    fontSize: 9,
    color: '#8B7355', // Gold accent
    textDecoration: 'none',
  },

  // Section styles - refined with gold accents
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#2C2C2C',
    borderBottomWidth: 0.5,
    borderBottomColor: '#8B7355', // Gold underline
    paddingBottom: 4,
    marginBottom: 10,
  },

  // Summary styles - generous spacing
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#4a4a4a',
    textAlign: 'justify',
  },

  // Experience styles
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#2C2C2C',
  },
  dates: {
    fontSize: 9,
    color: '#666666',
    fontFamily: 'Times-Italic',
  },
  company: {
    fontSize: 10,
    color: '#4a4a4a',
    marginBottom: 6,
  },
  bulletList: {
    marginTop: 4,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    fontSize: 6,
    color: '#8B7355', // Gold square bullet
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 10,
    flex: 1,
    lineHeight: 1.5,
    color: '#4a4a4a',
  },

  // Education styles
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#2C2C2C',
  },
  institution: {
    fontSize: 10,
    color: '#4a4a4a',
  },
  honors: {
    fontSize: 9,
    color: '#666666',
    fontFamily: 'Times-Italic',
    marginTop: 2,
  },
  gpa: {
    fontSize: 9,
    color: '#666666',
  },

  // Skills styles - refined spacing
  skillsText: {
    fontSize: 10,
    color: '#4a4a4a',
    lineHeight: 1.6,
  },

  // Certification styles
  certItem: {
    marginBottom: 6,
  },
  certName: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    color: '#2C2C2C',
  },
  certIssuer: {
    fontSize: 9,
    color: '#666666',
  },
})
