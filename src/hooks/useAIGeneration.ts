import { useState, useCallback } from 'react';
import {
  generateBulletPoints,
  generateProfessionalSummary,
  generateBulletPointsMock,
  generateProfessionalSummaryMock,
} from '@/services/api/claudeApi';
import { useResumeStore } from '@/store/resumeStore';

// Use mock functions if no API key is available
const USE_MOCK = !import.meta.env.VITE_ANTHROPIC_API_KEY;

export function useAIGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { industry, jobLevel, setAIBullets, setAISummary } = useResumeStore();

  const generateBullets = useCallback(
    async (
      experienceId: string,
      jobTitle: string,
      company: string,
      responsibilities: string
    ) => {
      if (!industry || !jobLevel) {
        setError('Please select industry and job level first');
        return null;
      }

      setError(null);
      setIsGenerating(true);

      try {
        const generateFn = USE_MOCK
          ? generateBulletPointsMock
          : generateBulletPoints;
        const bullets = await generateFn({
          jobTitle,
          company,
          responsibilities,
          industry,
          jobLevel,
        });

        setAIBullets(experienceId, bullets);
        return bullets;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to generate bullet points';
        setError(message);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    [industry, jobLevel, setAIBullets]
  );

  const generateSummary = useCallback(
    async (fullName: string, recentJobTitle: string, skills: string[]) => {
      if (!industry || !jobLevel) {
        setError('Please select industry and job level first');
        return null;
      }

      setError(null);
      setIsGenerating(true);

      try {
        const generateFn = USE_MOCK
          ? generateProfessionalSummaryMock
          : generateProfessionalSummary;

        const summary = await generateFn({
          fullName,
          industry,
          jobLevel,
          recentJobTitle,
          skills,
        });

        setAISummary(summary);
        return summary;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to generate summary';
        setError(message);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    [industry, jobLevel, setAISummary]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    generateBullets,
    generateSummary,
    isGenerating,
    error,
    clearError,
    useMock: USE_MOCK,
  };
}
