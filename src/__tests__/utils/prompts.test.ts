import { describe, it, expect } from 'vitest'
import {
  buildBulletPointPrompt,
  buildProfessionalSummaryPrompt,
  parseBulletPoints,
} from '@/utils/prompts'

describe('AI Prompts', () => {
  describe('buildBulletPointPrompt', () => {
    it('should generate prompt with all required fields', () => {
      const prompt = buildBulletPointPrompt(
        'Software Engineer',
        'Tech Corp',
        'Built web applications',
        'Technology',
        'Mid-level'
      )

      expect(prompt).toContain('Software Engineer')
      expect(prompt).toContain('Tech Corp')
      expect(prompt).toContain('Built web applications')
      expect(prompt).toContain('Technology')
    })

    it('should include job level guidance for senior level', () => {
      const prompt = buildBulletPointPrompt(
        'Senior Engineer',
        'Corp',
        'Led team',
        'Technology',
        'Senior'
      )

      expect(prompt).toContain('expertise')
    })

    it('should include job level guidance for executive level', () => {
      const prompt = buildBulletPointPrompt(
        'CTO',
        'Startup',
        'Directed technology strategy',
        'Technology',
        'Executive'
      )

      expect(prompt).toContain('strategic')
    })

    it('should include industry-specific terminology', () => {
      const prompt = buildBulletPointPrompt(
        'Developer',
        'Company',
        'Developed apps',
        'Technology',
        'Mid-level'
      )

      expect(prompt).toContain('agile')
    })
  })

  describe('buildProfessionalSummaryPrompt', () => {
    it('should generate summary prompt with career info', () => {
      const prompt = buildProfessionalSummaryPrompt(
        'John Doe',
        'Technology',
        'Senior',
        'Software Engineer',
        ['JavaScript', 'React']
      )

      expect(prompt).toContain('John Doe')
      expect(prompt).toContain('Technology')
      expect(prompt).toContain('Software Engineer')
      expect(prompt).toContain('JavaScript')
    })

    it('should include years of experience when provided', () => {
      const prompt = buildProfessionalSummaryPrompt(
        'Jane Doe',
        'Finance',
        'Manager',
        'Financial Analyst',
        ['Excel', 'Python'],
        5
      )

      expect(prompt).toContain('Years of Experience: 5')
    })
  })

  describe('parseBulletPoints', () => {
    it('should parse bullet character (•) bullet points', () => {
      const text = `• First bullet point
• Second bullet point
• Third bullet point`

      const bullets = parseBulletPoints(text)
      expect(bullets).toHaveLength(3)
      expect(bullets[0]).toBe('First bullet point')
      expect(bullets[1]).toBe('Second bullet point')
    })

    it('should parse dash bullet points', () => {
      const text = `- First point
- Second point
- Third point`

      const bullets = parseBulletPoints(text)
      expect(bullets).toHaveLength(3)
      expect(bullets[0]).toBe('First point')
    })

    it('should parse asterisk bullet points', () => {
      const text = `* Point one
* Point two`

      const bullets = parseBulletPoints(text)
      expect(bullets).toHaveLength(2)
    })

    it('should handle mixed formats (dash and asterisk)', () => {
      const text = `- First
* Second
• Third`

      const bullets = parseBulletPoints(text)
      expect(bullets).toHaveLength(3)
    })

    it('should return empty array for invalid input', () => {
      const bullets = parseBulletPoints('')
      expect(bullets).toHaveLength(0)
    })

    it('should ignore lines without bullet markers', () => {
      const text = `Header text
• Actual bullet
Some other text
- Another bullet`

      const bullets = parseBulletPoints(text)
      expect(bullets).toHaveLength(2)
      expect(bullets[0]).toBe('Actual bullet')
      expect(bullets[1]).toBe('Another bullet')
    })
  })
})
