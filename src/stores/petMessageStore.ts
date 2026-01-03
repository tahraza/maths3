import { create } from 'zustand'
import { getRandomMessage, MessageTrigger } from '@/data/petMessages'

interface PetMessageState {
  isVisible: boolean
  message: string
  petEmoji: string

  // Actions
  showMessage: (trigger: MessageTrigger, context?: {
    score?: number
    streak?: number
    level?: number
    characteristics?: {
      happiness: number
      energy: number
      intelligence: number
      courage: number
      wisdom: number
    }
  }, petEmoji?: string) => void
  hideMessage: () => void
}

export const usePetMessageStore = create<PetMessageState>((set, get) => ({
  isVisible: false,
  message: '',
  petEmoji: '🐱',

  showMessage: (trigger, context, petEmoji) => {
    // Ne pas afficher si déjà visible
    if (get().isVisible) return

    const message = getRandomMessage(trigger, context)

    set({
      isVisible: true,
      message,
      petEmoji: petEmoji || '🐱'
    })

    // Auto-hide après 5 secondes
    setTimeout(() => {
      set({ isVisible: false })
    }, 5000)
  },

  hideMessage: () => {
    set({ isVisible: false })
  }
}))
