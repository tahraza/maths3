// Données des compagnons virtuels et items de la boutique

export interface Pet {
  id: string
  name: string
  category: 'classic' | 'math' | 'fantasy'
  description: string
  stages: {
    baby: string
    teen: string
    adult: string
  }
}

export interface ShopItem {
  id: string
  name: string
  category: 'hat' | 'glasses' | 'necklace' | 'outfit' | 'background' | 'effect'
  price: number
  emoji: string
  description: string
}

// 12 animaux disponibles
export const pets: Pet[] = [
  // Classiques
  {
    id: 'cat',
    name: 'Chat',
    category: 'classic',
    description: 'Un chat curieux et malin',
    stages: {
      baby: '🐱',
      teen: '😺',
      adult: '😸'
    }
  },
  {
    id: 'dog',
    name: 'Chien',
    category: 'classic',
    description: 'Un chien fidèle et joyeux',
    stages: {
      baby: '🐶',
      teen: '🐕',
      adult: '🦮'
    }
  },
  {
    id: 'rabbit',
    name: 'Lapin',
    category: 'classic',
    description: 'Un lapin doux et rapide',
    stages: {
      baby: '🐰',
      teen: '🐇',
      adult: '🐇'
    }
  },
  {
    id: 'hamster',
    name: 'Hamster',
    category: 'classic',
    description: 'Un hamster mignon et énergique',
    stages: {
      baby: '🐹',
      teen: '🐹',
      adult: '🐹'
    }
  },
  {
    id: 'panda',
    name: 'Panda',
    category: 'classic',
    description: 'Un panda calme et adorable',
    stages: {
      baby: '🐼',
      teen: '🐼',
      adult: '🐼'
    }
  },
  // Mathématiques
  {
    id: 'owl',
    name: 'Hibou',
    category: 'math',
    description: 'Le hibou sage, symbole de connaissance',
    stages: {
      baby: '🦉',
      teen: '🦉',
      adult: '🦉'
    }
  },
  {
    id: 'fox',
    name: 'Renard',
    category: 'math',
    description: 'Le renard rusé, toujours malin',
    stages: {
      baby: '🦊',
      teen: '🦊',
      adult: '🦊'
    }
  },
  {
    id: 'turtle',
    name: 'Tortue',
    category: 'math',
    description: 'La tortue persévérante, lente mais sûre',
    stages: {
      baby: '🐢',
      teen: '🐢',
      adult: '🐢'
    }
  },
  {
    id: 'dragon',
    name: 'Dragon',
    category: 'math',
    description: 'Le dragon puissant des équations',
    stages: {
      baby: '🐲',
      teen: '🐉',
      adult: '🐉'
    }
  },
  // Fantastiques
  {
    id: 'unicorn',
    name: 'Licorne',
    category: 'fantasy',
    description: 'La licorne magique et étincelante',
    stages: {
      baby: '🦄',
      teen: '🦄',
      adult: '🦄'
    }
  },
  {
    id: 'wolf',
    name: 'Loup Magique',
    category: 'fantasy',
    description: 'Le loup mystique des forêts enchantées',
    stages: {
      baby: '🐺',
      teen: '🐺',
      adult: '🐺'
    }
  },
  {
    id: 'phoenix',
    name: 'Phénix',
    category: 'fantasy',
    description: 'Le phénix légendaire, renaissant de ses cendres',
    stages: {
      baby: '🔥',
      teen: '🦅',
      adult: '🦅'
    }
  }
]

