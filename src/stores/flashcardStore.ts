import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { flashcards, Flashcard } from '@/data/flashcards'

/**
 * Données de révision pour une flashcard
 */
export interface FlashcardReview {
  flashcardId: string
  lastReviewDate: string | null   // Date ISO de la dernière révision
  nextReviewDate: string          // Date ISO de la prochaine révision
  easeFactor: number              // Facteur de facilité (1.3 à 2.5+)
  interval: number                // Intervalle en jours jusqu'à la prochaine révision
  repetitions: number             // Nombre de révisions réussies consécutives
  totalReviews: number            // Nombre total de révisions
  correctReviews: number          // Nombre de révisions réussies
}

/**
 * Qualité de réponse (style SM-2 simplifié)
 * 0 = Totalement oublié
 * 1 = Incorrect, mais reconnu après avoir vu la réponse
 * 2 = Incorrect, réponse facile à retenir
 * 3 = Correct avec difficulté
 * 4 = Correct avec hésitation
 * 5 = Parfait, réponse immédiate
 */
export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5

/**
 * Mode simplifié pour l'UI
 */
export type SimpleQuality = 'hard' | 'medium' | 'easy'

/**
 * Convertit une qualité simplifiée en qualité SM-2
 */
export function simpleToSM2Quality(simple: SimpleQuality): ReviewQuality {
  switch (simple) {
    case 'hard': return 1
    case 'medium': return 3
    case 'easy': return 5
  }
}

interface FlashcardStoreState {
  reviews: Record<string, FlashcardReview>
  lastSessionDate: string | null

  // Actions
  recordReview: (flashcardId: string, quality: ReviewQuality) => void
  getReview: (flashcardId: string) => FlashcardReview | null
  getDueCards: (chapterId?: string) => Flashcard[]
  getAllCardsWithStatus: (chapterId?: string) => Array<Flashcard & { review: FlashcardReview | null; isDue: boolean }>

  // Stats
  getTotalDue: () => number
  getMasteredCount: () => number
  getStats: () => {
    total: number
    reviewed: number
    mastered: number
    dueToday: number
    averageEaseFactor: number
  }

  // Reset
  resetCard: (flashcardId: string) => void
  resetAllCards: () => void
}

/**
 * Algorithme SM-2 pour calculer le prochain intervalle de révision
 */
function calculateNextReview(
  quality: ReviewQuality,
  currentReview: FlashcardReview | null
): Partial<FlashcardReview> {
  const now = new Date()
  const today = now.toISOString().split('T')[0]

  // Valeurs par défaut pour une nouvelle carte
  let easeFactor = currentReview?.easeFactor ?? 2.5
  let interval = currentReview?.interval ?? 0
  let repetitions = currentReview?.repetitions ?? 0
  let totalReviews = (currentReview?.totalReviews ?? 0) + 1
  let correctReviews = currentReview?.correctReviews ?? 0

  // Calculer le nouveau facteur de facilité
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const efDelta = 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  easeFactor = Math.max(1.3, easeFactor + efDelta)

  if (quality < 3) {
    // Réponse incorrecte : recommencer
    repetitions = 0
    interval = 1
  } else {
    // Réponse correcte
    correctReviews++
    repetitions++

    if (repetitions === 1) {
      interval = 1
    } else if (repetitions === 2) {
      interval = 3
    } else {
      interval = Math.round(interval * easeFactor)
    }
  }

  // Calculer la prochaine date de révision
  const nextDate = new Date(now)
  nextDate.setDate(nextDate.getDate() + interval)

  return {
    lastReviewDate: today,
    nextReviewDate: nextDate.toISOString().split('T')[0],
    easeFactor,
    interval,
    repetitions,
    totalReviews,
    correctReviews
  }
}

/**
 * Vérifie si une carte est due pour révision
 */
function isCardDue(review: FlashcardReview | null): boolean {
  if (!review) return true // Nouvelle carte

  const today = new Date().toISOString().split('T')[0]
  return review.nextReviewDate <= today
}

/**
 * Vérifie si une carte est considérée comme "maîtrisée"
 * (intervalle de 21+ jours = révision mensuelle)
 */
function isCardMastered(review: FlashcardReview | null): boolean {
  if (!review) return false
  return review.interval >= 21 && review.repetitions >= 5
}

