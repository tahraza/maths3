export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Exercise {
  id: string
  chapterId: string
  lessonId?: string
  title: string
  description: string
  difficulty: 'Facile' | 'Moyen' | 'Difficile'
  questions: Question[]
}

// Exercices avec énoncés (problèmes rédigés)
export interface ProblemHint {
  text: string
  xpPenalty: number // Points d'XP perdus si on utilise l'indice
}

export interface ProblemStep {
  question: string
  hints?: ProblemHint[]
  answer: string
  points?: number
}

export interface ProblemExercise {
  id: string
  chapterId: string
  lessonId?: string
  title: string
  context: string
  difficulty: 'Facile' | 'Moyen' | 'Difficile'
  steps: ProblemStep[]
  totalPoints?: number
}

// Annales du Brevet
export interface AnnaleExercise {
  id: string
  year: number
  session: string
  title: string
  theme: string
  points: number
  statement: string
  questions: {
    question: string
    subQuestions?: string[]
  }[]
  correction: string
}

export interface Annale {
  id: string
  year: number
  session: string
  location?: string
  exercises: AnnaleExercise[]
}

export const exercises: Exercise[] = [
  // NOMBRES ET CALCULS
  {
    id: 'ex-1',
    chapterId: 'nombres',
    lessonId: '1',
    title: 'QCM Fractions',
    description: 'Opérations et simplifications de fractions',
    difficulty: 'Facile',
    questions: [
      {
        id: 'q1-1',
        question: 'Quelle est la forme simplifiée de 12/18 ?',
        options: ['6/9', '4/6', '2/3', '3/4'],
        correctAnswer: 2,
        explanation: 'Le PGCD de 12 et 18 est 6. Donc 12/18 = 12÷6 / 18÷6 = 2/3.'
      },
      {
        id: 'q1-2',
        question: 'Calculer 1/4 + 1/3',
        options: ['2/7', '7/12', '1/6', '5/12'],
        correctAnswer: 1,
        explanation: '1/4 + 1/3 = 3/12 + 4/12 = 7/12 (dénominateur commun : 12).'
      },
      {
        id: 'q1-3',
        question: 'Calculer 2/5 × 3/4',
        options: ['6/20', '5/9', '3/10', '6/9'],
        correctAnswer: 2,
        explanation: '2/5 × 3/4 = (2×3)/(5×4) = 6/20 = 3/10 après simplification.'
      },
      {
        id: 'q1-4',
        question: 'Calculer 3/4 ÷ 1/2',
        options: ['3/8', '3/2', '2/3', '6/4'],
        correctAnswer: 1,
        explanation: 'Diviser par 1/2 = multiplier par 2/1. Donc 3/4 × 2/1 = 6/4 = 3/2.'
      },
      {
        id: 'q1-5',
        question: 'Une pizza est partagée en 8 parts. Tu en manges 3 et ton ami 2. Quelle fraction reste-t-il ?',
        options: ['3/8', '5/8', '1/2', '2/8'],
        correctAnswer: 0,
        explanation: 'Il reste 8 - 3 - 2 = 3 parts sur 8, donc 3/8.'
      }
    ]
  },
  {
    id: 'ex-2',
    chapterId: 'nombres',
    lessonId: '2',
    title: 'Puissances',
    description: 'Règles de calcul avec les puissances',
    difficulty: 'Moyen',
    questions: [
      {
        id: 'q2-1',
        question: 'Calculer 2³ × 2⁴',
        options: ['2⁷', '2¹²', '4⁷', '4¹²'],
        correctAnswer: 0,
        explanation: 'aᵐ × aⁿ = aᵐ⁺ⁿ. Donc 2³ × 2⁴ = 2³⁺⁴ = 2⁷ = 128.'
      },
      {
        id: 'q2-2',
        question: 'Calculer 5⁶ ÷ 5²',
        options: ['5³', '5⁴', '5⁸', '1'],
        correctAnswer: 1,
        explanation: 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Donc 5⁶ ÷ 5² = 5⁶⁻² = 5⁴ = 625.'
      },
      {
        id: 'q2-3',
        question: 'Calculer (3²)³',
        options: ['3⁵', '3⁶', '9³', '27'],
        correctAnswer: 1,
        explanation: '(aᵐ)ⁿ = aᵐˣⁿ. Donc (3²)³ = 3²ˣ³ = 3⁶ = 729.'
      },
      {
        id: 'q2-4',
        question: 'Quelle est l\'écriture scientifique de 0,00045 ?',
        options: ['45 × 10⁻⁵', '4,5 × 10⁻⁴', '0,45 × 10⁻³', '4,5 × 10⁻³'],
        correctAnswer: 1,
        explanation: '0,00045 = 4,5 × 10⁻⁴ (on déplace la virgule de 4 positions vers la droite).'
      },
      {
        id: 'q2-5',
        question: 'Que vaut 10⁻³ ?',
        options: ['1000', '-1000', '0,001', '-0,001'],
        correctAnswer: 2,
        explanation: '10⁻³ = 1/10³ = 1/1000 = 0,001.'
      }
    ]
  },
  {
    id: 'ex-3',
    chapterId: 'nombres',
    lessonId: '3',
    title: 'Racines carrées',
    description: 'Calculs et simplifications avec les racines carrées',
    difficulty: 'Moyen',
    questions: [
      {
        id: 'q3-1',
        question: 'Calculer √144',
        options: ['11', '12', '13', '14'],
        correctAnswer: 1,
        explanation: '12² = 144, donc √144 = 12.'
      },
      {
        id: 'q3-2',
        question: 'Simplifier √50',
        options: ['5√2', '2√5', '25√2', '10√5'],
        correctAnswer: 0,
        explanation: '√50 = √(25×2) = √25 × √2 = 5√2.'
      },
      {
        id: 'q3-3',
        question: 'Calculer √3 × √12',
        options: ['√36', '6', '√15', '4'],
        correctAnswer: 1,
        explanation: '√3 × √12 = √(3×12) = √36 = 6.'
      },
      {
        id: 'q3-4',
        question: 'Un carré a une aire de 81 m². Quel est son côté ?',
        options: ['8 m', '9 m', '10 m', '40,5 m'],
        correctAnswer: 1,
        explanation: 'Côté = √Aire = √81 = 9 m.'
      },
      {
        id: 'q3-5',
        question: 'Quelle affirmation est FAUSSE ?',
        options: ['√(a×b) = √a × √b', '(√a)² = a', '√(a+b) = √a + √b', '√(a/b) = √a/√b'],
        correctAnswer: 2,
        explanation: '√(a+b) ≠ √a + √b. Par exemple √(9+16) = √25 = 5, mais √9 + √16 = 3 + 4 = 7.'
      }
    ]
  },
  {
    id: 'ex-4',
    chapterId: 'nombres',
    lessonId: '4',
    title: 'Développement',
    description: 'Développer avec la distributivité et les identités remarquables',
    difficulty: 'Moyen',
    questions: [
      {
        id: 'q4-1',
        question: 'Développer 3(x + 5)',
        options: ['3x + 5', '3x + 15', 'x + 15', '3x + 8'],
        correctAnswer: 1,
        explanation: '3(x + 5) = 3×x + 3×5 = 3x + 15.'
      },
      {
        id: 'q4-2',
        question: 'Développer (x + 3)(x + 2)',
        options: ['x² + 5x + 6', 'x² + 6x + 5', 'x² + 5x + 5', '2x² + 5x + 6'],
        correctAnswer: 0,
        explanation: '(x+3)(x+2) = x² + 2x + 3x + 6 = x² + 5x + 6.'
      },
      {
        id: 'q4-3',
        question: 'Développer (x + 4)²',
        options: ['x² + 16', 'x² + 4x + 16', 'x² + 8x + 16', 'x² + 8x + 8'],
        correctAnswer: 2,
        explanation: '(a+b)² = a² + 2ab + b². Donc (x+4)² = x² + 8x + 16.'
      },
      {
        id: 'q4-4',
        question: 'Développer (x - 3)²',
        options: ['x² - 9', 'x² - 6x + 9', 'x² + 6x + 9', 'x² - 6x - 9'],
        correctAnswer: 1,
        explanation: '(a-b)² = a² - 2ab + b². Donc (x-3)² = x² - 6x + 9.'
      },
      {
        id: 'q4-5',
        question: 'Développer (x + 5)(x - 5)',
        options: ['x² - 25', 'x² + 25', 'x² - 10x - 25', 'x² + 10'],
        correctAnswer: 0,
        explanation: '(a+b)(a-b) = a² - b². Donc (x+5)(x-5) = x² - 25.'
      }
    ]
  },
  {
    id: 'ex-5',
    chapterId: 'nombres',
    lessonId: '5',
    title: 'Factorisation',
    description: 'Factoriser des expressions algébriques',
    difficulty: 'Difficile',
    questions: [
      {
        id: 'q5-1',
        question: 'Factoriser 6x + 12',
        options: ['6(x + 2)', '3(2x + 4)', '2(3x + 6)', '12(x/2 + 1)'],
        correctAnswer: 0,
        explanation: '6x + 12 = 6×x + 6×2 = 6(x + 2). On factorise par le PGCD.'
      },
      {
        id: 'q5-2',
        question: 'Factoriser x² - 16',
        options: ['(x-4)²', '(x+4)²', '(x+4)(x-4)', '(x-8)(x+2)'],
        correctAnswer: 2,
        explanation: 'x² - 16 = x² - 4² = (x+4)(x-4) (différence de deux carrés).'
      },
      {
        id: 'q5-3',
        question: 'Factoriser x² + 10x + 25',
        options: ['(x+5)²', '(x-5)²', '(x+25)(x+1)', '(x+10)(x+2.5)'],
        correctAnswer: 0,
        explanation: 'x² + 10x + 25 = x² + 2×5×x + 5² = (x+5)² (carré parfait).'
      },
      {
        id: 'q5-4',
        question: 'Factoriser 4x² - 9',
        options: ['(2x+3)(2x-3)', '(4x+3)(x-3)', '(2x-3)²', '4(x²-9/4)'],
        correctAnswer: 0,
        explanation: '4x² - 9 = (2x)² - 3² = (2x+3)(2x-3).'
      },
      {
        id: 'q5-5',
        question: 'Factoriser x² - 5',
        options: ['(x-√5)²', '(x+√5)(x-√5)', 'Impossible', '(x-5)(x+1)'],
        correctAnswer: 1,
        explanation: 'x² - 5 = x² - (√5)² = (x+√5)(x-√5).'
      }
    ]
  },
  {
    id: 'ex-6',
    chapterId: 'nombres',
    lessonId: '6',
    title: 'Équations',
    description: 'Résolution d\'équations du premier degré',
    difficulty: 'Moyen',
    questions: [
      {
        id: 'q6-1',
        question: 'Résoudre 3x + 7 = 22',
        options: ['x = 5', 'x = 15', 'x = 7', 'x = 29/3'],
        correctAnswer: 0,
        explanation: '3x + 7 = 22 → 3x = 15 → x = 5.'
      },
      {
        id: 'q6-2',
        question: 'Résoudre 2(x - 4) = 10',
        options: ['x = 3', 'x = 7', 'x = 9', 'x = 1'],
        correctAnswer: 2,
        explanation: '2(x-4) = 10 → 2x - 8 = 10 → 2x = 18 → x = 9.'
      },
      {
        id: 'q6-3',
        question: 'Résoudre 5x - 3 = 2x + 9',
        options: ['x = 2', 'x = 4', 'x = 6', 'x = 12'],
        correctAnswer: 1,
        explanation: '5x - 3 = 2x + 9 → 3x = 12 → x = 4.'
      },
      {
        id: 'q6-4',
        question: 'Le triple d\'un nombre diminué de 8 égale 13. Quel est ce nombre ?',
        options: ['5', '7', '21', '63'],
        correctAnswer: 1,
        explanation: '3x - 8 = 13 → 3x = 21 → x = 7.'
      },
      {
        id: 'q6-5',
        question: 'Résoudre x/3 + 2 = 5',
        options: ['x = 1', 'x = 9', 'x = 21', 'x = 3'],
        correctAnswer: 1,
        explanation: 'x/3 + 2 = 5 → x/3 = 3 → x = 9.'
      }
    ]
  },

  // FONCTIONS
  {
    id: 'ex-7',
    chapterId: 'fonctions',
    lessonId: '7',
    title: 'Notion de fonction',
    description: 'Images, antécédents et lecture graphique',
    difficulty: 'Facile',
    questions: [
      {
        id: 'q7-1',
        question: 'Si f(3) = 7, quelle affirmation est vraie ?',
        options: ['7 est l\'antécédent de 3', '3 est l\'image de 7', '7 est l\'image de 3', 'f = 3/7'],
        correctAnswer: 2,
        explanation: 'f(3) = 7 signifie que l\'image de 3 par f est 7.'
      },
      {
        id: 'q7-2',
        question: 'Pour f(x) = 2x + 1, calculer f(4)',
        options: ['5', '7', '9', '11'],
        correctAnswer: 2,
        explanation: 'f(4) = 2×4 + 1 = 8 + 1 = 9.'
      },
      {
        id: 'q7-3',
        question: 'Pour f(x) = x², quels sont les antécédents de 9 ?',
        options: ['3 uniquement', '-3 uniquement', '3 et -3', '81'],
        correctAnswer: 2,
        explanation: 'f(x) = 9 → x² = 9 → x = 3 ou x = -3.'
      },
      {
        id: 'q7-4',
        question: 'Pour f(x) = 3x - 6, quel est l\'antécédent de 0 ?',
        options: ['0', '2', '6', '-2'],
        correctAnswer: 1,
        explanation: 'f(x) = 0 → 3x - 6 = 0 → 3x = 6 → x = 2.'
      },
      {
        id: 'q7-5',
        question: 'Une fonction associe à chaque valeur de x...',
        options: ['Plusieurs images', 'Une unique image', 'Aucune image', 'Un antécédent'],
        correctAnswer: 1,
        explanation: 'Par définition, une fonction associe à chaque valeur de x une UNIQUE image.'
      }
    ]
  },
  {
    id: 'ex-8',
    chapterId: 'fonctions',
    lessonId: '8',
    title: 'Fonctions linéaires',
    description: 'Proportionnalité et représentation graphique',
    difficulty: 'Facile',
    questions: [
      {
        id: 'q8-1',
        question: 'Quelle fonction est linéaire ?',
        options: ['f(x) = 2x + 3', 'f(x) = 3x', 'f(x) = x²', 'f(x) = 5'],
        correctAnswer: 1,
        explanation: 'Une fonction linéaire est de la forme f(x) = ax. Seule f(x) = 3x correspond.'
      },
      {
        id: 'q8-2',
        question: 'La représentation graphique d\'une fonction linéaire est :',
        options: ['Une parabole', 'Une droite passant par l\'origine', 'Une droite quelconque', 'Un cercle'],
        correctAnswer: 1,
        explanation: 'La représentation de f(x) = ax est une droite passant par l\'origine O(0;0).'
      },
      {
        id: 'q8-3',
        question: 'Un trajet en taxi coûte 2€ par km. Le prix pour 15 km est :',
        options: ['15€', '17€', '30€', '32€'],
        correctAnswer: 2,
        explanation: 'Prix = 2 × 15 = 30€. C\'est une fonction linéaire f(x) = 2x.'
      },
      {
        id: 'q8-4',
        question: 'Pour f(x) = -2x, la fonction est :',
        options: ['Croissante', 'Décroissante', 'Constante', 'Ni l\'un ni l\'autre'],
        correctAnswer: 1,
        explanation: 'Si a < 0, la fonction linéaire est décroissante. Ici a = -2 < 0.'
      },
      {
        id: 'q8-5',
        question: 'Le coefficient directeur de f(x) = 5x est :',
        options: ['0', '1', '5', 'x'],
        correctAnswer: 2,
        explanation: 'Dans f(x) = ax, a est le coefficient directeur. Ici a = 5.'
      }
    ]
  },
  {
    id: 'ex-9',
    chapterId: 'fonctions',
    lessonId: '9',
    title: 'Fonctions affines',
    description: 'Coefficient directeur et ordonnée à l\'origine',
    difficulty: 'Moyen',
    questions: [
      {
        id: 'q9-1',
        question: 'Pour f(x) = 3x + 2, l\'ordonnée à l\'origine est :',
        options: ['3', '2', '5', '0'],
        correctAnswer: 1,
        explanation: 'Dans f(x) = ax + b, b est l\'ordonnée à l\'origine. Ici b = 2.'
      },
      {
        id: 'q9-2',
        question: 'Un forfait téléphone coûte 10€/mois + 0,05€/SMS. Le coût pour 100 SMS est :',
        options: ['5€', '10€', '15€', '105€'],
        correctAnswer: 2,
        explanation: 'C(100) = 0,05×100 + 10 = 5 + 10 = 15€.'
      },
      {
        id: 'q9-3',
        question: 'Une droite passe par (0; 3) et (2; 7). Son équation est :',
        options: ['y = 2x + 3', 'y = 3x + 2', 'y = 4x + 3', 'y = 2x + 7'],
        correctAnswer: 0,
        explanation: 'b = 3. a = (7-3)/(2-0) = 4/2 = 2. Donc y = 2x + 3.'
      },
      {
        id: 'q9-4',
        question: 'La fonction f(x) = -x + 5 est :',
        options: ['Croissante', 'Décroissante', 'Constante', 'Linéaire'],
        correctAnswer: 1,
        explanation: 'a = -1 < 0, donc la fonction est décroissante.'
      },
      {
        id: 'q9-5',
        question: 'Pour quelles valeurs de x a-t-on 2x + 1 = 5x - 8 ?',
        options: ['x = 3', 'x = -3', 'x = 7/3', 'x = 9/3'],
        correctAnswer: 0,
        explanation: '2x + 1 = 5x - 8 → 9 = 3x → x = 3.'
      }
    ]
  },

  // GÉOMÉTRIE
  {
    id: 'ex-10',
    chapterId: 'geometrie',
    lessonId: '11',
    title: 'Théorème de Pythagore',
    description: 'Calculs de longueurs dans un triangle rectangle',
    difficulty: 'Moyen',
    questions: [
      {
        id: 'q10-1',
        question: 'Un triangle rectangle a des côtés de l\'angle droit de 3 cm et 4 cm. L\'hypoténuse mesure :',
        options: ['5 cm', '7 cm', '12 cm', '25 cm'],
        correctAnswer: 0,
        explanation: 'h² = 3² + 4² = 9 + 16 = 25. Donc h = 5 cm.'
      },
      {
        id: 'q10-2',
        question: 'L\'hypoténuse mesure 13 cm, un côté de l\'angle droit 5 cm. L\'autre côté mesure :',
        options: ['8 cm', '12 cm', '18 cm', '144 cm'],
        correctAnswer: 1,
        explanation: 'c² = 13² - 5² = 169 - 25 = 144. Donc c = 12 cm.'
      },
      {
        id: 'q10-3',
        question: 'Un écran mesure 40 cm × 30 cm. Sa diagonale mesure :',
        options: ['50 cm', '70 cm', '35 cm', '25 cm'],
        correctAnswer: 0,
        explanation: 'd² = 40² + 30² = 1600 + 900 = 2500. Donc d = 50 cm.'
      },
      {
        id: 'q10-4',
        question: 'Un triangle a des côtés de 6, 8 et 10. Est-il rectangle ?',
        options: ['Oui, car 6² + 8² = 10²', 'Non', 'On ne peut pas savoir', 'Oui, car 6 + 8 = 10 + 4'],
        correctAnswer: 0,
        explanation: '6² + 8² = 36 + 64 = 100 = 10². C\'est un triangle rectangle.'
      },
      {
        id: 'q10-5',
        question: 'Une échelle de 5 m est posée à 3 m du mur. À quelle hauteur atteint-elle ?',
        options: ['2 m', '4 m', '8 m', '√34 m'],
        correctAnswer: 1,
        explanation: 'h² = 5² - 3² = 25 - 9 = 16. Donc h = 4 m.'
      }
    ]
  },
  {
    id: 'ex-11',
    chapterId: 'geometrie',
    lessonId: '12',
    title: 'Théorème de Thalès',
    description: 'Calculs de longueurs avec des droites parallèles',
    difficulty: 'Moyen',
    questions: [
      {
        id: 'q11-1',
        question: 'Dans un triangle ABC, M est sur [AB], N sur [AC], (MN)//(BC). Si AM = 2, AB = 5, AN = 3, alors AC = ?',
        options: ['6', '7,5', '8', '10'],
        correctAnswer: 1,
        explanation: 'Par Thalès : AM/AB = AN/AC. 2/5 = 3/AC. AC = 15/2 = 7,5.'
      },
      {
        id: 'q11-2',
        question: 'Pour mesurer un arbre, on utilise son ombre (12 m) et celle d\'un bâton de 1,5 m (1 m). L\'arbre mesure :',
        options: ['8 m', '12 m', '18 m', '13,5 m'],
        correctAnswer: 2,
        explanation: 'Par Thalès : h/1,5 = 12/1. h = 1,5 × 12 = 18 m.'
      },
      {
        id: 'q11-3',
        question: 'AM/AB = 3/5 et (MN)//(BC). Alors MN/BC = ?',
        options: ['3/5', '2/5', '5/3', '5/8'],
        correctAnswer: 0,
        explanation: 'Par Thalès, tous les rapports sont égaux : AM/AB = AN/AC = MN/BC = 3/5.'
      },
      {
        id: 'q11-4',
        question: 'Si AM/AB = AN/AC avec les points alignés dans le bon ordre, alors :',
        options: ['(MN) coupe (BC)', '(MN)//(BC)', 'Le triangle est rectangle', 'On ne peut rien conclure'],
        correctAnswer: 1,
        explanation: 'C\'est la réciproque de Thalès : si les rapports sont égaux et les points alignés, alors (MN)//(BC).'
      },
      {
        id: 'q11-5',
        question: 'Une carte est à l\'échelle 1/50000. 3 cm sur la carte représentent :',
        options: ['150 m', '1,5 km', '15 km', '1500 m'],
        correctAnswer: 1,
        explanation: '3 cm × 50000 = 150000 cm = 1500 m = 1,5 km.'
      }
    ]
  },
  {
    id: 'ex-12',
    chapterId: 'geometrie',
    lessonId: '13',
    title: 'Trigonométrie',
    description: 'Cosinus, sinus et tangente dans un triangle rectangle',
    difficulty: 'Difficile',
    questions: [
      {
        id: 'q12-1',
        question: 'Dans un triangle rectangle, cos(A) = ?',
        options: ['Opposé/Hypoténuse', 'Adjacent/Hypoténuse', 'Opposé/Adjacent', 'Hypoténuse/Adjacent'],
        correctAnswer: 1,
        explanation: 'Le cosinus est le rapport du côté adjacent sur l\'hypoténuse : CAH.'
      },
      {
        id: 'q12-2',
        question: 'Si cos(A) = 0,8 et l\'hypoténuse = 10, le côté adjacent mesure :',
        options: ['2', '8', '12,5', '80'],
        correctAnswer: 1,
        explanation: 'cos(A) = adjacent/hypoténuse. Adjacent = 0,8 × 10 = 8.'
      },
      {
        id: 'q12-3',
        question: 'tan(A) = 3/4 et le côté adjacent = 8. Le côté opposé mesure :',
        options: ['6', '8', '10', '12'],
        correctAnswer: 0,
        explanation: 'tan(A) = opposé/adjacent. Opposé = (3/4) × 8 = 6.'
      },
      {
        id: 'q12-4',
        question: 'Si sin(30°) = 0,5 et l\'hypoténuse = 6, le côté opposé mesure :',
        options: ['3', '6', '12', '0,5'],
        correctAnswer: 0,
        explanation: 'sin(30°) = opposé/hypoténuse. Opposé = 0,5 × 6 = 3.'
      },
      {
        id: 'q12-5',
        question: 'Un avion descend avec un angle de 5° sur 2 km. L\'altitude perdue est environ :',
        options: ['87 m', '175 m', '350 m', '500 m'],
        correctAnswer: 1,
        explanation: 'h = 2000 × sin(5°) ≈ 2000 × 0,087 ≈ 175 m.'
      }
    ]
  },

  // STATISTIQUES
  {
    id: 'ex-13',
    chapterId: 'statistiques',
    lessonId: '17',
    title: 'Moyenne et médiane',
    description: 'Calculs de moyenne et de médiane',
    difficulty: 'Facile',
    questions: [
      {
        id: 'q13-1',
        question: 'La moyenne de 12, 15, 18, 13, 17 est :',
        options: ['14', '15', '16', '17'],
        correctAnswer: 1,
        explanation: 'Moyenne = (12+15+18+13+17)/5 = 75/5 = 15.'
      },
      {
        id: 'q13-2',
        question: 'La médiane de 5, 8, 3, 12, 7 est :',
        options: ['7', '8', '5', '3'],
        correctAnswer: 0,
        explanation: 'Série ordonnée : 3, 5, 7, 8, 12. La médiane est la valeur du milieu : 7.'
      },
      {
        id: 'q13-3',
        question: 'Maths (coef 4) : 14. Français (coef 3) : 11. La moyenne pondérée est :',
        options: ['12', '12,5', '12,71', '13'],
        correctAnswer: 2,
        explanation: 'Moyenne = (4×14 + 3×11)/(4+3) = (56+33)/7 = 89/7 ≈ 12,71.'
      },
      {
        id: 'q13-4',
        question: 'La médiane de 2, 4, 6, 8 est :',
        options: ['4', '5', '6', '2,5'],
        correctAnswer: 1,
        explanation: 'Série paire : médiane = moyenne des deux valeurs centrales = (4+6)/2 = 5.'
      },
      {
        id: 'q13-5',
        question: 'Dans une entreprise, la médiane des salaires est préférable à la moyenne quand :',
        options: ['Les salaires sont tous égaux', 'Il y a des valeurs extrêmes', 'On veut le salaire total', 'Les effectifs sont faibles'],
        correctAnswer: 1,
        explanation: 'La médiane n\'est pas influencée par les valeurs extrêmes (salaires très élevés ou très bas).'
      }
    ]
  },
  {
    id: 'ex-14',
    chapterId: 'statistiques',
    lessonId: '19',
    title: 'Probabilités',
    description: 'Calculs de probabilités simples',
    difficulty: 'Moyen',
    questions: [
      {
        id: 'q14-1',
        question: 'On lance un dé équilibré. P(obtenir 6) = ?',
        options: ['1/2', '1/3', '1/6', '6'],
        correctAnswer: 2,
        explanation: '1 issue favorable sur 6 possibles. P = 1/6.'
      },
      {
        id: 'q14-2',
        question: 'On tire une carte dans un jeu de 52. P(tirer un cœur) = ?',
        options: ['1/52', '1/13', '1/4', '4/52'],
        correctAnswer: 2,
        explanation: '13 cœurs sur 52 cartes. P = 13/52 = 1/4.'
      },
      {
        id: 'q14-3',
        question: 'Si P(A) = 0,3, alors P(contraire de A) = ?',
        options: ['0,3', '0,7', '1,3', '-0,3'],
        correctAnswer: 1,
        explanation: 'P(Ā) = 1 - P(A) = 1 - 0,3 = 0,7.'
      },
      {
        id: 'q14-4',
        question: 'On lance 2 pièces. P(2 piles) = ?',
        options: ['1/2', '1/4', '1/3', '2/4'],
        correctAnswer: 1,
        explanation: 'P(pile)×P(pile) = 1/2 × 1/2 = 1/4.'
      },
      {
        id: 'q14-5',
        question: 'Un dé est lancé. P(pair OU supérieur à 4) = ?',
        options: ['1/2', '2/3', '3/6', '5/6'],
        correctAnswer: 1,
        explanation: 'Pairs : {2,4,6}. >4 : {5,6}. Réunion : {2,4,5,6} = 4 issues. P = 4/6 = 2/3.'
      }
    ]
  }
]

