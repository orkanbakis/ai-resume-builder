import Anthropic from '@anthropic-ai/sdk';
import type { Industry, JobLevel } from '@/types/resume';
import {
  buildBulletPointPrompt,
  buildProfessionalSummaryPrompt,
  parseBulletPoints,
} from '@/utils/prompts';

// Initialize client - API key should be in environment variables
// For local development, set VITE_ANTHROPIC_API_KEY in .env.local
const getClient = () => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY is not set. Please add VITE_ANTHROPIC_API_KEY to your .env.local file.'
    );
  }

  return new Anthropic({
    apiKey,
  });
};

interface GenerateBulletsParams {
  jobTitle: string;
  company: string;
  responsibilities: string;
  industry: Industry;
  jobLevel: JobLevel;
}

interface GenerateSummaryParams {
  fullName: string;
  industry: Industry;
  jobLevel: JobLevel;
  recentJobTitle: string;
  skills: string[];
  yearsExperience?: number;
}

export async function generateBulletPoints(
  params: GenerateBulletsParams
): Promise<string[]> {
  const { jobTitle, company, responsibilities, industry, jobLevel } = params;

  const prompt = buildBulletPointPrompt(
    jobTitle,
    company,
    responsibilities,
    industry,
    jobLevel
  );

  try {
    const client = getClient();
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      const bullets = parseBulletPoints(content.text);
      if (bullets.length === 0) {
        // If parsing failed, try to split by newlines
        return content.text
          .split('\n')
          .filter((line) => line.trim().length > 0)
          .slice(0, 5);
      }
      return bullets;
    }

    throw new Error('Unexpected response format from Claude');
  } catch (error) {
    console.error('Error generating bullet points:', error);
    throw error;
  }
}

export async function generateProfessionalSummary(
  params: GenerateSummaryParams
): Promise<string> {
  const {
    fullName,
    industry,
    jobLevel,
    recentJobTitle,
    skills,
    yearsExperience,
  } = params;

  const prompt = buildProfessionalSummaryPrompt(
    fullName,
    industry,
    jobLevel,
    recentJobTitle,
    skills,
    yearsExperience
  );

  try {
    const client = getClient();
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      return content.text.trim();
    }

    throw new Error('Unexpected response format from Claude');
  } catch (error) {
    console.error('Error generating professional summary:', error);
    throw error;
  }
}

// Mock functions for development without API key
export async function generateBulletPointsMock(
  params: GenerateBulletsParams
): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { jobTitle, jobLevel } = params;

  const mockBullets: Record<JobLevel, string[]> = {
    'Entry-level': [
      `Assisted senior ${jobTitle.toLowerCase()}s with daily operations and project deliverables`,
      `Completed comprehensive training program, gaining proficiency in key tools and methodologies`,
      `Collaborated with team members to support project goals and meet deadlines`,
      `Demonstrated initiative by volunteering for additional responsibilities`,
    ],
    'Mid-level': [
      `Managed end-to-end delivery of key projects, consistently meeting deadlines and quality standards`,
      `Collaborated with cross-functional teams to implement process improvements, increasing efficiency by 25%`,
      `Mentored 2 junior team members, helping them ramp up quickly on core competencies`,
      `Developed and maintained technical documentation, improving knowledge sharing across the team`,
    ],
    Senior: [
      `Led strategic initiatives that drove 40% improvement in team productivity and output quality`,
      `Architected and implemented scalable solutions that supported 3x growth in user base`,
      `Mentored team of 5 professionals, fostering skill development and career growth`,
      `Established best practices and standards adopted across the organization`,
    ],
    Manager: [
      `Directed team of 12 professionals, achieving 95% project delivery rate on time and within budget`,
      `Implemented performance management framework that improved team productivity by 30%`,
      `Managed annual budget of $2M, optimizing resource allocation to maximize ROI`,
      `Built and maintained relationships with key stakeholders across multiple departments`,
    ],
    Executive: [
      `Spearheaded digital transformation initiative generating $5M in annual cost savings`,
      `Built and scaled organization from 20 to 100+ employees across 3 international offices`,
      `Developed and executed 5-year strategic roadmap resulting in 200% revenue growth`,
      `Established C-suite partnerships driving strategic acquisitions and market expansion`,
    ],
  };

  return mockBullets[jobLevel] || mockBullets['Mid-level'];
}

export async function generateProfessionalSummaryMock(
  params: GenerateSummaryParams
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const { industry, jobLevel, skills } = params;

  const summaries: Record<JobLevel, string> = {
    'Entry-level': `Motivated ${industry} professional eager to contribute to team success. Recent graduate with strong foundation in ${skills
      .slice(0, 3)
      .join(
        ', '
      )}. Quick learner with excellent communication skills and passion for professional growth.`,
    'Mid-level': `Results-driven ${industry} professional with proven track record of delivering impactful projects. Expertise in ${skills
      .slice(0, 3)
      .join(
        ', '
      )} combined with strong analytical and problem-solving abilities. Committed to continuous improvement and team collaboration.`,
    Senior: `Strategic ${industry} leader with extensive experience driving innovation and operational excellence. Deep expertise in ${skills
      .slice(0, 3)
      .join(
        ', '
      )} with proven ability to mentor teams and deliver complex initiatives. Track record of implementing solutions that drive measurable business outcomes.`,
    Manager: `Dynamic ${industry} leader with proven track record of building and developing high-performing teams. Expertise in ${skills
      .slice(0, 3)
      .join(
        ', '
      )} combined with strong strategic planning and stakeholder management abilities. Passionate about fostering growth and driving organizational success.`,
    Executive: `Visionary ${industry} executive with extensive experience transforming organizations and driving sustainable growth. Proven track record of strategic leadership, P&L management, and building world-class teams. Expert in ${skills
      .slice(0, 3)
      .join(', ')} with passion for innovation and operational excellence.`,
  };

  return summaries[jobLevel] || summaries['Mid-level'];
}
