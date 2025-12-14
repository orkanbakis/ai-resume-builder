import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '@/types/resume';

interface CanvaTemplateProps {
  data: ResumeData;
  aiBullets: Record<string, string[]>;
}

// Phone icon SVG path

// Email icon SVG

// Location icon SVG

export function CanvaTemplate({ data, aiBullets }: CanvaTemplateProps) {
  const {
    personalDetails,
    workExperience,
    education,
    skills,
    certifications,
    languages,
    projects,
  } = data;

  return (
    <View style={styles.container}>
      {/* Header Section - Centered */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {personalDetails.fullName || 'Your Name'}
        </Text>
        {personalDetails.professionalSummary && (
          <>
            <Text style={styles.title}>Professional</Text>
            <View style={styles.titleUnderline} />
          </>
        )}
        <View style={styles.contactRow}>
          <Text style={styles.contactText}>
            {personalDetails.location || 'City, Country'}
            {personalDetails.phone ? ` | ${personalDetails.phone}` : ''}
            {personalDetails.email ? ` | ${personalDetails.email}` : ''}
          </Text>
        </View>
        <View style={styles.headerDivider} />
      </View>

      {/* About Section */}
      {personalDetails.professionalSummary && (
        <View style={styles.section}>
          <Text style={styles.aboutText}>
            {personalDetails.professionalSummary}
          </Text>
        </View>
      )}

      {/* Skills - Area of Expertise */}
      {skills.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AREA OF EXPERTISE</Text>
            <View style={styles.sectionLine} />
          </View>
          <View style={styles.skillsGrid}>
            {skills.map((skill, idx) => (
              <Text key={idx} style={styles.skillItem}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
            <View style={styles.sectionLine} />
          </View>
          {workExperience.map((exp) => (
            <View key={exp.id} style={styles.expItem}>
              <View style={styles.expHeader}>
                <Text style={styles.expTitleCompany}>
                  {exp.title}, {exp.company}
                </Text>
                <Text style={styles.expDates}>
                  {exp.startDate} -{' '}
                  {exp.isCurrentRole ? 'Present' : exp.endDate}
                </Text>
              </View>
              {aiBullets[exp.id]?.length > 0 && (
                <View style={styles.expBullets}>
                  {aiBullets[exp.id].map((bullet, idx) => (
                    <View key={idx} style={styles.bulletRow}>
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={styles.sectionLine} />
          </View>
          {education.map((edu) => (
            <View key={edu.id} style={styles.eduItem}>
              <View style={styles.expHeader}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.expDates}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
              <Text style={styles.eduInstitution}>{edu.institution}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Additional Information */}
      {(languages.length > 0 ||
        certifications.length > 0 ||
        projects.length > 0) && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ADDITIONAL INFORMATION</Text>
            <View style={styles.sectionLine} />
          </View>

          {languages.length > 0 && (
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.boldText}>Languages: </Text>
                {languages.map((lang) => lang.name).join(', ')}.
              </Text>
            </View>
          )}

          {certifications.length > 0 && (
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.boldText}>Certifications: </Text>
                {certifications.map((cert) => cert.name).join(', ')}.
              </Text>
            </View>
          )}

          {projects.length > 0 && (
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.boldText}>Projects: </Text>
                {projects.map((project) => project.name).join(', ')}.
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a1a1a',
  },

  // Header - Centered
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: '#1a1a1a',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  titleUnderline: {
    width: 60,
    height: 1,
    backgroundColor: '#1a1a1a',
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 9,
    color: '#333333',
  },
  headerDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#1a1a1a',
  },

  // Sections
  section: {
    marginBottom: 14,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    letterSpacing: 1,
    marginBottom: 4,
  },
  sectionLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#1a1a1a',
  },

  // About
  aboutText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5,
    textAlign: 'justify',
  },

  // Skills Grid
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    fontSize: 10,
    color: '#333333',
    width: '33%',
    marginBottom: 4,
  },

  // Experience
  expItem: {
    marginBottom: 12,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  expTitleCompany: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    flex: 1,
    paddingRight: 10,
  },
  expDates: {
    fontSize: 10,
    color: '#1a1a1a',
  },
  expBullets: {
    marginTop: 2,
  },

  // Education
  eduItem: {
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  eduInstitution: {
    fontSize: 10,
    color: '#333333',
  },

  // Bullets
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 4,
  },
  bullet: {
    fontSize: 10,
    color: '#1a1a1a',
    marginRight: 8,
    width: 8,
  },
  bulletText: {
    fontSize: 10,
    color: '#333333',
    flex: 1,
    lineHeight: 1.5,
  },
  boldText: {
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
});
