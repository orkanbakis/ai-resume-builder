import type { Industry, JobLevel } from '@/types/resume';

export const JOB_LEVEL_WRITING_GUIDANCE: Record<JobLevel, string> = {
  'Entry-level':
    'Emphasize foundational skills, hands-on learning, and practical experience. Focus on technologies used, responsibilities handled, training or internships completed, and proactive contribution. Avoid leadership or ownership claims unless explicitly stated.',

  'Mid-level':
    'Highlight solid technical execution, ownership of components or features, and collaboration within a team. Focus on responsibilities, systems built or maintained, integrations handled, and reliability or quality improvements without exaggeration.',

  Senior:
    'Emphasize deep technical expertise, architectural influence, mentorship, and ownership of complex systems. Highlight decision-making, system design contributions, cross-team collaboration, and long-term maintainability or scalability impact.',

  Manager:
    'Focus on people leadership, delivery ownership, and operational effectiveness. Highlight team coordination, prioritization, process improvement, and collaboration with stakeholders. Avoid technical depth unless explicitly present in the input.',

  Executive:
    'Emphasize strategic leadership, organizational direction, and business impact. Highlight decision-making scope, alignment with company objectives, stakeholder communication, and long-term outcomes without adding financial metrics unless provided.',
};

export const INDUSTRY_TERMINOLOGY: Record<Industry, string[]> = {
  Technology: [
    'agile',
    'scalable',
    'deployed',
    'optimized',
    'integrated',
    'architected',
    'automated',
    'implemented',
  ],
  Finance: [
    'portfolio',
    'compliance',
    'risk assessment',
    'due diligence',
    'ROI',
    'financial modeling',
    'regulatory',
  ],
  Healthcare: [
    'patient outcomes',
    'clinical',
    'HIPAA',
    'care coordination',
    'evidence-based',
    'quality improvement',
  ],
  Marketing: [
    'engagement',
    'conversion',
    'brand awareness',
    'campaign',
    'ROI',
    'analytics',
    'market research',
  ],
  Education: [
    'curriculum',
    'student outcomes',
    'differentiated instruction',
    'assessment',
    'learning objectives',
  ],
  Engineering: [
    'specifications',
    'tolerances',
    'CAD',
    'prototyping',
    'quality assurance',
    'optimization',
  ],
  Legal: [
    'litigation',
    'compliance',
    'due diligence',
    'contracts',
    'regulatory',
    'case management',
  ],
  Sales: [
    'revenue',
    'pipeline',
    'quota',
    'client relationships',
    'closing',
    'prospecting',
    'negotiation',
  ],
  'Human Resources': [
    'talent acquisition',
    'employee engagement',
    'retention',
    'onboarding',
    'performance management',
  ],
  Operations: [
    'efficiency',
    'supply chain',
    'logistics',
    'cost reduction',
    'process improvement',
    'KPIs',
  ],
  Consulting: [
    'stakeholder management',
    'deliverables',
    'strategic recommendations',
    'client engagement',
    'best practices',
  ],
  Other: [
    'delivered',
    'managed',
    'led',
    'improved',
    'developed',
    'coordinated',
  ],
};

export function buildBulletPointPrompt(
  jobTitle: string,
  company: string,
  responsibilities: string,
  industry: Industry,
  jobLevel: JobLevel
): string {
  const levelGuidance = JOB_LEVEL_WRITING_GUIDANCE[jobLevel];
  const industryTerms =
    INDUSTRY_TERMINOLOGY[industry] || INDUSTRY_TERMINOLOGY.Other;

  return `You are an expert resume writer. Your task is to convert the following user input into concise, professional, resume-ready bullet points.

      User Input:
        Job Title: ${jobTitle}
        Company: ${company}
        Industry: ${industry}
        Career Level: ${jobLevel}

      User's description of responsibilities:
      ${responsibilities}

      Writing Guidelines:
      - ${levelGuidance}
      - Use strong action verbs at the start of each bullet (e.g., Led, Developed, Implemented, Achieved)
      - Quantify achievements where possible (percentages, dollar amounts, team sizes, time saved)
      - Use ATS-friendly terminology
      - Do not invent metrics or achievements
      - Do not exaggerate seniority
      - Keep each bullet to 1-2 lines (15-30 words)
      - Focus on impact and results, not just duties
      - Avoid generic phrases like "responsible for" or "duties included"
      - Generate minimum 5 and maximum 7 bullet points
      - Use ${industry}-appropriate terminology: ${industryTerms
    .slice(0, 5)
    .join(', ')}
    
      Return ONLY the bullet points, one per line, starting with a bullet character (•). Do not include any other text or explanation.

      Example format:
      • Led cross-functional team of 8 engineers to deliver cloud migration project, reducing infrastructure costs by 35%
      • Developed automated testing framework that decreased QA cycle time by 50% and improved code coverage to 95%`;
}

export function buildProfessionalSummaryPrompt(
  fullName: string,
  industry: Industry,
  jobLevel: JobLevel,
  recentJobTitle: string,
  skills: string[],
  yearsExperience?: number
): string {
  const levelGuidance = JOB_LEVEL_WRITING_GUIDANCE[jobLevel];

  return `You are a professional resume writer. Generate a concise professional summary (2-4 sentences, maximum 100 words) for a resume.

Candidate Information:
- Name: ${fullName}
- Industry: ${industry}
- Career Level: ${jobLevel}
- Most Recent Title: ${recentJobTitle}
- Key Skills: ${skills.slice(0, 8).join(', ')}
${yearsExperience ? `- Years of Experience: ${yearsExperience}` : ''}

Writing Guidelines:
- ${levelGuidance}
- Start with a strong descriptor (e.g., "Results-driven", "Strategic", "Innovative")
- Highlight 2-3 key strengths or achievements
- Keep it focused and impactful
- Write in third person without using the candidate's name

Return ONLY the professional summary. Do not include any labels, headers, or explanations.

Example:
Results-driven software engineer with 5+ years of experience building scalable web applications. Proven track record of leading cross-functional teams and delivering high-impact projects that drive business growth. Expertise in React, Node.js, and cloud architecture with a passion for clean, maintainable code.`;
}

export function parseBulletPoints(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.startsWith('•') || line.startsWith('-') || line.startsWith('*')
    )
    .map((line) => line.replace(/^[•\-*]\s*/, ''))
    .filter((line) => line.length > 0);
}
