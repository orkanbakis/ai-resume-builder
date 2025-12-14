import { create } from 'zustand'
import type { WizardStep } from '@/types/wizard'
import { WIZARD_STEPS } from '@/types/wizard'

interface WizardState {
  currentStep: WizardStep
  completedSteps: Set<WizardStep>
  isGeneratingAI: boolean

  // Navigation
  goToStep: (step: WizardStep) => void
  nextStep: () => void
  previousStep: () => void
  markStepComplete: (step: WizardStep) => void
  canNavigateToStep: (step: WizardStep) => boolean

  // AI Loading state
  setGeneratingAI: (loading: boolean) => void

  // Reset
  reset: () => void
}

const initialState = {
  currentStep: 'personal' as WizardStep,
  completedSteps: new Set<WizardStep>(),
  isGeneratingAI: false,
}

export const useWizardStore = create<WizardState>((set, get) => ({
  ...initialState,

  goToStep: (step: WizardStep) => {
    if (get().canNavigateToStep(step)) {
      set({ currentStep: step })
    }
  },

  nextStep: () => {
    const { currentStep, completedSteps } = get()
    const currentIndex = WIZARD_STEPS.indexOf(currentStep)
    if (currentIndex < WIZARD_STEPS.length - 1) {
      const newCompleted = new Set(completedSteps)
      newCompleted.add(currentStep)
      set({
        currentStep: WIZARD_STEPS[currentIndex + 1],
        completedSteps: newCompleted,
      })
    }
  },

  previousStep: () => {
    const { currentStep } = get()
    const currentIndex = WIZARD_STEPS.indexOf(currentStep)
    if (currentIndex > 0) {
      set({ currentStep: WIZARD_STEPS[currentIndex - 1] })
    }
  },

  markStepComplete: (step: WizardStep) => {
    const { completedSteps } = get()
    const newCompleted = new Set(completedSteps)
    newCompleted.add(step)
    set({ completedSteps: newCompleted })
  },

  canNavigateToStep: (step: WizardStep) => {
    const { completedSteps, currentStep } = get()
    const targetIndex = WIZARD_STEPS.indexOf(step)
    const currentIndex = WIZARD_STEPS.indexOf(currentStep)

    // Can always go back
    if (targetIndex <= currentIndex) return true

    // Can only go forward if all previous steps are completed
    for (let i = 0; i < targetIndex; i++) {
      if (!completedSteps.has(WIZARD_STEPS[i])) {
        return false
      }
    }
    return true
  },

  setGeneratingAI: (loading: boolean) => set({ isGeneratingAI: loading }),

  reset: () => set(initialState),
}))
