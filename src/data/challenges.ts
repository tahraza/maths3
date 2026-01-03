// Définition des défis hebdomadaires et quêtes secondaires

export interface WeeklyChallenge {
  id: string
  title: string
  emoji: string
  description: string
  type: 'streak' | 'exercises' | 'lessons' | 'quizzes' | 'flashcards' | 'perfect' | 'visit'
  target: number
  reward: number
}

export interface SideQuest {
  id: string
  title: string
  emoji: string
  description: string
  type: 'exercises' | 'quizzes' | 'streak' | 'shop' | 'perfect' | 'lessons' | 'special'
  target: number
  reward: number
  badgeId?: string
  itemReward?: string
}

// Pool de défis hebdomadaires possibles
export const WEEKLY_CHALLENGE_POOL: WeeklyChallenge[] = [
  // Défis de série
  { id: 'streak-3', title: 'Série de feu', emoji: '🔥', description: 'Maintenir une série de 3 jours', type: 'streak', target: 3, reward: 50 },
  { id: 'streak-5', title: 'Semaine active', emoji: '💪', description: 'Maintenir une série de 5 jours', type: 'streak', target: 5, reward: 80 },
  { id: 'streak-7', title: 'Semaine parfaite', emoji: '🌟', description: 'Série de 7 jours consécutifs', type: 'streak', target: 7, reward: 150 },

  // Défis exercices
  { id: 'exercises-3', title: 'Échauffement', emoji: '🏃', description: 'Compléter 3 exercices', type: 'exercises', target: 3, reward: 40 },
  { id: 'exercises-5', title: 'Calculateur', emoji: '🧮', description: 'Compléter 5 exercices', type: 'exercises', target: 5, reward: 75 },
  { id: 'exercises-10', title: 'Machine à calculs', emoji: '⚙️', description: 'Compléter 10 exercices', type: 'exercises', target: 10, reward: 120 },
  { id: 'exercises-15', title: 'Expert en exercices', emoji: '🏆', description: 'Compléter 15 exercices', type: 'exercises', target: 15, reward: 180 },

  // Défis leçons
  { id: 'lessons-1', title: 'Curieux', emoji: '🔍', description: 'Terminer 1 leçon', type: 'lessons', target: 1, reward: 30 },
  { id: 'lessons-2', title: 'Lecteur assidu', emoji: '📖', description: 'Terminer 2 leçons', type: 'lessons', target: 2, reward: 60 },
  { id: 'lessons-3', title: 'Étudiant modèle', emoji: '📚', description: 'Terminer 3 leçons', type: 'lessons', target: 3, reward: 100 },

  // Défis quiz
  { id: 'quizzes-2', title: 'Testeur', emoji: '❓', description: 'Réussir 2 quiz', type: 'quizzes', target: 2, reward: 50 },
  { id: 'quizzes-3', title: 'Quiz master', emoji: '🎯', description: 'Réussir 3 quiz', type: 'quizzes', target: 3, reward: 80 },
  { id: 'quizzes-5', title: 'Champion des quiz', emoji: '🏅', description: 'Réussir 5 quiz', type: 'quizzes', target: 5, reward: 130 },

  // Défis score parfait
  { id: 'perfect-1', title: 'Score parfait', emoji: '💯', description: 'Obtenir 100% à un quiz', type: 'perfect', target: 1, reward: 100 },
  { id: 'perfect-2', title: 'Double perfection', emoji: '✨', description: 'Obtenir 100% à 2 quiz', type: 'perfect', target: 2, reward: 150 },
  { id: 'perfect-3', title: 'Triple excellence', emoji: '🌟', description: 'Obtenir 100% à 3 quiz', type: 'perfect', target: 3, reward: 200 },

  // Défis flashcards
  { id: 'flashcards-10', title: 'Réviseur', emoji: '🃏', description: 'Réviser 10 flashcards', type: 'flashcards', target: 10, reward: 35 },
  { id: 'flashcards-20', title: 'Mémoire d\'éléphant', emoji: '🐘', description: 'Réviser 20 flashcards', type: 'flashcards', target: 20, reward: 60 },
  { id: 'flashcards-30', title: 'Maître de la mémoire', emoji: '🧠', description: 'Réviser 30 flashcards', type: 'flashcards', target: 30, reward: 90 },
]

