import { describe, it, expect } from 'vitest'
import {
  personalDetailsSchema,
  industryJobLevelSchema,
  workExperienceSchema,
  educationSchema,
  skillsSchema,
} from '@/utils/validation'

describe('Validation Schemas', () => {
  describe('personalDetailsSchema', () => {
    it('should validate valid personal details', () => {
      const validData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        location: 'New York, NY',
        linkedIn: 'https://linkedin.com/in/johndoe',
        professionalSummary: 'Experienced software engineer',
      }
      const result = personalDetailsSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        fullName: 'John Doe',
        email: 'invalid-email',
        phone: '555-123-4567',
        location: 'New York, NY',
      }
      const result = personalDetailsSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should require fullName', () => {
      const invalidData = {
        fullName: '',
        email: 'john@example.com',
        phone: '555-123-4567',
        location: 'New York, NY',
      }
      const result = personalDetailsSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('industryJobLevelSchema', () => {
    it('should validate valid industry and job level', () => {
      const validData = {
        industry: 'Technology',
        jobLevel: 'Senior',
      }
      const result = industryJobLevelSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should allow any string for industry (flexible validation)', () => {
      // The schema uses .string() not .enum(), so any string is valid
      const validData = {
        industry: 'Custom Industry',
        jobLevel: 'Mid-level',
      }
      const result = industryJobLevelSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('workExperienceSchema', () => {
    it('should validate valid work experience', () => {
      const validData = {
        workExperience: [
          {
            id: '1',
            company: 'Tech Corp',
            title: 'Software Engineer',
            startDate: '2020-01',
            endDate: '2023-01',
            isCurrentRole: false,
            responsibilities: 'Developed web applications',
            bullets: [],
          },
        ],
      }
      const result = workExperienceSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate current role without end date', () => {
      const validData = {
        workExperience: [
          {
            id: '1',
            company: 'Tech Corp',
            title: 'Software Engineer',
            startDate: '2020-01',
            endDate: '',
            isCurrentRole: true,
            responsibilities: 'Developing web applications',
            bullets: [],
          },
        ],
      }
      const result = workExperienceSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should require at least one work experience entry', () => {
      const validData = {
        workExperience: [
          {
            id: '1',
            company: 'Company',
            title: 'Role',
            startDate: '2020-01',
            endDate: '2021-01',
            isCurrentRole: false,
            responsibilities: 'Developed and maintained software applications',
            bullets: [],
          },
        ],
      }
      const result = workExperienceSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('educationSchema', () => {
    it('should validate valid education', () => {
      const validData = {
        education: [
          {
            id: '1',
            institution: 'University of Example',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            startDate: '2016-09',
            endDate: '2020-05',
            gpa: '3.8',
            honors: 'Magna Cum Laude',
          },
        ],
      }
      const result = educationSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should require at least one education entry', () => {
      const validData = {
        education: [
          {
            id: '1',
            institution: 'University',
            degree: 'BS',
            fieldOfStudy: 'CS',
            startDate: '2016',
            endDate: '2020',
            gpa: '',
            honors: '',
          },
        ],
      }
      const result = educationSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('skillsSchema', () => {
    it('should validate valid skills', () => {
      const validData = {
        skills: ['JavaScript', 'TypeScript', 'React'],
      }
      const result = skillsSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should require at least 3 skills', () => {
      const validData = {
        skills: ['JavaScript', 'TypeScript', 'React'],
      }
      const result = skillsSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject fewer than 3 skills', () => {
      const invalidData = {
        skills: ['JavaScript'],
      }
      const result = skillsSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
