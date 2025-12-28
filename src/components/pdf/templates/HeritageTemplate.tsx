import { View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import type { ResumeData } from '@/types/resume'

// Heritage Template - Classic/Traditional Style
// Features: Serif typography, centered header, gold accents, formal appearance

interface HeritageTemplateProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
}

export function HeritageTemplate({ data, aiBullets }: HeritageTemplateProps) {
  // Extract all the data we need from the resume
  const { personalDetails, workExperience, education, skills, certifications, languages } = data

  return (
    <View style={styles.container}>
      {/* Header Section - Centered with name and contact info */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalDetails.fullName}</Text>
        {personalDetails.title && <Text style={styles.title}>{personalDetails.title}</Text>}
        <View style={styles.divider} />
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{personalDetails.email}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.contactItem}>{personalDetails.phone}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.contactItem}>{personalDetails.location}</Text>
        </View>
        {personalDetails.linkedIn && (
          <Link src={personalDetails.linkedIn} style={styles.link}>
            {personalDetails.linkedIn.replace('https://', '')}
          </Link>
        )}
      </View>

      {/* Professional Summary - First section after header */}
      {personalDetails.professionalSummary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{personalDetails.professionalSummary}</Text>
        </View>
      )}

      {/* Work Experience - Listed from latest to oldest */}
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
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education - Listed from latest to oldest */}
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

      {/* Skills */}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.skillsText}>{skills.join('  •  ')}</Text>
        </View>
      )}

      {/* Certifications - Optional section */}
      {certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
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

      {/* Languages - Optional section */}
      {languages.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text style={styles.skillsText}>
            {languages.map((lang) => `${lang.name} (${lang.proficiency})`).join('  •  ')}
          </Text>
        </View>
      )}
    </View>
  )
}

// Styles for the Heritage template
const styles = StyleSheet.create({
  // Main container - serif font for classic feel
  container: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    color: '#000000',
  },

  // Header styles - centered layout
  header: {
    textAlign: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: {
    fontSize: 11,
    color: '#4a4a4a',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#8B7355', // Gold accent
    marginHorizontal: 120,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  contactItem: {
    fontSize: 9,
    color: '#333333',
  },
  separator: {
    fontSize: 9,
    color: '#8B7355', // Gold accent
    marginHorizontal: 8,
  },
  link: {
    fontSize: 9,
    color: '#8B7355', // Gold accent
    textDecoration: 'none',
  },

  // Section styles
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#000000',
    borderBottomWidth: 0.5,
    borderBottomColor: '#8B7355', // Gold underline
    paddingBottom: 3,
    marginBottom: 8,
  },

  // Summary styles
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
    textAlign: 'justify',
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
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#000000',
  },
  dates: {
    fontSize: 9,
    color: '#666666',
  },
  company: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
    color: '#4a4a4a',
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
    color: '#8B7355', // Gold bullet
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
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#000000',
  },
  institution: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
    color: '#4a4a4a',
  },
  honors: {
    fontSize: 9,
    color: '#666666',
    marginTop: 2,
  },
  gpa: {
    fontSize: 9,
    color: '#666666',
  },

  // Skills styles
  skillsText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5,
  },

  // Certification styles
  certItem: {
    marginBottom: 4,
  },
  certName: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    color: '#000000',
  },
  certIssuer: {
    fontSize: 9,
    color: '#666666',
  },
})
