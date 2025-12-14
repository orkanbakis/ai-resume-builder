import { View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import type { ResumeData } from '@/types/resume'

interface CompactTemplateProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
}

export function CompactTemplate({ data, aiBullets }: CompactTemplateProps) {
  const { personalDetails, workExperience, education, skills, certifications, languages, projects } = data

  return (
    <View style={styles.container}>
      {/* Two Column Layout */}
      <View style={styles.twoColumn}>
        {/* Left Column - Sidebar */}
        <View style={styles.sidebar}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{personalDetails.fullName}</Text>
          </View>

          {/* Contact */}
          <View style={styles.sideSection}>
            <Text style={styles.sideSectionTitle}>CONTACT</Text>
            <Text style={styles.contactItem}>{personalDetails.email}</Text>
            <Text style={styles.contactItem}>{personalDetails.phone}</Text>
            <Text style={styles.contactItem}>{personalDetails.location}</Text>
            {personalDetails.linkedIn && (
              <Link src={personalDetails.linkedIn} style={styles.link}>
                LinkedIn
              </Link>
            )}
          </View>

          {/* Skills */}
          {skills.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideSectionTitle}>SKILLS</Text>
              {skills.map((skill, idx) => (
                <Text key={idx} style={styles.skillItem}>
                  • {skill}
                </Text>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideSectionTitle}>EDUCATION</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.sideEducationItem}>
                  <Text style={styles.sideDegree}>{edu.degree}</Text>
                  <Text style={styles.sideInstitution}>{edu.institution}</Text>
                  <Text style={styles.sideDates}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideSectionTitle}>LANGUAGES</Text>
              {languages.map((lang) => (
                <Text key={lang.id} style={styles.skillItem}>
                  • {lang.name} ({lang.proficiency})
                </Text>
              ))}
            </View>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideSectionTitle}>CERTIFICATIONS</Text>
              {certifications.map((cert) => (
                <Text key={cert.id} style={styles.certItem}>
                  • {cert.name}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Right Column - Main Content */}
        <View style={styles.mainContent}>
          {/* Professional Summary */}
          {personalDetails.professionalSummary && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>PROFILE</Text>
              <Text style={styles.summaryText}>{personalDetails.professionalSummary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>EXPERIENCE</Text>
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

          {/* Projects */}
          {projects.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>PROJECTS</Text>
              {projects.map((project) => (
                <View key={project.id} style={styles.projectItem}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectDesc}>{project.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#333333',
  },
  twoColumn: {
    flexDirection: 'row',
  },
  sidebar: {
    width: '32%',
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginRight: 12,
  },
  mainContent: {
    flex: 1,
    paddingRight: 4,
  },
  header: {
    marginBottom: 12,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  sideSection: {
    marginBottom: 12,
  },
  sideSectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    letterSpacing: 0.5,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 2,
  },
  contactItem: {
    fontSize: 8,
    marginBottom: 2,
    color: '#555555',
  },
  link: {
    fontSize: 8,
    color: '#2563eb',
    textDecoration: 'none',
  },
  skillItem: {
    fontSize: 8,
    marginBottom: 1,
    color: '#444444',
  },
  sideEducationItem: {
    marginBottom: 6,
  },
  sideDegree: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
  },
  sideInstitution: {
    fontSize: 8,
    color: '#555555',
  },
  sideDates: {
    fontSize: 7,
    color: '#777777',
  },
  certItem: {
    fontSize: 8,
    marginBottom: 2,
    color: '#444444',
  },
  mainSection: {
    marginBottom: 10,
  },
  mainSectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    letterSpacing: 0.5,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 2,
  },
  summaryText: {
    fontSize: 8,
    color: '#444444',
    lineHeight: 1.4,
  },
  experienceItem: {
    marginBottom: 8,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  dates: {
    fontSize: 8,
    color: '#666666',
  },
  company: {
    fontSize: 8,
    color: '#555555',
    marginBottom: 3,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  bullet: {
    fontSize: 8,
    color: '#2563eb',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 8,
    color: '#444444',
    flex: 1,
    lineHeight: 1.3,
  },
  projectItem: {
    marginBottom: 6,
  },
  projectName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  projectDesc: {
    fontSize: 8,
    color: '#555555',
    lineHeight: 1.3,
  },
})
