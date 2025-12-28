import { describe, it, expect, beforeEach } from 'vitest'
import { useResumeStore } from '@/store/resumeStore'

describe('Resume Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useResumeStore.getState().reset()
  })

  describe('Personal Details', () => {
    it('should update personal details', () => {
      const store = useResumeStore.getState()
      store.setPersonalDetails({
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
        location: 'NYC',
      })

      const state = useResumeStore.getState()
      expect(state.personalDetails.fullName).toBe('John Doe')
      expect(state.personalDetails.email).toBe('john@example.com')
    })

    it('should merge personal details updates', () => {
      const store = useResumeStore.getState()
      store.setPersonalDetails({ fullName: 'John' })
      store.setPersonalDetails({ email: 'john@test.com' })

      const state = useResumeStore.getState()
      expect(state.personalDetails.fullName).toBe('John')
      expect(state.personalDetails.email).toBe('john@test.com')
    })
  })

  describe('Work Experience', () => {
    it('should add work experience', () => {
      const store = useResumeStore.getState()
      store.addWorkExperience({
        id: '1',
        company: 'Tech Corp',
        title: 'Engineer',
        startDate: '2020-01',
        endDate: '2023-01',
        isCurrentRole: false,
        responsibilities: 'Coding',
        bullets: [],
      })

      const state = useResumeStore.getState()
      expect(state.workExperience).toHaveLength(1)
      expect(state.workExperience[0].company).toBe('Tech Corp')
    })

    it('should update work experience', () => {
      const store = useResumeStore.getState()
      store.addWorkExperience({
        id: '1',
        company: 'Tech Corp',
        title: 'Engineer',
        startDate: '2020-01',
        endDate: '2023-01',
        isCurrentRole: false,
        responsibilities: 'Coding',
        bullets: [],
      })

      store.updateWorkExperience('1', { title: 'Senior Engineer' })

      const state = useResumeStore.getState()
      expect(state.workExperience[0].title).toBe('Senior Engineer')
    })

    it('should remove work experience', () => {
      const store = useResumeStore.getState()
      store.addWorkExperience({
        id: '1',
        company: 'Tech Corp',
        title: 'Engineer',
        startDate: '2020-01',
        endDate: '',
        isCurrentRole: true,
        responsibilities: 'Coding',
        bullets: [],
      })

      store.removeWorkExperience('1')

      const state = useResumeStore.getState()
      expect(state.workExperience).toHaveLength(0)
    })

    it('should reorder work experience', () => {
      const store = useResumeStore.getState()
      store.addWorkExperience({
        id: '1',
        company: 'First Corp',
        title: 'Engineer',
        startDate: '2020-01',
        endDate: '2021-01',
        isCurrentRole: false,
        responsibilities: '',
        bullets: [],
      })
      store.addWorkExperience({
        id: '2',
        company: 'Second Corp',
        title: 'Senior Engineer',
        startDate: '2021-01',
        endDate: '',
        isCurrentRole: true,
        responsibilities: '',
        bullets: [],
      })

      store.reorderWorkExperience(0, 1)

      const state = useResumeStore.getState()
      expect(state.workExperience[0].company).toBe('Second Corp')
      expect(state.workExperience[1].company).toBe('First Corp')
    })
  })

  describe('Education', () => {
    it('should add education', () => {
      const store = useResumeStore.getState()
      store.addEducation({
        id: '1',
        institution: 'MIT',
        degree: 'BS',
        fieldOfStudy: 'CS',
        startDate: '2016',
        endDate: '2020',
        gpa: '3.9',
        honors: '',
      })

      const state = useResumeStore.getState()
      expect(state.education).toHaveLength(1)
      expect(state.education[0].institution).toBe('MIT')
    })

    it('should remove education', () => {
      const store = useResumeStore.getState()
      store.addEducation({
        id: '1',
        institution: 'MIT',
        degree: 'BS',
        fieldOfStudy: 'CS',
        startDate: '2016',
        endDate: '2020',
        gpa: '',
        honors: '',
      })

      store.removeEducation('1')

      const state = useResumeStore.getState()
      expect(state.education).toHaveLength(0)
    })
  })

  describe('Skills', () => {
    it('should set skills', () => {
      const store = useResumeStore.getState()
      store.setSkills(['JavaScript', 'TypeScript', 'React'])

      const state = useResumeStore.getState()
      expect(state.skills).toHaveLength(3)
      expect(state.skills).toContain('React')
    })

    it('should add individual skill', () => {
      const store = useResumeStore.getState()
      store.addSkill('JavaScript')
      store.addSkill('React')

      const state = useResumeStore.getState()
      expect(state.skills).toHaveLength(2)
    })

    it('should remove skill', () => {
      const store = useResumeStore.getState()
      store.setSkills(['JavaScript', 'React'])
      store.removeSkill('JavaScript')

      const state = useResumeStore.getState()
      expect(state.skills).toHaveLength(1)
      expect(state.skills[0]).toBe('React')
    })
  })

  describe('Industry and Job Level', () => {
    it('should set industry', () => {
      const store = useResumeStore.getState()
      store.setIndustry('Technology')

      const state = useResumeStore.getState()
      expect(state.industry).toBe('Technology')
    })

    it('should set job level', () => {
      const store = useResumeStore.getState()
      store.setJobLevel('Senior')

      const state = useResumeStore.getState()
      expect(state.jobLevel).toBe('Senior')
    })
  })

  describe('Template Selection', () => {
    it('should set selected template', () => {
      const store = useResumeStore.getState()
      store.setTemplate('executive-edge')

      const state = useResumeStore.getState()
      expect(state.selectedTemplate).toBe('executive-edge')
    })
  })

  describe('AI Generated Content', () => {
    it('should set AI bullets for experience', () => {
      const store = useResumeStore.getState()
      store.setAIBullets('exp-1', ['Bullet 1', 'Bullet 2', 'Bullet 3'])

      const state = useResumeStore.getState()
      expect(state.aiBullets['exp-1']).toHaveLength(3)
      expect(state.aiBullets['exp-1'][0]).toBe('Bullet 1')
    })

    it('should update individual AI bullet', () => {
      const store = useResumeStore.getState()
      store.setAIBullets('exp-1', ['Bullet 1', 'Bullet 2'])
      store.updateAIBullet('exp-1', 0, 'Updated Bullet 1')

      const state = useResumeStore.getState()
      expect(state.aiBullets['exp-1'][0]).toBe('Updated Bullet 1')
    })

    it('should set AI summary', () => {
      const store = useResumeStore.getState()
      store.setAISummary('Experienced software engineer...')

      const state = useResumeStore.getState()
      expect(state.aiSummary).toBe('Experienced software engineer...')
    })
  })

  describe('Optional Sections', () => {
    it('should add and remove certifications', () => {
      const store = useResumeStore.getState()
      store.addCertification({
        id: '1',
        name: 'AWS Solutions Architect',
        issuer: 'Amazon',
        date: '2023',
      })

      let state = useResumeStore.getState()
      expect(state.certifications).toHaveLength(1)

      store.removeCertification('1')
      state = useResumeStore.getState()
      expect(state.certifications).toHaveLength(0)
    })

    it('should add and remove languages', () => {
      const store = useResumeStore.getState()
      store.addLanguage({
        id: '1',
        name: 'Spanish',
        proficiency: 'Professional',
      })

      let state = useResumeStore.getState()
      expect(state.languages).toHaveLength(1)

      store.removeLanguage('1')
      state = useResumeStore.getState()
      expect(state.languages).toHaveLength(0)
    })

    it('should add and remove projects', () => {
      const store = useResumeStore.getState()
      store.addProject({
        id: '1',
        name: 'Resume Builder',
        description: 'An AI-powered resume builder',
        url: '',
      })

      let state = useResumeStore.getState()
      expect(state.projects).toHaveLength(1)

      store.removeProject('1')
      state = useResumeStore.getState()
      expect(state.projects).toHaveLength(0)
    })
  })

  describe('Reset', () => {
    it('should reset all data', () => {
      const store = useResumeStore.getState()
      store.setPersonalDetails({
        fullName: 'John',
        email: 'john@test.com',
        phone: '555',
        location: 'NYC',
      })
      store.addWorkExperience({
        id: '1',
        company: 'Corp',
        title: 'Dev',
        startDate: '2020',
        endDate: '2023',
        isCurrentRole: false,
        responsibilities: 'Work',
        bullets: [],
      })
      store.setTemplate('heritage')

      store.reset()

      const state = useResumeStore.getState()
      expect(state.personalDetails.fullName).toBe('')
      expect(state.workExperience).toHaveLength(0)
      expect(state.selectedTemplate).toBe('clarity')
    })
  })
})
