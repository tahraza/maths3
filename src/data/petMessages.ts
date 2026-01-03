// Messages motivants du compagnon virtuel

export type MessageTrigger =
  | 'login_daily'
  | 'exercise_complete'
  | 'lesson_complete'
  | 'quiz_perfect'
  | 'quiz_good'
  | 'quiz_needs_work'
  | 'streak_3'
  | 'streak_7'
  | 'streak_14'
  | 'streak_30'
  | 'level_up'
  | 'badge_earned'
  | 'flashcard_session'
  | 'flashcard_mastered'
  | 'exam_complete'
  | 'first_exercise'
  | 'first_lesson'
  | 'comeback'
  | 'night_study'
  | 'morning_study'
  | 'weekend_study'

export interface PetMessageConfig {
  trigger: MessageTrigger
  conditions?: {
    score?: string           // ">= 80", "< 50", etc.
    streak?: number
    level?: number
    characteristic?: {
      name: 'happiness' | 'energy' | 'intelligence' | 'courage' | 'wisdom'
      value: string          // ">= 50", etc.
    }
    timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night'
  }
  messages: string[]
  priority?: number          // Plus élevé = plus prioritaire
}

export const PET_MESSAGES: PetMessageConfig[] = [
  // ===== CONNEXION QUOTIDIENNE =====
  {
    trigger: 'login_daily',
    messages: [
      "Salut ! Prêt pour une nouvelle journée de maths ?",
      "Te revoilà ! On continue l'aventure ?",
      "Coucou ! J'ai hâte de réviser avec toi !",
      "Hello ! Qu'est-ce qu'on apprend aujourd'hui ?",
      "Super de te voir ! Allez, on s'y met ?",
    ]
  },
  {
    trigger: 'login_daily',
    conditions: { timeOfDay: 'morning' },
    messages: [
      "Debout de bonne heure pour les maths ! J'adore !",
      "Les maths le matin, c'est le secret des champions !",
      "Réviser le matin, c'est quand le cerveau est au top !",
    ],
    priority: 1
  },
  {
    trigger: 'login_daily',
    conditions: { timeOfDay: 'night' },
    messages: [
      "Une petite révision avant de dormir ? Bonne idée !",
      "Le cerveau retient mieux pendant le sommeil. Révise bien !",
      "Pas trop tard quand même ! Le sommeil c'est important aussi.",
    ],
    priority: 1
  },
  {
    trigger: 'login_daily',
    conditions: { characteristic: { name: 'wisdom', value: '>= 50' } },
    messages: [
      "Avec toute ta sagesse, tu vas réussir le brevet haut la main !",
      "Un esprit aussi sage mérite une pause flashcards !",
    ],
    priority: 2
  },
  {
    trigger: 'login_daily',
    conditions: { characteristic: { name: 'courage', value: '>= 50' } },
    messages: [
      "Ton courage m'impressionne ! Prêt pour un défi ?",
      "Avec autant de courage, rien ne peut t'arrêter !",
    ],
    priority: 2
  },

  // ===== RETOUR APRÈS ABSENCE =====
  {
    trigger: 'comeback',
    messages: [
      "Tu m'as manqué ! Content de te revoir !",
      "Ah te revoilà ! J'avais hâte qu'on reprenne !",
      "Bienvenue de retour ! On efface l'ardoise et on recommence ?",
      "Hey ! Ça fait un moment ! Prêt à reprendre ?",
    ]
  },

  // ===== EXERCICES =====
  {
    trigger: 'exercise_complete',
    conditions: { score: '>= 90' },
    messages: [
      "Extraordinaire ! Tu maîtrises vraiment ce sujet !",
      "Wow ! Presque parfait ! Tu es incroyable !",
      "Impressionnant ! Tu gères vraiment !",
      "Quel talent ! Continue comme ça !",
    ],
    priority: 2
  },
  {
    trigger: 'exercise_complete',
    conditions: { score: '>= 70' },
    messages: [
      "Bravo ! C'est du très bon travail !",
      "Excellent ! Tu progresses super vite !",
      "Super résultat ! Tu es sur la bonne voie !",
      "Bien joué ! Continue comme ça !",
    ],
    priority: 1
  },
  {
    trigger: 'exercise_complete',
    conditions: { score: '>= 50' },
    messages: [
      "Pas mal ! Tu as compris les bases !",
      "C'est un bon début ! Révise la leçon pour t'améliorer.",
      "Tu progresses ! Encore un effort !",
    ]
  },
  {
    trigger: 'exercise_complete',
    conditions: { score: '< 50' },
    messages: [
      "Pas grave ! Chaque erreur est une leçon. Révise et réessaie !",
      "C'est en forgeant qu'on devient forgeron !",
      "Rome ne s'est pas faite en un jour. Continue !",
      "Ne te décourage pas ! Retourne voir la leçon, tu vas y arriver !",
      "Les erreurs font partie de l'apprentissage. Courage !",
    ]
  },
  {
    trigger: 'first_exercise',
    messages: [
      "Premier exercice ! C'est le début d'une belle aventure !",
      "Tu as fait ton premier pas ! Fier de toi !",
      "Le voyage de mille lieues commence par un pas. Bravo !",
    ]
  },

  // ===== LEÇONS =====
  {
    trigger: 'lesson_complete',
    messages: [
      "Bravo ! Une leçon de plus dans ta tête !",
      "Super ! Tu enrichis tes connaissances !",
      "Excellent ! Ton cerveau grandit !",
      "Génial ! Tu es de plus en plus savant !",
    ]
  },
  {
    trigger: 'first_lesson',
    messages: [
      "Ta première leçon ! Le savoir commence ici !",
      "Première leçon terminée ! Tu es sur le bon chemin !",
    ]
  },

  // ===== QUIZ =====
  {
    trigger: 'quiz_perfect',
    messages: [
      "PARFAIT ! 100% ! Tu es un génie !",
      "Score parfait ! Incroyable !",
      "Sans faute ! Tu maîtrises complètement !",
      "Perfection ! Rien à redire !",
    ]
  },
  {
    trigger: 'quiz_good',
    messages: [
      "Très bien ! Tu as bien compris la leçon !",
      "Bravo ! Tu retiens bien !",
      "Super quiz ! Continue comme ça !",
    ]
  },
  {
    trigger: 'quiz_needs_work',
    messages: [
      "Relis la leçon et réessaie, tu vas y arriver !",
      "Un peu de révision et ce sera parfait !",
    ]
  },

  // ===== STREAKS =====
  {
    trigger: 'streak_3',
    messages: [
      "3 jours de suite ! Tu prends le rythme !",
      "Trois jours ! La régularité paie toujours !",
      "3 jours consécutifs ! Tu es motivé !",
    ]
  },
  {
    trigger: 'streak_7',
    messages: [
      "7 jours de suite ! Tu es une machine !",
      "Une semaine complète ! Incroyable !",
      "7 jours ! Ta persévérance est admirable !",
      "Une semaine de travail ! Le brevet n'a qu'à bien se tenir !",
    ]
  },
  {
    trigger: 'streak_14',
    messages: [
      "14 jours ! Deux semaines de révisions ! Phénoménal !",
      "Deux semaines ! Tu es vraiment déterminé !",
      "14 jours de suite ! Rien ne peut t'arrêter !",
    ]
  },
  {
    trigger: 'streak_30',
    messages: [
      "30 JOURS ! Tu es légendaire !",
      "Un mois complet ! Tu es un vrai champion !",
      "30 jours ! Ta détermination est extraordinaire !",
      "Un mois de révisions ! Le brevet sera un jeu d'enfant !",
    ]
  },

  // ===== LEVEL UP =====
  {
    trigger: 'level_up',
    messages: [
      "NIVEAU SUPÉRIEUR ! Tu deviens plus fort !",
      "Level up ! Tu progresses à vue d'œil !",
      "Nouveau niveau ! Félicitations !",
      "Tu montes en puissance ! Continue !",
    ]
  },

  // ===== BADGES =====
  {
    trigger: 'badge_earned',
    messages: [
      "Nouveau badge ! Ta collection s'agrandit !",
      "Un badge de plus ! Tu le mérites !",
      "Badge débloqué ! Bravo pour cet accomplissement !",
    ]
  },

  // ===== FLASHCARDS =====
  {
    trigger: 'flashcard_session',
    messages: [
      "Super session de flashcards ! Ta mémoire te remercie !",
      "Bien joué ! La répétition est la clé !",
      "Excellente révision ! Tu retiens de mieux en mieux !",
    ]
  },
  {
    trigger: 'flashcard_mastered',
    messages: [
      "Carte maîtrisée ! Elle est gravée dans ta mémoire !",
      "Tu connais cette notion par cœur maintenant !",
    ]
  },

  // ===== EXAMEN BLANC =====
  {
    trigger: 'exam_complete',
    conditions: { score: '>= 80' },
    messages: [
      "Excellent examen blanc ! Tu es prêt pour le vrai brevet !",
      "Super résultat ! Le brevet ne te fait pas peur !",
      "Bravo ! Avec ce niveau, tu vas cartonner !",
    ],
    priority: 1
  },
  {
    trigger: 'exam_complete',
    conditions: { score: '>= 50' },
    messages: [
      "Bon examen ! Continue à t'entraîner !",
      "Tu progresses ! Le prochain sera encore meilleur !",
    ]
  },
  {
    trigger: 'exam_complete',
    conditions: { score: '< 50' },
    messages: [
      "C'est un entraînement ! Chaque examen te rend plus fort.",
      "Révise les points faibles et réessaie. Tu vas y arriver !",
    ]
  },

  // ===== ÉTUDE WEEKEND =====
  {
    trigger: 'weekend_study',
    messages: [
      "Réviser le weekend ? Tu es vraiment motivé !",
      "Même le weekend tu travailles ! Impressionnant !",
      "Un peu de maths le weekend, c'est toujours une bonne idée !",
    ]
  },
]

