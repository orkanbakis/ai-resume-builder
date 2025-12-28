import { View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import type { ResumeData } from '@/types/resume'

// Precision Template - ATS-Friendly Style
// Features: Simple structure, no colors, no graphics, maximum parseability
// Best for: Engineering, IT, Corporate, Government, Any ATS-heavy applications

interface PrecisionTemplateProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
}

export function PrecisionTemplate({ data, aiBullets }: PrecisionTemplateProps) {
  // Extract all the data we need from the resume
  const { personalDetails, workExperience, education, skills, certifications, languages } = data

  return (
    <View style={styles.container}>
      {/* Header Section - Simple, ATS-readable format */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalDetails.fullName}</Text>
        {personalDetails.title && <Text style={styles.title}>{personalDetails.title}</Text>}
        <Text style={styles.contactLine}>
          {personalDetails.email} | {personalDetails.phone} | {personalDetails.location}
        </Text>
        {personalDetails.linkedIn && (
          <Link src={personalDetails.linkedIn} style={styles.link}>
            {personalDetails.linkedIn.replace('https://', '')}
          </Link>
        )}
      </View>

      {/* Professional Summary - First section, clearly labeled */}
      {personalDetails.professionalSummary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUMMARY</Text>
          <View style={styles.sectionDivider} />
          <Text style={styles.summaryText}>{personalDetails.professionalSummary}</Text>
        </View>
      )}

      {/* Work Experience - Standard format, easy to parse */}
      {workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
          <View style={styles.sectionDivider} />
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
                      <Text style={styles.bullet}>-</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education - Standard format */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          <View style={styles.sectionDivider} />
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

      {/* Skills - Comma-separated for easy ATS parsing */}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <View style={styles.sectionDivider} />
          <Text style={styles.skillsText}>{skills.join(', ')}</Text>
        </View>
      )}

      {/* Certifications - Simple list format */}
      {certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
          <View style={styles.sectionDivider} />
          {certifications.map((cert) => (
            <Text key={cert.id} style={styles.certText}>
              {cert.name} - {cert.issuer}
              {cert.date && ` (${cert.date})`}
            </Text>
          ))}
        </View>
      )}

      {/* Languages - Simple list format */}
      {languages.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LANGUAGES</Text>
          <View style={styles.sectionDivider} />
          <Text style={styles.skillsText}>
            {languages.map((lang) => `${lang.name} (${lang.proficiency})`).join(', ')}
          </Text>
        </View>
      )}
    </View>
  )
}

// Styles for the Precision template - Simple, no colors
const styles = StyleSheet.create({
  // Main container - standard Helvetica for ATS compatibility
  container: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#000000',
  },

  // Header styles - simple and clear
  header: {
    marginBottom: 14,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  title: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 2,
  },
  link: {
    fontSize: 9,
    color: '#000000',
    textDecoration: 'none',
  },

  // Section styles - clear headings with simple dividers
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 8,
  },

  // Summary styles
  summaryText: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333333',
  },

  // Experience styles
  experienceItem: {
    marginBottom: 10,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  dates: {
    fontSize: 9,
    color: '#333333',
  },
  company: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 4,
  },
  bulletList: {
    marginTop: 4,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    fontSize: 10,
    marginRight: 6,
  },
  bulletText: {
    fontSize: 10,
    flex: 1,
    lineHeight: 1.4,
    color: '#333333',
  },

  // Education styles
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  institution: {
    fontSize: 10,
    color: '#333333',
  },
  honors: {
    fontSize: 9,
    color: '#333333',
    marginTop: 2,
  },
  gpa: {
    fontSize: 9,
    color: '#333333',
  },

  // Skills styles - simple comma-separated list
  skillsText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4,
  },

  // Certification styles
  certText: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 2,
  },
})
