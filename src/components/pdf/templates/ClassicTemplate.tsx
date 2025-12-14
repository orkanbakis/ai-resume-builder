import { View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import type { ResumeData } from '@/types/resume'

interface ClassicTemplateProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
}

export function ClassicTemplate({ data, aiBullets }: ClassicTemplateProps) {
  const { personalDetails, workExperience, education, skills, certifications, languages } = data

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalDetails.fullName}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{personalDetails.email}</Text>
          <Text style={styles.contactItem}>{personalDetails.phone}</Text>
          <Text style={styles.contactItem}>{personalDetails.location}</Text>
          {personalDetails.linkedIn && (
            <Link src={personalDetails.linkedIn} style={styles.link}>
              LinkedIn
            </Link>
          )}
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Professional Summary */}
      {personalDetails.professionalSummary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{personalDetails.professionalSummary}</Text>
        </View>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {workExperience.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.title}</Text>
              <View style={styles.companyRow}>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.dates}>
                  {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}
                </Text>
              </View>
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

      {/* Education */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={styles.educationItem}>
              <Text style={styles.degree}>
                {edu.degree} in {edu.fieldOfStudy}
              </Text>
              <View style={styles.companyRow}>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.dates}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
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
          <Text style={styles.skillsText}>{skills.join(', ')}</Text>
        </View>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {certifications.map((cert) => (
            <Text key={cert.id} style={styles.certItem}>
              {cert.name} - {cert.issuer}
              {cert.date && ` (${cert.date})`}
            </Text>
          ))}
        </View>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text style={styles.skillsText}>
            {languages.map((lang) => `${lang.name} (${lang.proficiency})`).join(', ')}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Times-Roman',
    fontSize: 11,
    color: '#000000',
  },
  header: {
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactItem: {
    fontSize: 10,
  },
  link: {
    fontSize: 10,
    color: '#000000',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  company: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
  },
  dates: {
    fontSize: 10,
  },
  bulletList: {
    marginLeft: 10,
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
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  institution: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
  },
  honors: {
    fontSize: 10,
  },
  gpa: {
    fontSize: 10,
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  certItem: {
    fontSize: 10,
    marginBottom: 2,
  },
})