export const useFlashcardStore = create<FlashcardStoreState>()(
  persist(
    (set, get) => ({
      reviews: {},
      lastSessionDate: null,

      recordReview: (flashcardId, quality) => {
        const currentReview = get().reviews[flashcardId] || null
        const updates = calculateNextReview(quality, currentReview)

        const newReview: FlashcardReview = {
          flashcardId,
          lastReviewDate: updates.lastReviewDate || currentReview?.lastReviewDate || null,
          nextReviewDate: updates.nextReviewDate || currentReview?.nextReviewDate || new Date().toISOString().split('T')[0],
          easeFactor: updates.easeFactor ?? currentReview?.easeFactor ?? 2.5,
          interval: updates.interval ?? currentReview?.interval ?? 0,
          repetitions: updates.repetitions ?? currentReview?.repetitions ?? 0,
          totalReviews: updates.totalReviews ?? currentReview?.totalReviews ?? 0,
          correctReviews: updates.correctReviews ?? currentReview?.correctReviews ?? 0
        }

        set((state) => ({
          reviews: {
            ...state.reviews,
            [flashcardId]: newReview
          },
          lastSessionDate: new Date().toISOString().split('T')[0]
        }))
      },

      getReview: (flashcardId) => {
        return get().reviews[flashcardId] || null
      },

      getDueCards: (chapterId) => {
        const reviews = get().reviews
        let cards = flashcards

        if (chapterId) {
          cards = cards.filter(c => c.chapterId === chapterId)
        }

        return cards.filter(card => isCardDue(reviews[card.id] || null))
      },

      getAllCardsWithStatus: (chapterId) => {
        const reviews = get().reviews
        let cards = flashcards

        if (chapterId) {
          cards = cards.filter(c => c.chapterId === chapterId)
        }

        return cards.map(card => ({
          ...card,
          review: reviews[card.id] || null,
          isDue: isCardDue(reviews[card.id] || null)
        }))
      },

      getTotalDue: () => {
        return get().getDueCards().length
      },

      getMasteredCount: () => {
        const reviews = get().reviews
        return Object.values(reviews).filter(r => isCardMastered(r)).length
      },

      getStats: () => {
        const reviews = get().reviews
        const reviewValues = Object.values(reviews)
        const totalCards = flashcards.length
        const reviewedCards = reviewValues.length
        const masteredCards = reviewValues.filter(r => isCardMastered(r)).length
        const dueCards = get().getDueCards().length

        const avgEaseFactor = reviewedCards > 0
          ? reviewValues.reduce((sum, r) => sum + r.easeFactor, 0) / reviewedCards
          : 2.5

        return {
          total: totalCards,
          reviewed: reviewedCards,
          mastered: masteredCards,
          dueToday: dueCards,
          averageEaseFactor: Math.round(avgEaseFactor * 100) / 100
        }
      },

      resetCard: (flashcardId) => {
        set((state) => {
          const { [flashcardId]: _, ...rest } = state.reviews
          return { reviews: rest }
        })
      },

      resetAllCards: () => {
        set({ reviews: {}, lastSessionDate: null })
      }
    }),
    {
      name: 'maths3-flashcard-reviews'
    }
  )
)

/**
 * Hook pour obtenir le nombre de cartes dues (pour affichage dans la nav)
 */
export function useDueCardsCount(): number {
  return useFlashcardStore((state) => state.getTotalDue())
}

/**
 * Calcule un niveau de maîtrise (0-100) basé sur les stats de révision
 */
export function getMasteryLevel(review: FlashcardReview | null): number {
  if (!review) return 0

  // Facteurs de calcul:
  // - Nombre de répétitions réussies (max 10 = 40%)
  // - Intervalle actuel (max 30 jours = 30%)
  // - Facteur de facilité (1.3-3.0 → 0-30%)

  const repScore = Math.min(review.repetitions, 10) / 10 * 40
  const intervalScore = Math.min(review.interval, 30) / 30 * 30
  const easeScore = ((review.easeFactor - 1.3) / 1.7) * 30

  return Math.round(repScore + intervalScore + easeScore)
}

/**
 * Retourne une couleur basée sur le niveau de maîtrise
 */
export function getMasteryColor(level: number): string {
  if (level >= 80) return 'text-green-600 dark:text-green-400'
  if (level >= 60) return 'text-blue-600 dark:text-blue-400'
  if (level >= 40) return 'text-yellow-600 dark:text-yellow-400'
  if (level >= 20) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
}

/**
 * Retourne un badge basé sur le niveau de maîtrise
 */
export function getMasteryBadge(level: number): { emoji: string; label: string } {
  if (level >= 80) return { emoji: '🏆', label: 'Maîtrisé' }
  if (level >= 60) return { emoji: '📗', label: 'Bien connu' }
  if (level >= 40) return { emoji: '📙', label: 'En cours' }
  if (level >= 20) return { emoji: '📕', label: 'À revoir' }
  return { emoji: '🆕', label: 'Nouveau' }
}