// Items de la boutique
export const shopItems: ShopItem[] = [
  // Chapeaux (10-50 XP)
  {
    id: 'cap',
    name: 'Casquette',
    category: 'hat',
    price: 15,
    emoji: '🧢',
    description: 'Une casquette sportive'
  },
  {
    id: 'crown',
    name: 'Couronne',
    category: 'hat',
    price: 50,
    emoji: '👑',
    description: 'La couronne des champions'
  },
  {
    id: 'wizard-hat',
    name: 'Chapeau de sorcier',
    category: 'hat',
    price: 40,
    emoji: '🎩',
    description: 'Pour les magiciens des maths'
  },
  {
    id: 'beret',
    name: 'Béret',
    category: 'hat',
    price: 20,
    emoji: '🎨',
    description: 'Un béret d\'artiste'
  },
  {
    id: 'graduation',
    name: 'Toque de diplômé',
    category: 'hat',
    price: 45,
    emoji: '🎓',
    description: 'Pour les futurs diplômés'
  },
  {
    id: 'party-hat',
    name: 'Chapeau de fête',
    category: 'hat',
    price: 25,
    emoji: '🥳',
    description: 'C\'est la fête !'
  },

  // Lunettes (15-40 XP)
  {
    id: 'round-glasses',
    name: 'Lunettes rondes',
    category: 'glasses',
    price: 20,
    emoji: '👓',
    description: 'Style intellectuel'
  },
  {
    id: 'sunglasses',
    name: 'Lunettes de soleil',
    category: 'glasses',
    price: 25,
    emoji: '🕶️',
    description: 'Trop cool !'
  },
  {
    id: 'nerd-glasses',
    name: 'Lunettes geek',
    category: 'glasses',
    price: 30,
    emoji: '🤓',
    description: 'Pour les vrais nerds'
  },
  {
    id: 'star-glasses',
    name: 'Lunettes étoiles',
    category: 'glasses',
    price: 35,
    emoji: '⭐',
    description: 'Tu es une star !'
  },

  // Colliers (20-45 XP)
  {
    id: 'star-necklace',
    name: 'Collier étoile',
    category: 'necklace',
    price: 25,
    emoji: '⭐',
    description: 'Une étoile brillante'
  },
  {
    id: 'heart-necklace',
    name: 'Collier coeur',
    category: 'necklace',
    price: 30,
    emoji: '❤️',
    description: 'Avec amour'
  },
  {
    id: 'medal-gold',
    name: 'Médaille d\'or',
    category: 'necklace',
    price: 45,
    emoji: '🥇',
    description: 'Champion des maths !'
  },
  {
    id: 'medal-silver',
    name: 'Médaille d\'argent',
    category: 'necklace',
    price: 35,
    emoji: '🥈',
    description: 'Excellent travail !'
  },
  {
    id: 'crystal',
    name: 'Cristal magique',
    category: 'necklace',
    price: 40,
    emoji: '💎',
    description: 'Un cristal étincelant'
  },

  // Tenues (50-150 XP)
  {
    id: 'math-cape',
    name: 'Cape du mathématicien',
    category: 'outfit',
    price: 80,
    emoji: '🧙',
    description: 'La cape des maîtres des nombres'
  },
  {
    id: 'student-uniform',
    name: 'Uniforme d\'étudiant',
    category: 'outfit',
    price: 60,
    emoji: '👔',
    description: 'Prêt pour l\'école !'
  },
  {
    id: 'superhero',
    name: 'Costume de super-héros',
    category: 'outfit',
    price: 100,
    emoji: '🦸',
    description: 'Super-Matheux !'
  },
  {
    id: 'knight-armor',
    name: 'Armure de chevalier',
    category: 'outfit',
    price: 120,
    emoji: '⚔️',
    description: 'Chevalier des équations'
  },
  {
    id: 'scientist',
    name: 'Blouse de scientifique',
    category: 'outfit',
    price: 70,
    emoji: '🥼',
    description: 'Prêt pour les expériences'
  },
  {
    id: 'astronaut',
    name: 'Combinaison spatiale',
    category: 'outfit',
    price: 150,
    emoji: '🚀',
    description: 'Direction les étoiles !'
  },

  // Décors/Fonds (30-100 XP)
  {
    id: 'bg-classroom',
    name: 'Salle de classe',
    category: 'background',
    price: 40,
    emoji: '🏫',
    description: 'Dans ta classe préférée'
  },
  {
    id: 'bg-forest',
    name: 'Forêt magique',
    category: 'background',
    price: 50,
    emoji: '🌲',
    description: 'Une forêt enchantée'
  },
  {
    id: 'bg-space',
    name: 'Espace étoilé',
    category: 'background',
    price: 70,
    emoji: '🌌',
    description: 'Parmi les étoiles'
  },
  {
    id: 'bg-library',
    name: 'Bibliothèque',
    category: 'background',
    price: 45,
    emoji: '📚',
    description: 'Entouré de livres'
  },
  {
    id: 'bg-beach',
    name: 'Plage tropicale',
    category: 'background',
    price: 60,
    emoji: '🏖️',
    description: 'Vacances au soleil'
  },
  {
    id: 'bg-castle',
    name: 'Château',
    category: 'background',
    price: 80,
    emoji: '🏰',
    description: 'Dans un château royal'
  },
  {
    id: 'bg-rainbow',
    name: 'Arc-en-ciel',
    category: 'background',
    price: 55,
    emoji: '🌈',
    description: 'Sous l\'arc-en-ciel'
  },

  // Effets spéciaux (100-200 XP)
  {
    id: 'effect-sparkle',
    name: 'Effet brillant',
    category: 'effect',
    price: 100,
    emoji: '✨',
    description: 'Des étoiles scintillantes'
  },
  {
    id: 'effect-aura',
    name: 'Aura magique',
    category: 'effect',
    price: 150,
    emoji: '💫',
    description: 'Une aura mystique'
  },
  {
    id: 'effect-confetti',
    name: 'Confettis',
    category: 'effect',
    price: 120,
    emoji: '🎊',
    description: 'La fête permanente !'
  },
  {
    id: 'effect-hearts',
    name: 'Coeurs volants',
    category: 'effect',
    price: 110,
    emoji: '💕',
    description: 'Entouré d\'amour'
  },
  {
    id: 'effect-fire',
    name: 'Flammes',
    category: 'effect',
    price: 180,
    emoji: '🔥',
    description: 'Tu es en feu !'
  },
  {
    id: 'effect-lightning',
    name: 'Éclairs',
    category: 'effect',
    price: 200,
    emoji: '⚡',
    description: 'Puissance électrique !'
  }
]

// Catégories pour l'affichage
export const itemCategories = [
  { id: 'hat', name: 'Chapeaux', emoji: '🎩' },
  { id: 'glasses', name: 'Lunettes', emoji: '👓' },
  { id: 'necklace', name: 'Colliers', emoji: '💎' },
  { id: 'outfit', name: 'Tenues', emoji: '👔' },
  { id: 'background', name: 'Décors', emoji: '🏞️' },
  { id: 'effect', name: 'Effets', emoji: '✨' }
] as const

export const petCategories = [
  { id: 'classic', name: 'Classiques', emoji: '🐾' },
  { id: 'math', name: 'Mathématiques', emoji: '📐' },
  { id: 'fantasy', name: 'Fantastiques', emoji: '🦄' }
] as const

// Helper pour obtenir le stade selon le niveau
export function getPetStage(level: number): 'baby' | 'teen' | 'adult' {
  if (level <= 3) return 'baby'
  if (level <= 6) return 'teen'
  return 'adult'
}

// Helper pour obtenir le nom du stade en français
export function getStageName(stage: 'baby' | 'teen' | 'adult'): string {
  const names = {
    baby: 'Bébé',
    teen: 'Adolescent',
    adult: 'Adulte'
  }
  return names[stage]
}