// Quêtes secondaires permanentes
export const SIDE_QUESTS: SideQuest[] = [
  // Quêtes de maîtrise
  {
    id: 'pythagore-master',
    title: 'Disciple de Pythagore',
    emoji: '📐',
    description: 'Réussir 5 exercices sur le théorème de Pythagore',
    type: 'special',
    target: 5,
    reward: 200,
    badgeId: 'pythagore'
  },
  {
    id: 'thales-master',
    title: 'Héritier de Thalès',
    emoji: '📏',
    description: 'Réussir 5 exercices sur le théorème de Thalès',
    type: 'special',
    target: 5,
    reward: 200,
    badgeId: 'thales'
  },
  {
    id: 'fraction-champion',
    title: 'Champion des fractions',
    emoji: '🔢',
    description: 'Réussir 10 exercices sur les fractions',
    type: 'exercises',
    target: 10,
    reward: 150,
    badgeId: 'fraction-master'
  },
  {
    id: 'equation-solver',
    title: 'Maître des équations',
    emoji: '⚖️',
    description: 'Réussir 10 exercices sur les équations',
    type: 'exercises',
    target: 10,
    reward: 150,
    badgeId: 'equation-master'
  },

  // Quêtes de persévérance
  {
    id: 'streak-king',
    title: 'Roi des séries',
    emoji: '👑',
    description: 'Atteindre une série de 7 jours',
    type: 'streak',
    target: 7,
    reward: 150,
    itemReward: 'crown'
  },
  {
    id: 'streak-legend',
    title: 'Légende de la régularité',
    emoji: '🏆',
    description: 'Atteindre une série de 14 jours',
    type: 'streak',
    target: 14,
    reward: 300,
    badgeId: 'streak-legend'
  },
  {
    id: 'streak-mythic',
    title: 'Inarrêtable',
    emoji: '🔥',
    description: 'Atteindre une série de 30 jours',
    type: 'streak',
    target: 30,
    reward: 500,
    badgeId: 'streak-mythic'
  },

  // Quêtes de collection
  {
    id: 'collector-bronze',
    title: 'Collectionneur débutant',
    emoji: '🛍️',
    description: 'Acheter 5 items dans la boutique',
    type: 'shop',
    target: 5,
    reward: 100
  },
  {
    id: 'collector-silver',
    title: 'Collectionneur confirmé',
    emoji: '🛒',
    description: 'Acheter 10 items dans la boutique',
    type: 'shop',
    target: 10,
    reward: 200,
    itemReward: 'effect-sparkle'
  },
  {
    id: 'collector-gold',
    title: 'Grand collectionneur',
    emoji: '💎',
    description: 'Acheter 20 items dans la boutique',
    type: 'shop',
    target: 20,
    reward: 400,
    badgeId: 'collector'
  },

  // Quêtes de perfection
  {
    id: 'perfectionist-bronze',
    title: 'Perfectionniste',
    emoji: '💯',
    description: 'Obtenir 100% à 5 quiz',
    type: 'perfect',
    target: 5,
    reward: 150
  },
  {
    id: 'perfectionist-silver',
    title: 'Maître de la perfection',
    emoji: '⭐',
    description: 'Obtenir 100% à 10 quiz',
    type: 'perfect',
    target: 10,
    reward: 300,
    badgeId: 'perfectionist'
  },
  {
    id: 'perfectionist-gold',
    title: 'Légende de l\'excellence',
    emoji: '🌟',
    description: 'Obtenir 100% à 20 quiz',
    type: 'perfect',
    target: 20,
    reward: 500,
    badgeId: 'legend'
  },

  // Quêtes d'apprentissage
  {
    id: 'scholar-bronze',
    title: 'Apprenti érudit',
    emoji: '📖',
    description: 'Terminer 5 leçons',
    type: 'lessons',
    target: 5,
    reward: 100
  },
  {
    id: 'scholar-silver',
    title: 'Érudit confirmé',
    emoji: '📚',
    description: 'Terminer 10 leçons',
    type: 'lessons',
    target: 10,
    reward: 200
  },
  {
    id: 'scholar-gold',
    title: 'Maître des connaissances',
    emoji: '🎓',
    description: 'Terminer toutes les leçons',
    type: 'lessons',
    target: 20,
    reward: 500,
    badgeId: 'scholar'
  },

  // Quêtes exercices
  {
    id: 'warrior-bronze',
    title: 'Guerrier des maths',
    emoji: '⚔️',
    description: 'Compléter 25 exercices',
    type: 'exercises',
    target: 25,
    reward: 150
  },
  {
    id: 'warrior-silver',
    title: 'Champion des calculs',
    emoji: '🗡️',
    description: 'Compléter 50 exercices',
    type: 'exercises',
    target: 50,
    reward: 300
  },
  {
    id: 'warrior-gold',
    title: 'Légende des exercices',
    emoji: '🏅',
    description: 'Compléter 100 exercices',
    type: 'exercises',
    target: 100,
    reward: 600,
    badgeId: 'exercise-legend'
  },
]