/**
 * Obtient un message aléatoire selon le déclencheur et le contexte
 */
export function getRandomMessage(
  trigger: MessageTrigger,
  context?: {
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
  }
): string {
  // Déterminer l'heure
  const hour = new Date().getHours()
  let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  if (hour >= 6 && hour < 12) timeOfDay = 'morning'
  else if (hour >= 12 && hour < 18) timeOfDay = 'afternoon'
  else if (hour >= 18 && hour < 22) timeOfDay = 'evening'
  else timeOfDay = 'night'

  // Filtrer les messages correspondants
  const matchingMessages = PET_MESSAGES.filter(config => {
    if (config.trigger !== trigger) return false

    // Vérifier les conditions
    if (config.conditions) {
      // Condition de score
      if (config.conditions.score && context?.score !== undefined) {
        const [op, val] = config.conditions.score.split(' ')
        const threshold = parseInt(val)
        if (op === '>=' && context.score < threshold) return false
        if (op === '<' && context.score >= threshold) return false
        if (op === '>' && context.score <= threshold) return false
        if (op === '<=' && context.score > threshold) return false
      }

      // Condition de streak
      if (config.conditions.streak && context?.streak !== undefined) {
        if (context.streak < config.conditions.streak) return false
      }

      // Condition d'heure
      if (config.conditions.timeOfDay && config.conditions.timeOfDay !== timeOfDay) {
        return false
      }

      // Condition de caractéristique
      if (config.conditions.characteristic && context?.characteristics) {
        const { name, value } = config.conditions.characteristic
        const charValue = context.characteristics[name]
        const [op, val] = value.split(' ')
        const threshold = parseInt(val)
        if (op === '>=' && charValue < threshold) return false
        if (op === '<' && charValue >= threshold) return false
      }
    }

    return true
  })

  if (matchingMessages.length === 0) {
    // Fallback : messages génériques
    return "Continue comme ça !"
  }

  // Trier par priorité et prendre le plus prioritaire
  matchingMessages.sort((a, b) => (b.priority || 0) - (a.priority || 0))
  const topPriority = matchingMessages[0].priority || 0
  const topMessages = matchingMessages.filter(m => (m.priority || 0) === topPriority)

  // Choisir un message aléatoire parmi les plus prioritaires
  const selectedConfig = topMessages[Math.floor(Math.random() * topMessages.length)]
  const messages = selectedConfig.messages
  return messages[Math.floor(Math.random() * messages.length)]
}

/**
 * Détermine quel trigger utiliser selon le score d'un quiz
 */
export function getQuizTrigger(score: number): MessageTrigger {
  if (score === 100) return 'quiz_perfect'
  if (score >= 70) return 'quiz_good'
  return 'quiz_needs_work'
}

/**
 * Détermine quel trigger utiliser selon la streak
 */
export function getStreakTrigger(streak: number): MessageTrigger | null {
  if (streak === 30) return 'streak_30'
  if (streak === 14) return 'streak_14'
  if (streak === 7) return 'streak_7'
  if (streak === 3) return 'streak_3'
  return null
}