// Exercices avec énoncés rédigés
export const problemExercises: ProblemExercise[] = [
  // NOMBRES ET CALCULS
  {
    id: 'prob-1',
    chapterId: 'nombres',
    lessonId: '1',
    title: 'Partage de pizza',
    context: 'Trois amis se partagent deux pizzas identiques. Marc mange 3/8 de la première pizza et 1/4 de la deuxième. Sophie mange 1/2 de la première pizza et 1/8 de la deuxième.',
    difficulty: 'Facile',
    totalPoints: 12,
    steps: [
      {
        question: 'Quelle fraction de pizza Marc a-t-il mangée au total ?',
        hints: [
          { text: 'Il faut additionner les deux fractions que Marc a mangées', xpPenalty: 1 },
          { text: 'Pour additionner 3/8 et 1/4, il faut les mettre au même dénominateur', xpPenalty: 1 }
        ],
        answer: 'Marc a mangé 3/8 + 1/4 = 3/8 + 2/8 = 5/8 de pizza.',
        points: 3
      },
      {
        question: 'Quelle fraction de pizza Sophie a-t-elle mangée au total ?',
        hints: [
          { text: 'Même méthode que pour Marc : additionne les deux fractions', xpPenalty: 1 },
          { text: '1/2 = 4/8', xpPenalty: 1 }
        ],
        answer: 'Sophie a mangé 1/2 + 1/8 = 4/8 + 1/8 = 5/8 de pizza.',
        points: 3
      },
      {
        question: 'Quelle fraction reste-t-il pour le troisième ami ?',
        hints: [
          { text: 'Il y a 2 pizzas au total', xpPenalty: 1 },
          { text: 'Calcule d\'abord ce que Marc et Sophie ont mangé ensemble, puis soustrais de 2', xpPenalty: 2 }
        ],
        answer: 'Total des 2 pizzas = 2. Marc et Sophie ont mangé 5/8 + 5/8 = 10/8 = 5/4 de pizza. Il reste 2 - 5/4 = 8/4 - 5/4 = 3/4 de pizza.',
        points: 4
      },
      {
        question: 'Qui a mangé le plus : Marc, Sophie ou le troisième ami ?',
        hints: [
          { text: 'Compare les fractions en les mettant au même dénominateur (8)', xpPenalty: 1 }
        ],
        answer: 'Marc et Sophie ont mangé chacun 5/8 de pizza. Le 3ème ami a mangé 3/4 = 6/8 de pizza. Le troisième ami a mangé le plus.',
        points: 2
      }
    ]
  },
  {
    id: 'prob-2',
    chapterId: 'nombres',
    lessonId: '4',
    title: 'Aire d\'un jardin',
    context: 'Un jardin rectangulaire a une longueur de (x + 5) mètres et une largeur de (x + 2) mètres.',
    difficulty: 'Moyen',
    totalPoints: 10,
    steps: [
      {
        question: 'Exprimer l\'aire A du jardin en fonction de x sous forme développée.',
        hints: [
          { text: 'Aire d\'un rectangle = Longueur × Largeur', xpPenalty: 1 },
          { text: 'Utilise la double distributivité : (a+b)(c+d) = ac + ad + bc + bd', xpPenalty: 2 }
        ],
        answer: 'A = (x + 5)(x + 2) = x² + 2x + 5x + 10 = x² + 7x + 10 m²',
        points: 4
      },
      {
        question: 'Calculer l\'aire du jardin pour x = 3.',
        hints: [
          { text: 'Remplace x par 3 dans l\'expression développée', xpPenalty: 1 }
        ],
        answer: 'Pour x = 3 : A = 3² + 7×3 + 10 = 9 + 21 + 10 = 40 m²',
        points: 3
      },
      {
        question: 'Pour quelle valeur de x l\'aire vaut-elle 66 m² ?',
        hints: [
          { text: 'Pose l\'équation x² + 7x + 10 = 66', xpPenalty: 1 },
          { text: 'Ramène à 0 et teste des valeurs entières autour de 4-5', xpPenalty: 2 }
        ],
        answer: 'x² + 7x + 10 = 66, donc x² + 7x - 56 = 0. Pour A=66, on résout l\'équation. Δ = 49 + 224 = 273, x = (-7+√273)/2 ≈ 4.76 m (on garde la valeur positive).',
        points: 3
      }
    ]
  },
  {
    id: 'prob-3',
    chapterId: 'nombres',
    lessonId: '6',
    title: 'Le cinéma',
    context: 'Le cinéma de Mathville propose deux tarifs : le tarif plein à 9€ la place et le tarif réduit à 6€ la place. Un jour, 250 personnes sont venues et la recette totale est de 1890€.',
    difficulty: 'Moyen',
    totalPoints: 12,
    steps: [
      {
        question: 'Si on appelle x le nombre de places vendues au tarif plein, exprimer le nombre de places au tarif réduit en fonction de x.',
        hints: [
          { text: 'Le total des spectateurs est 250', xpPenalty: 1 }
        ],
        answer: 'Le nombre de places au tarif réduit est (250 - x).',
        points: 2
      },
      {
        question: 'Écrire une équation traduisant la recette totale.',
        hints: [
          { text: 'Recette = prix × quantité pour chaque tarif', xpPenalty: 1 },
          { text: 'Recette plein + Recette réduit = 1890', xpPenalty: 1 }
        ],
        answer: 'Recette = 9x + 6(250 - x) = 1890',
        points: 3
      },
      {
        question: 'Résoudre cette équation.',
        hints: [
          { text: 'Développe 6(250-x) d\'abord', xpPenalty: 1 },
          { text: 'Regroupe les termes en x d\'un côté', xpPenalty: 2 }
        ],
        answer: '9x + 1500 - 6x = 1890, donc 3x + 1500 = 1890, donc 3x = 390, donc x = 130',
        points: 4
      },
      {
        question: 'Combien de places ont été vendues à chaque tarif ?',
        hints: [
          { text: 'x = nombre de places plein tarif, calcule 250-x pour le réduit', xpPenalty: 1 }
        ],
        answer: '130 places au tarif plein et 250 - 130 = 120 places au tarif réduit.',
        points: 3
      }
    ]
  },
  // FONCTIONS
  {
    id: 'prob-4',
    chapterId: 'fonctions',
    lessonId: '9',
    title: 'Forfait téléphonique',
    context: 'Un opérateur téléphonique propose deux forfaits :\n- Forfait A : 15€ par mois + 0,05€ par minute de communication\n- Forfait B : 25€ par mois, communications illimitées',
    difficulty: 'Moyen',
    totalPoints: 14,
    steps: [
      {
        question: 'Exprimer le coût mensuel CA(x) du forfait A en fonction du nombre x de minutes de communication.',
        hints: [
          { text: 'Coût = partie fixe + partie variable', xpPenalty: 1 },
          { text: 'C(x) = prix par minute × x + abonnement', xpPenalty: 1 }
        ],
        answer: 'CA(x) = 0,05x + 15',
        points: 2
      },
      {
        question: 'Exprimer le coût mensuel CB(x) du forfait B.',
        hints: [
          { text: 'Le forfait B est illimité, donc le prix ne dépend pas de x', xpPenalty: 1 }
        ],
        answer: 'CB(x) = 25 (constant, quel que soit x)',
        points: 2
      },
      {
        question: 'Pour quelle durée de communication les deux forfaits sont-ils équivalents ?',
        hints: [
          { text: 'Résous l\'équation CA(x) = CB(x)', xpPenalty: 1 },
          { text: '0,05x + 15 = 25, isole x', xpPenalty: 2 }
        ],
        answer: 'CA(x) = CB(x) équivaut à 0,05x + 15 = 25, donc 0,05x = 10, donc x = 200 minutes.',
        points: 4
      },
      {
        question: 'Quel forfait est le plus avantageux pour 150 minutes par mois ?',
        hints: [
          { text: 'Calcule CA(150) et compare à CB(150)', xpPenalty: 1 }
        ],
        answer: 'CA(150) = 0,05 × 150 + 15 = 7,5 + 15 = 22,50€. CB = 25€. Le forfait A est plus avantageux.',
        points: 3
      },
      {
        question: 'À partir de combien de minutes le forfait B devient-il plus avantageux ?',
        hints: [
          { text: 'C\'est quand le forfait A devient plus cher que B', xpPenalty: 1 },
          { text: 'Utilise le résultat de la question sur l\'équivalence', xpPenalty: 1 }
        ],
        answer: 'Le forfait B devient plus avantageux quand CA(x) > CB(x), soit quand x > 200 minutes.',
        points: 3
      }
    ]
  },
  // GÉOMÉTRIE
  {
    id: 'prob-5',
    chapterId: 'geometrie',
    lessonId: '11',
    title: 'L\'échelle et le mur',
    context: 'Une échelle de 5 mètres est posée contre un mur vertical. Le pied de l\'échelle est à 3 mètres du mur.',
    difficulty: 'Facile',
    totalPoints: 10,
    steps: [
      {
        question: 'Faire un schéma de la situation en nommant les points.',
        answer: 'Triangle ABC rectangle en B avec : A = pied de l\'échelle, B = pied du mur, C = haut de l\'échelle. AB = 3m, AC = 5m.',
        points: 2
      },
      {
        question: 'À quelle hauteur l\'échelle touche-t-elle le mur ?',
        answer: 'Par Pythagore : BC² + AB² = AC², donc BC² + 9 = 25, donc BC² = 16, donc BC = 4 mètres.',
        points: 4
      },
      {
        question: 'On éloigne le pied de l\'échelle à 4 mètres du mur. À quelle hauteur touche-t-elle maintenant le mur ?',
        answer: 'BC² + 16 = 25, donc BC² = 9, donc BC = 3 mètres.',
        points: 4
      }
    ]
  },
  {
    id: 'prob-6',
    chapterId: 'geometrie',
    lessonId: '12',
    title: 'L\'ombre de l\'arbre',
    context: 'À midi, un arbre projette une ombre de 15 mètres sur le sol. Au même moment, un bâton vertical de 1,20 m planté dans le sol projette une ombre de 0,90 m.',
    difficulty: 'Facile',
    totalPoints: 8,
    steps: [
      {
        question: 'Pourquoi peut-on utiliser le théorème de Thalès dans cette situation ?',
        answer: 'Les rayons du soleil sont parallèles. On a deux triangles avec des côtés parallèles, donc on peut appliquer Thalès.',
        points: 2
      },
      {
        question: 'Calculer la hauteur de l\'arbre.',
        answer: 'Par Thalès : h/1,20 = 15/0,90. Donc h = (1,20 × 15)/0,90 = 18/0,90 = 20 mètres.',
        points: 4
      },
      {
        question: 'Quelle serait l\'ombre de l\'arbre si celle du bâton mesurait 1,50 m ?',
        answer: 'Par Thalès : ombre/15 = 1,50/0,90 = 5/3. Donc ombre = 15 × 5/3 = 25 mètres.',
        points: 2
      }
    ]
  },
  {
    id: 'prob-7',
    chapterId: 'geometrie',
    lessonId: '13',
    title: 'Le toboggan',
    context: 'Un toboggan part du haut d\'une structure de 4 mètres de hauteur et fait un angle de 35° avec le sol.',
    difficulty: 'Moyen',
    totalPoints: 10,
    steps: [
      {
        question: 'Faire un schéma de la situation avec les données.',
        answer: 'Triangle rectangle avec : hauteur = 4m (côté opposé à l\'angle de 35°), angle avec le sol = 35°, hypoténuse = longueur du toboggan.',
        points: 2
      },
      {
        question: 'Quelle relation trigonométrique utiliser pour trouver la longueur du toboggan ?',
        answer: 'On connaît l\'angle et le côté opposé, on cherche l\'hypoténuse. On utilise sin(35°) = opposé/hypoténuse.',
        points: 2
      },
      {
        question: 'Calculer la longueur du toboggan (arrondir au cm près).',
        answer: 'sin(35°) = 4/L, donc L = 4/sin(35°) = 4/0,574 ≈ 6,97 mètres.',
        points: 3
      },
      {
        question: 'Calculer la distance au sol entre le pied de la structure et l\'arrivée du toboggan.',
        answer: 'tan(35°) = 4/d, donc d = 4/tan(35°) = 4/0,700 ≈ 5,71 mètres.',
        points: 3
      }
    ]
  },
  // STATISTIQUES
  {
    id: 'prob-8',
    chapterId: 'statistiques',
    lessonId: '17',
    title: 'Notes de la classe',
    context: 'Voici les notes sur 20 obtenues par les 25 élèves d\'une classe à un contrôle de maths :\n8, 9, 10, 10, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 16, 16, 17, 18, 19',
    difficulty: 'Facile',
    totalPoints: 12,
    steps: [
      {
        question: 'Calculer la moyenne de la classe.',
        answer: 'Somme = 8+9+10×2+11×3+12×4+13×3+14×4+15×2+16×2+17+18+19 = 324. Moyenne = 324/25 = 12,96.',
        points: 4
      },
      {
        question: 'Déterminer la médiane.',
        answer: '25 valeurs, la médiane est la 13ème valeur. En comptant : la 13ème valeur est 13.',
        points: 3
      },
      {
        question: 'Déterminer l\'étendue.',
        answer: 'Étendue = valeur max - valeur min = 19 - 8 = 11 points.',
        points: 2
      },
      {
        question: 'Quel pourcentage d\'élèves a obtenu 14 ou plus ?',
        answer: 'Élèves avec 14+ : 4+2+2+1+1+1 = 11 élèves. Pourcentage = 11/25 × 100 = 44%.',
        points: 3
      }
    ]
  },
  {
    id: 'prob-9',
    chapterId: 'statistiques',
    lessonId: '19',
    title: 'Tirage de boules',
    context: 'Une urne contient 5 boules rouges, 3 boules vertes et 2 boules bleues. On tire une boule au hasard.',
    difficulty: 'Facile',
    totalPoints: 10,
    steps: [
      {
        question: 'Combien y a-t-il de boules au total ?',
        answer: '5 + 3 + 2 = 10 boules.',
        points: 1
      },
      {
        question: 'Calculer la probabilité de tirer une boule rouge.',
        answer: 'P(rouge) = 5/10 = 1/2 = 0,5.',
        points: 2
      },
      {
        question: 'Calculer la probabilité de ne pas tirer une boule bleue.',
        answer: 'P(non bleue) = 1 - P(bleue) = 1 - 2/10 = 8/10 = 4/5 = 0,8.',
        points: 3
      },
      {
        question: 'On ajoute des boules rouges pour que P(rouge) = 0,6. Combien faut-il en ajouter ?',
        answer: 'Soit x le nombre de boules rouges ajoutées. P(rouge) = (5+x)/(10+x) = 0,6. Donc 5+x = 0,6(10+x) = 6 + 0,6x. Donc 0,4x = 1, donc x = 2,5. On arrondit : il faut ajouter 3 boules rouges (P = 8/13 ≈ 0,615).',
        points: 4
      }
    ]
  },
  {
    id: 'prob-10',
    chapterId: 'nombres',
    lessonId: '3',
    title: 'Racines carrées et géométrie',
    context: 'Un carré a une aire de 50 cm².',
    difficulty: 'Moyen',
    totalPoints: 10,
    steps: [
      {
        question: 'Exprimer le côté du carré sous forme simplifiée.',
        answer: 'Côté = √50 = √(25×2) = 5√2 cm.',
        points: 3
      },
      {
        question: 'Calculer le périmètre du carré sous forme simplifiée.',
        answer: 'Périmètre = 4 × 5√2 = 20√2 cm.',
        points: 2
      },
      {
        question: 'Donner une valeur approchée du périmètre au mm près.',
        answer: '20√2 ≈ 20 × 1,414 ≈ 28,28 cm ≈ 28,3 cm.',
        points: 2
      },
      {
        question: 'Un deuxième carré a un côté de 3√2 cm. Quelle est son aire ?',
        answer: 'Aire = (3√2)² = 9 × 2 = 18 cm².',
        points: 3
      }
    ]
  }
]

