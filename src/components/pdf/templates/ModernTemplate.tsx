import { View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import type { ResumeData } from '@/types/resume'

interface ModernTemplateProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
}

export function ModernTemplate({ data, aiBullets }: ModernTemplateProps) {
  const { personalDetails, workExperience, education, skills, certifications, languages } = data

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalDetails.fullName}</Text>
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
        <View style={styles.accentLine} />
      </View>

      {/* Professional Summary */}
      {personalDetails.professionalSummary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.summaryText}>{personalDetails.professionalSummary}</Text>
        </View>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
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

      {/* Education */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
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
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <Text style={styles.skillsText}>{skills.join(' • ')}</Text>
        </View>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
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
          <Text style={styles.sectionTitle}>LANGUAGES</Text>
          <Text style={styles.skillsText}>
            {languages.map((lang) => `${lang.name} (${lang.proficiency})`).join(' • ')}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a1a1a',
  },
  header: {
    marginBottom: 16,
    textAlign: 'center',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  contactItem: {
    fontSize: 9,
    color: '#666666',
  },
  separator: {
    fontSize: 9,
    color: '#999999',
    marginHorizontal: 6,
  },
  link: {
    fontSize: 9,
    color: '#2563eb',
    textDecoration: 'none',
  },
  accentLine: {
    height: 2,
    backgroundColor: '#2563eb',
    marginTop: 10,
    marginHorizontal: 150,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingBottom: 3,
  },
  summaryText: {
    fontSize: 9,
    color: '#4a4a4a',
    lineHeight: 1.5,
  },
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
    color: '#1a1a1a',
  },
  dates: {
    fontSize: 9,
    color: '#666666',
  },
  company: {
    fontSize: 9,
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
    fontSize: 9,
    color: '#2563eb',
    marginRight: 6,
  },
  bulletText: {
    fontSize: 9,
    color: '#4a4a4a',
    flex: 1,
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  institution: {
    fontSize: 9,
    color: '#4a4a4a',
  },
  honors: {
    fontSize: 9,
    color: '#666666',
    fontFamily: 'Helvetica-Oblique',
  },
  gpa: {
    fontSize: 9,
    color: '#666666',
  },
  skillsText: {
    fontSize: 9,
    color: '#4a4a4a',
    lineHeight: 1.5,
  },
  certItem: {
    marginBottom: 4,
  },
  certName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  certIssuer: {
    fontSize: 9,
    color: '#666666',
  },
})
