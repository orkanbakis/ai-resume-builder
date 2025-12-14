import { View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import type { ResumeData } from '@/types/resume'

interface ExecutiveTemplateProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
}

export function ExecutiveTemplate({ data, aiBullets }: ExecutiveTemplateProps) {
  const { personalDetails, workExperience, education, skills, certifications, languages, projects } = data

  return (
    <View style={styles.container}>
      {/* Header Section - Elegant, spacious */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalDetails.fullName}</Text>
        <View style={styles.headerDivider} />
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{personalDetails.email}</Text>
          <Text style={styles.contactSeparator}>•</Text>
          <Text style={styles.contactItem}>{personalDetails.phone}</Text>
          <Text style={styles.contactSeparator}>•</Text>
          <Text style={styles.contactItem}>{personalDetails.location}</Text>
        </View>
        {personalDetails.linkedIn && (
          <Link src={personalDetails.linkedIn} style={styles.link}>
            {personalDetails.linkedIn.replace('https://', '')}
          </Link>
        )}
      </View>

      {/* Executive Summary */}
      {personalDetails.professionalSummary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.summaryText}>{personalDetails.professionalSummary}</Text>
        </View>
      )}

      {/* Professional Experience */}
      {workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {workExperience.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <View>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                </View>
                <Text style={styles.dates}>
                  {exp.startDate} — {exp.isCurrentRole ? 'Present' : exp.endDate}
                </Text>
              </View>
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

      {/* Education */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={styles.educationItem}>
              <View style={styles.experienceHeader}>
                <View>
                  <Text style={styles.degree}>
                    {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                  </Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                </View>
                <Text style={styles.dates}>
                  {edu.startDate} — {edu.endDate}
                </Text>
              </View>
              {edu.honors && <Text style={styles.honors}>{edu.honors}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Core Competencies (Skills) */}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Competencies</Text>
          <View style={styles.skillsGrid}>
            {skills.map((skill, idx) => (
              <Text key={idx} style={styles.skillItem}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {projects.map((project) => (
            <View key={project.id} style={styles.projectItem}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectDesc}>{project.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Certifications & Languages in two columns */}
      {(certifications.length > 0 || languages.length > 0) && (
        <View style={styles.twoColumnSection}>
          {certifications.length > 0 && (
            <View style={styles.halfColumn}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {certifications.map((cert) => (
                <View key={cert.id} style={styles.certItem}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.certIssuer}>
                    {cert.issuer}{cert.date ? ` • ${cert.date}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {languages.length > 0 && (
            <View style={styles.halfColumn}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {languages.map((lang) => (
                <Text key={lang.id} style={styles.languageItem}>
                  {lang.name} — {lang.proficiency}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    color: '#2c2c2c',
  },
  header: {
    textAlign: 'center',
    marginBottom: 24,
    paddingBottom: 16,
  },
  name: {
    fontSize: 26,
    fontFamily: 'Times-Bold',
    color: '#1a1a1a',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#8b7355',
    marginHorizontal: 120,
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
  contactSeparator: {
    fontSize: 9,
    color: '#8b7355',
    marginHorizontal: 8,
  },
  link: {
    fontSize: 9,
    color: '#4a4a4a',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#8b7355',
  },
  summaryText: {
    fontSize: 10,
    color: '#3a3a3a',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 14,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#1a1a1a',
  },
  company: {
    fontSize: 10,
    color: '#4a4a4a',
    fontFamily: 'Times-Italic',
  },
  dates: {
    fontSize: 9,
    color: '#666666',
    textAlign: 'right',
  },
  bulletList: {
    marginTop: 6,
    paddingLeft: 4,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 6,
    color: '#8b7355',
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 10,
    color: '#3a3a3a',
    flex: 1,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#1a1a1a',
  },
  institution: {
    fontSize: 10,
    color: '#4a4a4a',
    fontFamily: 'Times-Italic',
  },
  honors: {
    fontSize: 9,
    color: '#666666',
    marginTop: 2,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    fontSize: 9,
    color: '#3a3a3a',
    backgroundColor: '#f5f5f5',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 2,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectName: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    color: '#1a1a1a',
  },
  projectDesc: {
    fontSize: 9,
    color: '#4a4a4a',
    lineHeight: 1.4,
  },
  twoColumnSection: {
    flexDirection: 'row',
    gap: 24,
  },
  halfColumn: {
    flex: 1,
  },
  certItem: {
    marginBottom: 6,
  },
  certName: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    color: '#1a1a1a',
  },
  certIssuer: {
    fontSize: 9,
    color: '#666666',
  },
  languageItem: {
    fontSize: 10,
    color: '#3a3a3a',
    marginBottom: 4,
  },
})