// Annales du Brevet
export const annales: Annale[] = [
  {
    id: 'annale-2023-metropole',
    year: 2023,
    session: 'Métropole - Juin',
    exercises: [
      {
        id: 'annale-2023-ex1',
        year: 2023,
        session: 'Métropole',
        title: 'Exercice 1',
        theme: 'Calcul numérique et littéral',
        points: 20,
        statement: 'Cet exercice est un questionnaire à choix multiples (QCM). Pour chaque question, une seule réponse est exacte. Aucune justification n\'est demandée.',
        questions: [
          { question: 'Parmi les nombres suivants, lequel est égal à 2³ × 2⁵ ?', subQuestions: ['A. 2⁸', 'B. 2¹⁵', 'C. 4⁸', 'D. 4¹⁵'] },
          { question: 'Le développement de (x + 3)(x - 2) est :', subQuestions: ['A. x² - 6', 'B. x² + x - 6', 'C. x² + 5x - 6', 'D. 2x + 1'] },
          { question: '√75 est égal à :', subQuestions: ['A. 5√3', 'B. 3√5', 'C. 25√3', 'D. √75'] },
          { question: 'La solution de l\'équation 3x - 7 = 2x + 5 est :', subQuestions: ['A. x = 12', 'B. x = -12', 'C. x = 2', 'D. x = -2'] }
        ],
        correction: '1. 2³ × 2⁵ = 2^(3+5) = 2⁸ → Réponse A\n2. (x+3)(x-2) = x² - 2x + 3x - 6 = x² + x - 6 → Réponse B\n3. √75 = √(25×3) = 5√3 → Réponse A\n4. 3x - 7 = 2x + 5 → x = 12 → Réponse A'
      },
      {
        id: 'annale-2023-ex2',
        year: 2023,
        session: 'Métropole',
        title: 'Exercice 2',
        theme: 'Géométrie - Pythagore et Thalès',
        points: 18,
        statement: 'Sur la figure ci-dessous, les droites (BE) et (CD) sont parallèles. On a : AB = 4 cm, AE = 3 cm, AC = 6 cm et CD = 9 cm.',
        questions: [
          { question: 'Calculer la longueur AD.' },
          { question: 'Calculer la longueur BE.' },
          { question: 'Le triangle ABE est-il rectangle ? Justifier.' }
        ],
        correction: '1. Par Thalès avec (BE)//(CD) : AB/AC = AD/... → AD = (AB × AC)/... À compléter selon la figure.\n2. Par Thalès : BE/CD = AB/AC → BE = (CD × AB)/AC = (9 × 4)/6 = 6 cm.\n3. AB² + AE² = 16 + 9 = 25 = 5². Si BE = 5 cm, le triangle serait rectangle par la réciproque de Pythagore.'
      },
      {
        id: 'annale-2023-ex3',
        year: 2023,
        session: 'Métropole',
        title: 'Exercice 3',
        theme: 'Fonctions',
        points: 16,
        statement: 'Une entreprise de location de vélos propose deux formules :\n- Formule A : 2€ par heure de location\n- Formule B : un abonnement de 15€ puis 0,50€ par heure',
        questions: [
          { question: 'Calculer le coût de location pour 5 heures avec chaque formule.' },
          { question: 'Exprimer le coût de chaque formule en fonction du nombre x d\'heures.' },
          { question: 'Déterminer pour quelle durée les deux formules sont équivalentes.' },
          { question: 'Quelle formule est la plus avantageuse pour une location de 12 heures ?' }
        ],
        correction: '1. Formule A : 2 × 5 = 10€. Formule B : 15 + 0,50 × 5 = 17,50€.\n2. Formule A : f(x) = 2x. Formule B : g(x) = 0,5x + 15.\n3. 2x = 0,5x + 15 → 1,5x = 15 → x = 10 heures.\n4. Pour 12h : A = 24€, B = 21€. La formule B est plus avantageuse.'
      }
    ]
  },
  {
    id: 'annale-2024-metropole',
    year: 2024,
    session: 'Métropole - Juin',
    exercises: [
      {
        id: 'annale-2024-ex1',
        year: 2024,
        session: 'Métropole',
        title: 'Exercice 1',
        theme: 'Calcul et programmes de calcul',
        points: 18,
        statement: 'Voici un programme de calcul :\n• Choisir un nombre\n• Ajouter 5\n• Multiplier par 3\n• Soustraire le triple du nombre choisi\n• Annoncer le résultat',
        questions: [
          { question: 'Vérifier que si on choisit 4, le résultat est 15.' },
          { question: 'Quel résultat obtient-on si on choisit -2 ?' },
          { question: 'Exprimer le résultat en fonction du nombre x choisi.' },
          { question: 'Que remarque-t-on ? Expliquer.' }
        ],
        correction: '1. (4 + 5) × 3 - 3×4 = 27 - 12 = 15 ✓\n2. (-2 + 5) × 3 - 3×(-2) = 9 + 6 = 15\n3. (x + 5) × 3 - 3x = 3x + 15 - 3x = 15\n4. Le résultat est toujours 15, quel que soit le nombre choisi. C\'est parce que les termes en x s\'annulent.'
      },
      {
        id: 'annale-2024-ex2',
        year: 2024,
        session: 'Métropole',
        title: 'Exercice 2',
        theme: 'Statistiques et probabilités',
        points: 20,
        statement: 'Une classe de 30 élèves a participé à une collecte de livres. Voici le nombre de livres apportés par chaque élève, regroupé par catégories.',
        questions: [
          { question: 'Calculer le nombre total de livres collectés.' },
          { question: 'Calculer le nombre moyen de livres par élève.' },
          { question: 'Déterminer la médiane de cette série.' },
          { question: 'On tire au sort un élève. Quelle est la probabilité qu\'il ait apporté plus de 3 livres ?' }
        ],
        correction: '1. Calcul selon les données du tableau.\n2. Moyenne = Total / 30\n3. La médiane est la moyenne des 15ème et 16ème valeurs.\n4. P = nombre d\'élèves avec plus de 3 livres / 30'
      },
      {
        id: 'annale-2024-ex3',
        year: 2024,
        session: 'Métropole',
        title: 'Exercice 3',
        theme: 'Trigonométrie',
        points: 16,
        statement: 'Un randonneur se trouve au point A. Il aperçoit le sommet S d\'une montagne sous un angle de 25° par rapport à l\'horizontale. Il avance de 500 m vers la montagne et arrive au point B. De B, il voit le sommet sous un angle de 35°.',
        questions: [
          { question: 'Faire un schéma de la situation.' },
          { question: 'Exprimer la hauteur h du sommet en fonction de la distance x entre B et le pied de la montagne.' },
          { question: 'Montrer que x peut se calculer par : x = 500 × tan(25°) / (tan(35°) - tan(25°))' },
          { question: 'Calculer la hauteur h de la montagne, arrondie au mètre.' }
        ],
        correction: '1. Schéma avec triangle et angles.\n2. Dans le triangle rectangle : h = x × tan(35°)\n3. De A : h = (x+500) × tan(25°). Donc x × tan(35°) = (x+500) × tan(25°)...\n4. x ≈ 889 m, h ≈ 623 m'
      }
    ]
  },
  {
    id: 'annale-2025-metropole',
    year: 2025,
    session: 'Métropole - Juin (sujet probable)',
    exercises: [
      {
        id: 'annale-2025-ex1',
        year: 2025,
        session: 'Sujet probable',
        title: 'Exercice 1',
        theme: 'QCM - Calcul et géométrie',
        points: 20,
        statement: 'Pour chaque question, une seule réponse est correcte.',
        questions: [
          { question: 'La factorisation de x² - 9 est :', subQuestions: ['A. (x-3)²', 'B. (x+3)²', 'C. (x+3)(x-3)', 'D. (x-9)(x+1)'] },
          { question: 'Dans un triangle rectangle, si cos(α) = 0,6 et l\'hypoténuse mesure 10 cm, le côté adjacent mesure :', subQuestions: ['A. 6 cm', 'B. 8 cm', 'C. 16 cm', 'D. 60 cm'] },
          { question: 'L\'écriture scientifique de 0,00034 est :', subQuestions: ['A. 34 × 10⁻⁵', 'B. 3,4 × 10⁻⁴', 'C. 3,4 × 10⁻³', 'D. 0,34 × 10⁻³'] },
          { question: 'La probabilité d\'obtenir un nombre pair en lançant un dé est :', subQuestions: ['A. 1/6', 'B. 1/3', 'C. 1/2', 'D. 3/6'] }
        ],
        correction: '1. x² - 9 = x² - 3² = (x+3)(x-3) → Réponse C\n2. Adjacent = cos(α) × hypoténuse = 0,6 × 10 = 6 cm → Réponse A\n3. 0,00034 = 3,4 × 10⁻⁴ → Réponse B\n4. Nombres pairs : {2,4,6}, P = 3/6 = 1/2 → Réponse C (ou D qui est équivalent)'
      },
      {
        id: 'annale-2025-ex2',
        year: 2025,
        session: 'Sujet probable',
        title: 'Exercice 2',
        theme: 'Problème - Économies',
        points: 22,
        statement: 'Léa et Tom économisent de l\'argent pour acheter un cadeau commun.\nLéa a 45€ et économise 12€ par semaine.\nTom a 90€ et économise 7€ par semaine.',
        questions: [
          { question: 'Exprimer les économies de chacun en fonction du nombre n de semaines.' },
          { question: 'Après combien de semaines auront-ils la même somme ?' },
          { question: 'Le cadeau coûte 200€. Après combien de semaines pourront-ils l\'acheter ensemble ?' },
          { question: 'Représenter graphiquement les deux fonctions et vérifier les résultats précédents.' }
        ],
        correction: '1. Léa : L(n) = 12n + 45. Tom : T(n) = 7n + 90.\n2. 12n + 45 = 7n + 90 → 5n = 45 → n = 9 semaines.\n3. L(n) + T(n) ≥ 200 → 19n + 135 ≥ 200 → 19n ≥ 65 → n ≥ 3,42. Après 4 semaines.\n4. Graphique avec deux droites se croisant en (9, 153).'
      },
      {
        id: 'annale-2025-ex3',
        year: 2025,
        session: 'Sujet probable',
        title: 'Exercice 3',
        theme: 'Géométrie dans l\'espace',
        points: 18,
        statement: 'Un cône de révolution a pour rayon de base 6 cm et pour hauteur 8 cm.',
        questions: [
          { question: 'Calculer le volume du cône.' },
          { question: 'Calculer la longueur de la génératrice.' },
          { question: 'On coupe le cône par un plan parallèle à la base, à 4 cm du sommet. Calculer le rayon de la section obtenue.' }
        ],
        correction: '1. V = (1/3)πr²h = (1/3)π × 36 × 8 = 96π ≈ 301,6 cm³\n2. g² = r² + h² = 36 + 64 = 100 → g = 10 cm\n3. Par Thalès : r\'/6 = 4/8 = 1/2 → r\' = 3 cm'
      }
    ]
  }
]
