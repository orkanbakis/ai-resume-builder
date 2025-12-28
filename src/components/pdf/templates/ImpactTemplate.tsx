import { View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import type { ResumeData } from '@/types/resume'

// Impact Template - Creative/Bold Style
// Features: Two-column layout, teal sidebar, modern design, great for creative roles

interface ImpactTemplateProps {
  data: ResumeData
  aiBullets: Record<string, string[]>
}

export function ImpactTemplate({ data, aiBullets }: ImpactTemplateProps) {
  // Extract all the data we need from the resume
  const { personalDetails, workExperience, education, skills, certifications, languages } = data

  return (
    <View style={styles.container}>
      {/* Two-column layout */}
      <View style={styles.twoColumn}>
        {/* LEFT SIDEBAR - Teal background */}
        <View style={styles.sidebar}>
          {/* Name and Title */}
          <View style={styles.sidebarHeader}>
            <Text style={styles.name}>{personalDetails.fullName}</Text>
            {personalDetails.title && <Text style={styles.title}>{personalDetails.title}</Text>}
          </View>

          {/* Contact Info */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>CONTACT</Text>
            <Text style={styles.sidebarText}>{personalDetails.email}</Text>
            <Text style={styles.sidebarText}>{personalDetails.phone}</Text>
            <Text style={styles.sidebarText}>{personalDetails.location}</Text>
            {personalDetails.linkedIn && (
              <Link src={personalDetails.linkedIn} style={styles.sidebarLink}>
                LinkedIn
              </Link>
            )}
          </View>

          {/* Skills in Sidebar */}
          {skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>SKILLS</Text>
              {skills.map((skill, idx) => (
                <Text key={idx} style={styles.skillItem}>
                  {skill}
                </Text>
              ))}
            </View>
          )}

          {/* Languages in Sidebar */}
          {languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>LANGUAGES</Text>
              {languages.map((lang) => (
                <Text key={lang.id} style={styles.sidebarText}>
                  {lang.name} - {lang.proficiency}
                </Text>
              ))}
            </View>
          )}

          {/* Certifications in Sidebar */}
          {certifications.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>CERTIFICATIONS</Text>
              {certifications.map((cert) => (
                <View key={cert.id} style={styles.certItem}>
                  <Text style={styles.sidebarTextBold}>{cert.name}</Text>
                  <Text style={styles.sidebarTextSmall}>{cert.issuer}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* RIGHT MAIN CONTENT */}
        <View style={styles.mainContent}>
          {/* Professional Summary - First section */}
          {personalDetails.professionalSummary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SUMMARY</Text>
              <Text style={styles.summaryText}>{personalDetails.professionalSummary}</Text>
            </View>
          )}

          {/* Work Experience - Listed from latest to oldest */}
          {workExperience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
              {workExperience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  <View style={styles.experienceSubheader}>
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

          {/* Education - Listed from latest to oldest */}
          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.degree}>
                    {edu.degree} in {edu.fieldOfStudy}
                  </Text>
                  <View style={styles.experienceSubheader}>
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
        </View>
      </View>
    </View>
  )
}

// Styles for the Impact template
const styles = StyleSheet.create({
  // Main container
  container: {
    fontFamily: 'Helvetica',
    fontSize: 9,
  },

  // Two-column layout
  twoColumn: {
    flexDirection: 'row',
    minHeight: '100%',
  },

  // LEFT SIDEBAR STYLES
  sidebar: {
    width: '30%',
    backgroundColor: '#0D9488', // Teal color
    padding: 16,
    paddingTop: 20,
  },
  sidebarHeader: {
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  title: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  sidebarSection: {
    marginBottom: 16,
  },
  sidebarSectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  sidebarText: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 3,
  },
  sidebarTextBold: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
  },
  sidebarTextSmall: {
    fontSize: 7,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  sidebarLink: {
    fontSize: 8,
    color: '#FFFFFF',
    textDecoration: 'none',
    marginTop: 2,
  },
  skillItem: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
    paddingLeft: 8,
  },
  certItem: {
    marginBottom: 6,
  },

  // RIGHT MAIN CONTENT STYLES
  mainContent: {
    width: '70%',
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 8,
  },

  // Section styles
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#0D9488', // Teal accent
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  // Summary styles
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#4a4a4a',
  },

  // Experience styles
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
  },
  experienceSubheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  company: {
    fontSize: 9,
    color: '#4a4a4a',
  },
  dates: {
    fontSize: 8,
    color: '#666666',
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
    color: '#0D9488', // Teal bullet
    marginRight: 6,
  },
  bulletText: {
    fontSize: 9,
    flex: 1,
    lineHeight: 1.4,
    color: '#4a4a4a',
  },

  // Education styles
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
  },
  institution: {
    fontSize: 9,
    color: '#4a4a4a',
  },
  honors: {
    fontSize: 8,
    color: '#666666',
    fontFamily: 'Helvetica-Oblique',
    marginTop: 2,
  },
  gpa: {
    fontSize: 8,
    color: '#666666',
  },
})