// Fonction pour générer les défis de la semaine
export function generateWeeklyChallenges(count: number = 5): WeeklyChallenge[] {
  const shuffled = [...WEEKLY_CHALLENGE_POOL].sort(() => Math.random() - 0.5)

  // Assurer une variété de types
  const types = new Set<string>()
  const selected: WeeklyChallenge[] = []

  for (const challenge of shuffled) {
    if (selected.length >= count) break

    // Éviter trop de défis du même type
    if (types.has(challenge.type) && selected.length < count - 2) {
      continue
    }

    selected.push(challenge)
    types.add(challenge.type)
  }

  // Compléter si pas assez
  while (selected.length < count) {
    const remaining = shuffled.filter(c => !selected.includes(c))
    if (remaining.length === 0) break
    selected.push(remaining[0])
  }

  return selected
}

// Fonction pour obtenir le début de la semaine (lundi)
export function getWeekStartDate(date: Date = new Date()): string {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d.toISOString().split('T')[0]
}

// Fonction pour calculer le temps restant jusqu'au prochain lundi
export function getTimeUntilReset(): { days: number; hours: number; minutes: number } {
  const now = new Date()
  const nextMonday = new Date(now)
  const day = now.getDay()
  const daysUntilMonday = day === 0 ? 1 : 8 - day
  nextMonday.setDate(now.getDate() + daysUntilMonday)
  nextMonday.setHours(0, 0, 0, 0)

  const diff = nextMonday.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return { days, hours, minutes }
}

// Caractéristiques du pet et leurs déblocages
export interface CharacteristicPerk {
  level: number
  description: string
  type: 'cosmetic' | 'bonus' | 'feature'
}

export const CHARACTERISTICS = {
  happiness: {
    name: 'Bonheur',
    emoji: '😊',
    color: 'pink',
    perks: [
      { level: 25, description: 'Animation de saut', type: 'cosmetic' as const },
      { level: 50, description: 'Effet coeurs', type: 'cosmetic' as const },
      { level: 75, description: 'Pet danse', type: 'cosmetic' as const },
      { level: 100, description: 'Confettis + titre "Joyeux"', type: 'cosmetic' as const },
    ]
  },
  energy: {
    name: 'Énergie',
    emoji: '⚡',
    color: 'yellow',
    perks: [
      { level: 25, description: '+5% XP exercices', type: 'bonus' as const },
      { level: 50, description: '+10% XP exercices', type: 'bonus' as const },
      { level: 75, description: '+15% XP exercices', type: 'bonus' as const },
      { level: 100, description: '+20% XP + titre "Infatigable"', type: 'bonus' as const },
    ]
  },
  intelligence: {
    name: 'Intelligence',
    emoji: '🧠',
    color: 'blue',
    perks: [
      { level: 25, description: '1 indice gratuit/jour', type: 'feature' as const },
      { level: 50, description: '2 indices gratuits/jour', type: 'feature' as const },
      { level: 75, description: '3 indices gratuits/jour', type: 'feature' as const },
      { level: 100, description: 'Indices illimités + titre "Génie"', type: 'feature' as const },
    ]
  },
  courage: {
    name: 'Courage',
    emoji: '🦁',
    color: 'orange',
    perks: [
      { level: 25, description: 'Mode chronométré', type: 'feature' as const },
      { level: 50, description: 'Exercices Boss', type: 'feature' as const },
      { level: 75, description: 'Défis spéciaux', type: 'feature' as const },
      { level: 100, description: 'Badge légendaire + titre "Intrépide"', type: 'feature' as const },
    ]
  },
  wisdom: {
    name: 'Sagesse',
    emoji: '📚',
    color: 'purple',
    perks: [
      { level: 25, description: '+5% XP flashcards', type: 'bonus' as const },
      { level: 50, description: '+10% XP flashcards', type: 'bonus' as const },
      { level: 75, description: 'Mode Maître flashcards', type: 'feature' as const },
      { level: 100, description: 'Double XP révisions + titre "Sage"', type: 'bonus' as const },
    ]
  }
} as const

export type CharacteristicType = keyof typeof CHARACTERISTICS

// Règles d'augmentation des caractéristiques
export const CHARACTERISTIC_GAINS = {
  // Bonheur
  dailyLogin: { happiness: 2 },
  anyActivity: { happiness: 1 },

  // Énergie
  exerciseComplete: { energy: 2 },
  streakDay: { energy: 3 },

  // Intelligence
  lessonComplete: { intelligence: 3 },
  quizPass: { intelligence: 2 },

  // Courage
  annaleComplete: { courage: 4 },
  difficultExercise: { courage: 3 },

  // Sagesse
  flashcardReview: { wisdom: 1 },
  quizPerfect: { wisdom: 5 },
  lessonReview: { wisdom: 2 },
} as const
