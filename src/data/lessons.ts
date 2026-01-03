export interface Lesson {
  id: string
  chapterId: string
  title: string
  duration: number
  objectives: string[]
  content: LessonSection[]
}

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation?: string
}

export interface LessonSection {
  type: 'text' | 'definition' | 'theorem' | 'property' | 'formula' | 'example' | 'realworld' | 'method' | 'warning' | 'tip' | 'list' | 'quiz' | 'errors'
  title?: string
  content?: string | string[]
  math?: string
  quizType?: 'pre' | 'post'
  questions?: QuizQuestion[]
}

export const chapters = [
  { id: 'nombres', name: 'Nombres et Calculs', color: 'primary' },
  { id: 'fonctions', name: 'Fonctions', color: 'teal' },
  { id: 'geometrie', name: 'Géométrie', color: 'purple' },
  { id: 'statistiques', name: 'Statistiques et Probabilités', color: 'amber' },
]

export const lessons: Lesson[] = [
  // ============================================
  // CHAPITRE 1 : NOMBRES ET CALCULS
  // ============================================
  {
    id: '1',
    chapterId: 'nombres',
    title: 'Les fractions',
    duration: 25,
    objectives: [
      'Comparer et simplifier des fractions',
      'Additionner et soustraire des fractions',
      'Multiplier et diviser des fractions'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Que représente le nombre du dessus dans une fraction ?',
            options: ['Le dénominateur', 'Le numérateur', 'Le quotient', 'Le diviseur'],
            correct: 1,
            explanation: 'Le numérateur est le nombre au-dessus de la barre de fraction.'
          },
          {
            question: '1/2 est égal à :',
            options: ['0,2', '0,5', '2', '0,25'],
            correct: 1,
            explanation: '1/2 = 1 ÷ 2 = 0,5'
          }
        ]
      },
      {
        type: 'text',
        content: 'Les fractions sont partout dans notre vie quotidienne : quand on partage une pizza, quand on lit une recette de cuisine, quand on calcule une réduction...'
      },
      {
        type: 'definition',
        title: 'Fraction',
        content: 'Une fraction a/b représente le quotient de a par b, où a est le numérateur et b le dénominateur (b ≠ 0).',
        math: '\\frac{a}{b} = a \\div b'
      },
      {
        type: 'realworld',
        title: '🍕 Exemple concret : La pizza',
        content: 'Tu partages une pizza en 8 parts égales et tu en manges 3. Tu as mangé 3/8 de la pizza. Si ton ami en mange 2, il a mangé 2/8 = 1/4 de la pizza.'
      },
      {
        type: 'property',
        title: 'Fractions égales',
        content: 'On ne change pas la valeur d\'une fraction en multipliant ou divisant le numérateur ET le dénominateur par un même nombre non nul.',
        math: '\\frac{a}{b} = \\frac{a \\times k}{b \\times k} = \\frac{a \\div k}{b \\div k}'
      },
      {
        type: 'method',
        title: 'Simplifier une fraction',
        content: 'Pour simplifier, on divise le numérateur et le dénominateur par leur PGCD (Plus Grand Commun Diviseur).'
      },
      {
        type: 'example',
        title: 'Simplification',
        content: '12/18 : Le PGCD de 12 et 18 est 6. Donc 12/18 = (12÷6)/(18÷6) = 2/3'
      },
      {
        type: 'formula',
        title: 'Addition et soustraction',
        content: 'Pour additionner ou soustraire des fractions, il faut les mettre au même dénominateur.',
        math: '\\frac{a}{b} + \\frac{c}{d} = \\frac{a \\times d + c \\times b}{b \\times d}'
      },
      {
        type: 'realworld',
        title: '🧁 Exemple concret : La recette',
        content: 'Une recette demande 1/4 de litre de lait et 1/3 de litre de crème. Combien de liquide au total ? 1/4 + 1/3 = 3/12 + 4/12 = 7/12 de litre.'
      },
      {
        type: 'formula',
        title: 'Multiplication',
        content: 'On multiplie les numérateurs entre eux et les dénominateurs entre eux.',
        math: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}'
      },
      {
        type: 'formula',
        title: 'Division',
        content: 'Diviser par une fraction, c\'est multiplier par son inverse.',
        math: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} = \\frac{a \\times d}{b \\times c}'
      },
      {
        type: 'realworld',
        title: '🎮 Exemple concret : Le jeu vidéo',
        content: 'Tu as joué pendant 3/4 d\'heure et ton ami a joué 2 fois plus longtemps. Il a joué 3/4 × 2 = 3/4 × 2/1 = 6/4 = 3/2 = 1h30.'
      },
      {
        type: 'errors',
        title: 'Erreurs fréquentes à éviter',
        content: [
          'Additionner les numérateurs ET les dénominateurs : 1/2 + 1/3 ≠ 2/5',
          'Oublier de mettre au même dénominateur avant d\'additionner',
          'Simplifier avant de multiplier (plus efficace mais pas obligatoire)',
          'Confondre multiplication et division de fractions'
        ]
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Quelle est la forme simplifiée de 12/18 ?',
            options: ['6/9', '4/6', '2/3', '3/4'],
            correct: 2,
            explanation: 'Le PGCD de 12 et 18 est 6. Donc 12/18 = 2/3.'
          },
          {
            question: 'Calculer 1/4 + 1/3',
            options: ['2/7', '7/12', '1/6', '2/12'],
            correct: 1,
            explanation: '1/4 + 1/3 = 3/12 + 4/12 = 7/12'
          },
          {
            question: 'Calculer 2/5 × 3/4',
            options: ['5/9', '6/20', '3/10', '6/9'],
            correct: 2,
            explanation: '2/5 × 3/4 = 6/20 = 3/10'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    chapterId: 'nombres',
    title: 'Les puissances',
    duration: 20,
    objectives: [
      'Comprendre la notation puissance',
      'Appliquer les règles de calcul avec les puissances',
      'Utiliser les puissances de 10 et l\'écriture scientifique'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Que signifie 2³ ?',
            options: ['2 + 2 + 2', '2 × 3', '2 × 2 × 2', '3 × 3'],
            correct: 2,
            explanation: '2³ signifie 2 multiplié par lui-même 3 fois : 2 × 2 × 2 = 8'
          },
          {
            question: 'Combien vaut 10² ?',
            options: ['20', '100', '1000', '12'],
            correct: 1,
            explanation: '10² = 10 × 10 = 100'
          }
        ]
      },
      {
        type: 'text',
        content: 'Les puissances permettent d\'écrire de façon compacte des multiplications répétées. Elles sont essentielles en sciences pour exprimer des très grands ou très petits nombres.'
      },
      {
        type: 'definition',
        title: 'Puissance d\'un nombre',
        content: 'Pour tout nombre a et tout entier naturel n ≥ 1 : aⁿ = a × a × ... × a (n facteurs)',
        math: 'a^n = \\underbrace{a \\times a \\times \\cdots \\times a}_{n \\text{ fois}}'
      },
      {
        type: 'realworld',
        title: '🦠 Exemple concret : La multiplication des bactéries',
        content: 'Une bactérie se divise en 2 toutes les heures. Après 10 heures, il y en a 2¹⁰ = 1024. Après 20 heures : 2²⁰ = 1 048 576 bactéries !'
      },
      {
        type: 'property',
        title: 'Puissances particulières',
        content: 'a⁰ = 1 (pour a ≠ 0) et a¹ = a',
        math: 'a^0 = 1 \\quad \\text{et} \\quad a^1 = a'
      },
      {
        type: 'formula',
        title: 'Produit de puissances de même base',
        content: 'On additionne les exposants.',
        math: 'a^m \\times a^n = a^{m+n}'
      },
      {
        type: 'formula',
        title: 'Quotient de puissances de même base',
        content: 'On soustrait les exposants.',
        math: '\\frac{a^m}{a^n} = a^{m-n}'
      },
      {
        type: 'formula',
        title: 'Puissance d\'une puissance',
        content: 'On multiplie les exposants.',
        math: '(a^m)^n = a^{m \\times n}'
      },
      {
        type: 'definition',
        title: 'Puissance négative',
        content: 'Une puissance négative représente l\'inverse.',
        math: 'a^{-n} = \\frac{1}{a^n}'
      },
      {
        type: 'realworld',
        title: '🌍 Exemple concret : Les distances astronomiques',
        content: 'La distance Terre-Soleil est d\'environ 150 000 000 km = 1,5 × 10⁸ km. La taille d\'un atome est d\'environ 0,0000000001 m = 10⁻¹⁰ m.'
      },
      {
        type: 'definition',
        title: 'Écriture scientifique',
        content: 'Un nombre en écriture scientifique s\'écrit a × 10ⁿ avec 1 ≤ a < 10 et n entier relatif.',
        math: 'a \\times 10^n \\quad \\text{avec} \\quad 1 \\leq a < 10'
      },
      {
        type: 'example',
        title: 'Exemples d\'écriture scientifique',
        content: '• 3 450 000 = 3,45 × 10⁶\n• 0,00067 = 6,7 × 10⁻⁴\n• Population mondiale ≈ 8 × 10⁹ habitants'
      },
      {
        type: 'errors',
        title: 'Erreurs fréquentes à éviter',
        content: [
          'Confondre 2³ = 8 avec 2 × 3 = 6',
          'Oublier que a⁰ = 1 (et non 0)',
          'Se tromper dans le signe de l\'exposant : 10⁻² = 0,01 (pas 100)',
          'Additionner les exposants lors d\'une multiplication : 2³ × 3² ≠ 6⁵'
        ]
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Calculer 2⁴ × 2³',
            options: ['2⁷ = 128', '2¹² = 4096', '4⁷', '2⁷ = 14'],
            correct: 0,
            explanation: 'On additionne les exposants : 2⁴ × 2³ = 2⁴⁺³ = 2⁷ = 128'
          },
          {
            question: 'Quelle est l\'écriture scientifique de 0,00045 ?',
            options: ['45 × 10⁻⁵', '4,5 × 10⁻⁴', '0,45 × 10⁻³', '4,5 × 10⁴'],
            correct: 1,
            explanation: '0,00045 = 4,5 × 10⁻⁴ (on déplace la virgule de 4 rangs vers la droite)'
          },
          {
            question: 'Simplifier (10³)²',
            options: ['10⁵', '10⁶', '10⁹', '10¹'],
            correct: 1,
            explanation: 'On multiplie les exposants : (10³)² = 10³ˣ² = 10⁶'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    chapterId: 'nombres',
    title: 'Les racines carrées',
    duration: 20,
    objectives: [
      'Comprendre la notion de racine carrée',
      'Simplifier des racines carrées',
      'Calculer avec des racines carrées'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Quel nombre multiplié par lui-même donne 25 ?',
            options: ['5', '12,5', '625', '2,5'],
            correct: 0,
            explanation: '5 × 5 = 25, donc √25 = 5'
          },
          {
            question: 'Combien vaut √16 ?',
            options: ['8', '4', '256', '2'],
            correct: 1,
            explanation: '4 × 4 = 16, donc √16 = 4'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Racine carrée',
        content: 'La racine carrée d\'un nombre positif a, notée √a, est le nombre positif dont le carré vaut a.',
        math: '\\sqrt{a} \\geq 0 \\quad \\text{et} \\quad (\\sqrt{a})^2 = a'
      },
      {
        type: 'realworld',
        title: '📐 Exemple concret : Le terrain de foot',
        content: 'Un terrain carré a une aire de 100 m². Quel est le côté ? On cherche c tel que c² = 100. Donc c = √100 = 10 m.'
      },
      {
        type: 'warning',
        title: 'Attention !',
        content: '√a n\'existe (dans ℝ) que si a ≥ 0. On ne peut pas calculer √(-4) avec les nombres réels.'
      },
      {
        type: 'property',
        title: 'Carrés parfaits à connaître',
        content: '√1 = 1, √4 = 2, √9 = 3, √16 = 4, √25 = 5, √36 = 6, √49 = 7, √64 = 8, √81 = 9, √100 = 10'
      },
      {
        type: 'formula',
        title: 'Produit de racines carrées',
        content: 'La racine d\'un produit est le produit des racines.',
        math: '\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}'
      },
      {
        type: 'method',
        title: 'Simplifier une racine carrée',
        content: 'On cherche le plus grand carré parfait qui divise le nombre sous la racine.'
      },
      {
        type: 'example',
        title: 'Simplification',
        content: '√72 = √(36 × 2) = √36 × √2 = 6√2\n√50 = √(25 × 2) = √25 × √2 = 5√2'
      },
      {
        type: 'formula',
        title: 'Quotient de racines carrées',
        content: 'La racine d\'un quotient est le quotient des racines.',
        math: '\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}'
      },
      {
        type: 'realworld',
        title: '📱 Exemple concret : La diagonale d\'un écran',
        content: 'Un écran de téléphone mesure 6 cm × 8 cm. Sa diagonale vaut √(6² + 8²) = √(36 + 64) = √100 = 10 cm (grâce à Pythagore !).'
      },
      {
        type: 'tip',
        title: 'Valeurs approchées utiles',
        content: '√2 ≈ 1,414 ; √3 ≈ 1,732 ; √5 ≈ 2,236'
      },
      {
        type: 'errors',
        title: 'Erreurs fréquentes à éviter',
        content: [
          'Penser que √(a+b) = √a + √b (FAUX !)',
          'Oublier que √a n\'existe pas pour a < 0',
          'Confondre √a² = |a| (et non a, car √(-3)² = 3, pas -3)'
        ]
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Simplifier √48',
            options: ['4√3', '2√12', '6√2', '√48 ne se simplifie pas'],
            correct: 0,
            explanation: '√48 = √(16×3) = √16 × √3 = 4√3'
          },
          {
            question: 'Calculer √2 × √8',
            options: ['√10', '4', '√16', '2√2'],
            correct: 1,
            explanation: '√2 × √8 = √(2×8) = √16 = 4'
          },
          {
            question: 'Quelle est la diagonale d\'un carré de côté 5 cm ?',
            options: ['10 cm', '5√2 cm', '25 cm', '√5 cm'],
            correct: 1,
            explanation: 'Diagonale = côté × √2 = 5√2 cm (par Pythagore)'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    chapterId: 'nombres',
    title: 'Calcul littéral - Développer',
    duration: 25,
    objectives: [
      'Développer une expression avec la distributivité',
      'Utiliser les identités remarquables',
      'Développer des expressions complexes'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Que signifie 3x ?',
            options: ['3 + x', '3 × x', 'x³', '3/x'],
            correct: 1,
            explanation: '3x signifie 3 multiplié par x'
          },
          {
            question: 'Développer 2(a + 3) donne :',
            options: ['2a + 3', '2a + 6', '2a + 5', 'a + 6'],
            correct: 1,
            explanation: '2(a + 3) = 2×a + 2×3 = 2a + 6'
          }
        ]
      },
      {
        type: 'text',
        content: 'Le calcul littéral utilise des lettres pour représenter des nombres. C\'est un outil puissant pour résoudre des problèmes et établir des formules générales.'
      },
      {
        type: 'definition',
        title: 'Développer',
        content: 'Développer une expression, c\'est transformer un produit en une somme (ou différence).'
      },
      {
        type: 'formula',
        title: 'Distributivité simple',
        content: 'On distribue le facteur devant la parenthèse à chaque terme.',
        math: 'k(a + b) = ka + kb \\quad \\text{et} \\quad k(a - b) = ka - kb'
      },
      {
        type: 'realworld',
        title: '🛒 Exemple concret : Les courses',
        content: 'Tu achètes 3 croissants et 3 pains au chocolat. Prix : 3×1,20€ + 3×1,50€ = 3×(1,20 + 1,50) = 3×2,70€ = 8,10€. C\'est la distributivité !'
      },
      {
        type: 'formula',
        title: 'Double distributivité',
        content: 'Chaque terme du premier facteur multiplie chaque terme du second.',
        math: '(a + b)(c + d) = ac + ad + bc + bd'
      },
      {
        type: 'example',
        title: 'Application',
        content: '(x + 3)(x + 5) = x×x + x×5 + 3×x + 3×5 = x² + 5x + 3x + 15 = x² + 8x + 15'
      },
      {
        type: 'theorem',
        title: 'Identités remarquables',
        content: 'Ce sont des formules à connaître par cœur car elles reviennent souvent.',
        math: '(a + b)^2 = a^2 + 2ab + b^2'
      },
      {
        type: 'formula',
        title: 'Carré d\'une différence',
        math: '(a - b)^2 = a^2 - 2ab + b^2'
      },
      {
        type: 'formula',
        title: 'Produit somme-différence',
        math: '(a + b)(a - b) = a^2 - b^2'
      },
      {
        type: 'realworld',
        title: '🏠 Exemple concret : L\'agrandissement',
        content: 'Un jardin carré de côté a mètres est agrandi de 2 m de chaque côté. Nouvelle aire = (a+2)² = a² + 4a + 4. Si a = 10 m, l\'aire passe de 100 m² à 144 m², soit +44 m².'
      },
      {
        type: 'example',
        title: 'Utilisation des identités',
        content: '• (x + 7)² = x² + 14x + 49\n• (2x - 3)² = 4x² - 12x + 9\n• (x + 5)(x - 5) = x² - 25'
      },
      {
        type: 'errors',
        title: 'Erreurs fréquentes à éviter',
        content: [
          'Oublier le terme du milieu : (a+b)² ≠ a² + b²',
          'Se tromper de signe : (a-b)² = a² - 2ab + b² (pas +2ab)',
          'Confondre (a+b)² et (a+b)(a-b)'
        ]
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Développer (x + 4)²',
            options: ['x² + 16', 'x² + 8x + 16', 'x² + 4x + 16', '2x + 8'],
            correct: 1,
            explanation: '(x+4)² = x² + 2×x×4 + 4² = x² + 8x + 16'
          },
          {
            question: 'Développer (3x - 2)(3x + 2)',
            options: ['9x² - 4', '9x² + 4', '6x² - 4', '9x² - 12x + 4'],
            correct: 0,
            explanation: 'C\'est (a-b)(a+b) = a² - b² donc 9x² - 4'
          },
          {
            question: 'Développer (x + 1)(x + 3)',
            options: ['x² + 3', 'x² + 4x + 3', 'x² + 3x + 4', '2x + 4'],
            correct: 1,
            explanation: '(x+1)(x+3) = x² + 3x + x + 3 = x² + 4x + 3'
          }
        ]
      }
    ]
  },
  {
    id: '5',
    chapterId: 'nombres',
    title: 'Calcul littéral - Factoriser',
    duration: 25,
    objectives: [
      'Reconnaître un facteur commun',
      'Factoriser avec les identités remarquables',
      'Factoriser des expressions complexes'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Quel est le facteur commun de 6x et 9 ?',
            options: ['3', '6', 'x', '9'],
            correct: 0,
            explanation: '6x = 3 × 2x et 9 = 3 × 3, donc le facteur commun est 3'
          },
          {
            question: 'Factoriser signifie :',
            options: ['Transformer une somme en produit', 'Transformer un produit en somme', 'Simplifier', 'Calculer'],
            correct: 0,
            explanation: 'Factoriser = transformer une somme (ou différence) en produit'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Factoriser',
        content: 'Factoriser une expression, c\'est transformer une somme (ou différence) en un produit. C\'est l\'opération inverse du développement.'
      },
      {
        type: 'method',
        title: 'Factoriser par un facteur commun',
        content: 'On repère le facteur commun à tous les termes et on le met en évidence.',
        math: 'ka + kb = k(a + b)'
      },
      {
        type: 'example',
        title: 'Exemples',
        content: '• 6x + 15 = 3(2x + 5)\n• x² + 5x = x(x + 5)\n• 4x² - 8x = 4x(x - 2)'
      },
      {
        type: 'realworld',
        title: '💵 Exemple concret : Le partage',
        content: 'Tu as 12 bonbons et 18 chocolats à partager équitablement. 12 + 18 = 6×2 + 6×3 = 6(2+3) = 6×5 = 30. Tu peux faire 6 parts de 5 friandises.'
      },
      {
        type: 'theorem',
        title: 'Factorisation avec a² - b²',
        content: 'Une différence de deux carrés se factorise en produit de somme par différence.',
        math: 'a^2 - b^2 = (a + b)(a - b)'
      },
      {
        type: 'example',
        title: 'Applications',
        content: '• x² - 9 = x² - 3² = (x+3)(x-3)\n• 4x² - 25 = (2x)² - 5² = (2x+5)(2x-5)\n• x² - 7 = (x+√7)(x-√7)'
      },
      {
        type: 'method',
        title: 'Reconnaître un carré parfait',
        content: 'Si l\'expression est de la forme a² ± 2ab + b², on peut la factoriser en (a ± b)².'
      },
      {
        type: 'example',
        title: 'Carrés parfaits',
        content: '• x² + 6x + 9 = (x+3)² car 9 = 3² et 6x = 2×x×3\n• x² - 10x + 25 = (x-5)²\n• 4x² + 12x + 9 = (2x+3)²'
      },
      {
        type: 'warning',
        title: 'Piège à éviter',
        content: 'a² + b² ne se factorise PAS ! C\'est une erreur classique. Par exemple, x² + 9 ne peut pas être factorisé.'
      },
      {
        type: 'realworld',
        title: '📊 Exemple concret : Calcul mental',
        content: 'Calculer 97² : 97² = (100-3)² = 10000 - 600 + 9 = 9409. Ou : 103 × 97 = (100+3)(100-3) = 10000 - 9 = 9991.'
      },
      {
        type: 'errors',
        title: 'Erreurs fréquentes à éviter',
        content: [
          'Penser que a² + b² peut se factoriser (NON !)',
          'Oublier de vérifier que le facteur commun est dans TOUS les termes',
          'Ne pas reconnaître a² - b² comme une différence de carrés'
        ]
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Factoriser x² - 16',
            options: ['(x-4)²', '(x+4)(x-4)', '(x-8)(x+2)', 'Impossible'],
            correct: 1,
            explanation: 'x² - 16 = x² - 4² = (x+4)(x-4)'
          },
          {
            question: 'Factoriser 3x + 12',
            options: ['3(x + 4)', 'x(3 + 12)', '3x + 4', '15x'],
            correct: 0,
            explanation: '3x + 12 = 3×x + 3×4 = 3(x + 4)'
          },
          {
            question: 'Factoriser x² + 6x + 9',
            options: ['(x+3)²', '(x+9)(x+1)', '(x+3)(x-3)', '(x+6)(x+3)'],
            correct: 0,
            explanation: 'x² + 6x + 9 = x² + 2×3×x + 3² = (x+3)²'
          }
        ]
      }
    ]
  },
  {
    id: '6',
    chapterId: 'nombres',
    title: 'Équations du premier degré',
    duration: 30,
    objectives: [
      'Résoudre une équation du premier degré',
      'Mettre un problème en équation',
      'Résoudre des problèmes concrets'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Si x + 5 = 12, alors x vaut :',
            options: ['17', '7', '5', '12'],
            correct: 1,
            explanation: 'x = 12 - 5 = 7'
          },
          {
            question: 'Résoudre une équation, c\'est :',
            options: ['Trouver la valeur de x', 'Développer', 'Factoriser', 'Simplifier'],
            correct: 0,
            explanation: 'Résoudre une équation = trouver la valeur de l\'inconnue qui vérifie l\'égalité'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Équation du premier degré',
        content: 'Une équation du premier degré à une inconnue x est de la forme ax + b = 0 (avec a ≠ 0). Résoudre, c\'est trouver la valeur de x qui vérifie l\'égalité.'
      },
      {
        type: 'property',
        title: 'Règles de résolution',
        content: 'On peut ajouter ou soustraire le même nombre des deux côtés. On peut multiplier ou diviser les deux côtés par le même nombre non nul.'
      },
      {
        type: 'method',
        title: 'Méthode de résolution',
        content: '1. Développer si nécessaire\n2. Regrouper les termes en x d\'un côté\n3. Regrouper les nombres de l\'autre côté\n4. Diviser par le coefficient de x'
      },
      {
        type: 'example',
        title: 'Exemple détaillé',
        content: '3x + 7 = 2x - 5\n3x - 2x = -5 - 7\nx = -12\nVérification : 3×(-12) + 7 = -36 + 7 = -29 ✓\n2×(-12) - 5 = -24 - 5 = -29 ✓'
      },
      {
        type: 'realworld',
        title: '🎫 Exemple concret : Le cinéma',
        content: 'Le cinéma propose un abonnement à 15€/mois + 5€ par film, ou 9€ par film sans abonnement. À partir de combien de films l\'abonnement est-il rentable ?\n15 + 5x < 9x\n15 < 4x\nx > 3,75\nÀ partir de 4 films par mois, l\'abonnement est rentable.'
      },
      {
        type: 'example',
        title: 'Équation avec parenthèses',
        content: '2(x - 3) = 5x + 6\n2x - 6 = 5x + 6\n2x - 5x = 6 + 6\n-3x = 12\nx = -4'
      },
      {
        type: 'realworld',
        title: '🚗 Exemple concret : La rencontre',
        content: 'Alex part à 14h à 80 km/h. Béa part à 15h à 100 km/h du même endroit. Quand Béa rattrape-t-elle Alex ?\nDistance Alex = 80(t+1) où t = temps en heures après 15h\nDistance Béa = 100t\n80(t+1) = 100t → 80t + 80 = 100t → 80 = 20t → t = 4h\nBéa rattrape Alex à 19h, après 400 km.'
      },
      {
        type: 'warning',
        title: 'Cas particuliers',
        content: '• Si on obtient 0 = 0 : infinité de solutions (identité)\n• Si on obtient 0 = 5 : aucune solution (équation impossible)'
      },
      {
        type: 'errors',
        title: 'Erreurs fréquentes à éviter',
        content: [
          'Oublier de changer le signe quand on passe un terme de l\'autre côté',
          'Diviser par 0 (si le coefficient de x est 0)',
          'Oublier de vérifier la solution dans l\'équation de départ'
        ]
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Résoudre 3x - 6 = 0',
            options: ['x = 2', 'x = -2', 'x = 6', 'x = 3'],
            correct: 0,
            explanation: '3x = 6, donc x = 6/3 = 2'
          },
          {
            question: 'Résoudre 2x + 5 = x + 8',
            options: ['x = 3', 'x = 13', 'x = -3', 'x = 1'],
            correct: 0,
            explanation: '2x - x = 8 - 5, donc x = 3'
          },
          {
            question: 'Résoudre 4(x - 2) = 2x + 6',
            options: ['x = 7', 'x = 1', 'x = -1', 'x = 14'],
            correct: 0,
            explanation: '4x - 8 = 2x + 6, donc 2x = 14, x = 7'
          }
        ]
      }
    ]
  },

  // ============================================
  // CHAPITRE 2 : FONCTIONS
  // ============================================
  {
    id: '7',
    chapterId: 'fonctions',
    title: 'Notion de fonction',
    duration: 20,
    objectives: [
      'Comprendre le concept de fonction',
      'Déterminer l\'image et l\'antécédent',
      'Représenter une fonction graphiquement'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Une fonction associe à chaque nombre :',
            options: ['Plusieurs résultats', 'Un unique résultat', 'Aucun résultat', 'Une équation'],
            correct: 1,
            explanation: 'Une fonction associe à chaque nombre x un unique nombre f(x)'
          },
          {
            question: 'Si f(3) = 7, que représente le 7 ?',
            options: ['L\'antécédent de 3', 'L\'image de 3', 'Le coefficient', 'L\'inconnue'],
            correct: 1,
            explanation: '7 est l\'image de 3 par la fonction f'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Fonction',
        content: 'Une fonction f associe à chaque nombre x de son ensemble de définition un unique nombre noté f(x), appelé image de x par f.'
      },
      {
        type: 'realworld',
        title: '📦 Exemple concret : Le prix postal',
        content: 'Le prix d\'un colis dépend de son poids. C\'est une fonction : à chaque poids correspond un prix. f(2 kg) = 6,90€ signifie qu\'un colis de 2 kg coûte 6,90€.'
      },
      {
        type: 'definition',
        title: 'Image et antécédent',
        content: 'Si f(a) = b, on dit que :\n• b est l\'image de a par f\n• a est un antécédent de b par f'
      },
      {
        type: 'example',
        title: 'Lecture d\'un graphique',
        content: 'Sur le graphique de f, si le point (3; 5) appartient à la courbe, alors f(3) = 5, c\'est-à-dire 5 est l\'image de 3, et 3 est un antécédent de 5.'
      },
      {
        type: 'realworld',
        title: '🌡️ Exemple concret : La température',
        content: 'La température T en fonction de l\'heure h de la journée. Si T(14) = 28, cela signifie qu\'à 14h, il fait 28°C. L\'image de 14 est 28.'
      },
      {
        type: 'method',
        title: 'Déterminer une image par calcul',
        content: 'Pour f(x) = 2x² - 3, calculer f(4) :\nf(4) = 2 × 4² - 3 = 2 × 16 - 3 = 32 - 3 = 29'
      },
      {
        type: 'method',
        title: 'Déterminer un antécédent',
        content: 'Pour f(x) = 3x + 5, trouver l\'antécédent de 11 :\nOn résout f(x) = 11\n3x + 5 = 11\n3x = 6\nx = 2\nDonc 2 est l\'antécédent de 11.'
      },
      {
        type: 'warning',
        title: 'Attention !',
        content: 'Un nombre peut avoir plusieurs antécédents (ou aucun), mais il n\'a qu\'une seule image. Par exemple, pour f(x) = x², les antécédents de 4 sont 2 et -2.'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Pour f(x) = 2x + 1, calculer f(3)',
            options: ['7', '6', '5', '4'],
            correct: 0,
            explanation: 'f(3) = 2×3 + 1 = 6 + 1 = 7'
          },
          {
            question: 'Pour f(x) = x², quel est l\'antécédent de 9 ?',
            options: ['3 seulement', '-3 seulement', '3 et -3', '81'],
            correct: 2,
            explanation: '3² = 9 et (-3)² = 9, donc 3 et -3 sont antécédents de 9'
          },
          {
            question: 'Sur un graphique, l\'image de 2 se lit :',
            options: ['Sur l\'axe des abscisses', 'Sur l\'axe des ordonnées', 'À l\'origine', 'Nulle part'],
            correct: 1,
            explanation: 'L\'image se lit sur l\'axe des ordonnées (axe vertical)'
          }
        ]
      }
    ]
  },
  {
    id: '8',
    chapterId: 'fonctions',
    title: 'Fonctions linéaires',
    duration: 25,
    objectives: [
      'Reconnaître une situation de proportionnalité',
      'Représenter une fonction linéaire',
      'Calculer le coefficient de proportionnalité'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Une fonction linéaire a la forme :',
            options: ['f(x) = ax + b', 'f(x) = ax', 'f(x) = x²', 'f(x) = b'],
            correct: 1,
            explanation: 'Une fonction linéaire est de la forme f(x) = ax'
          },
          {
            question: 'Si le prix est proportionnel à la quantité, c\'est :',
            options: ['Une fonction affine', 'Une fonction linéaire', 'Une fonction constante', 'Une équation'],
            correct: 1,
            explanation: 'La proportionnalité se traduit par une fonction linéaire'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Fonction linéaire',
        content: 'Une fonction linéaire est une fonction de la forme f(x) = ax, où a est un nombre appelé coefficient.',
        math: 'f(x) = ax'
      },
      {
        type: 'property',
        title: 'Proportionnalité',
        content: 'Une fonction linéaire traduit une situation de proportionnalité. Le coefficient a est le coefficient de proportionnalité.'
      },
      {
        type: 'realworld',
        title: '⛽ Exemple concret : L\'essence',
        content: 'Le prix de l\'essence est proportionnel au volume. À 1,85€/L, le prix P en fonction du volume V est P(V) = 1,85V. Pour 40L : P(40) = 1,85 × 40 = 74€.'
      },
      {
        type: 'property',
        title: 'Représentation graphique',
        content: 'La représentation graphique d\'une fonction linéaire est une droite passant par l\'origine O(0;0).'
      },
      {
        type: 'definition',
        title: 'Coefficient directeur',
        content: 'Le coefficient a s\'appelle le coefficient directeur de la droite. Il indique la pente.',
        math: 'a = \\frac{\\text{variation de } y}{\\text{variation de } x} = \\frac{f(x_2) - f(x_1)}{x_2 - x_1}'
      },
      {
        type: 'example',
        title: 'Interprétation du coefficient',
        content: '• Si a > 0 : la fonction est croissante (la droite monte)\n• Si a < 0 : la fonction est décroissante (la droite descend)\n• Plus |a| est grand, plus la droite est pentue'
      },
      {
        type: 'realworld',
        title: '📱 Exemple concret : Le forfait data',
        content: 'Un forfait facture 0,05€ par Mo. Le coût C(x) = 0,05x. Pour 200 Mo : C(200) = 10€. Le graphique est une droite passant par O avec une pente faible.'
      },
      {
        type: 'method',
        title: 'Tracer une fonction linéaire',
        content: '1. Placer l\'origine O(0;0)\n2. Calculer f(1) = a et placer le point (1; a)\n3. Tracer la droite passant par ces deux points'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Pour f(x) = 3x, calculer f(4)',
            options: ['7', '12', '34', '1'],
            correct: 1,
            explanation: 'f(4) = 3 × 4 = 12'
          },
          {
            question: 'La droite représentant f(x) = 2x passe par :',
            options: ['(0; 2)', '(1; 1)', 'L\'origine O(0;0)', '(2; 0)'],
            correct: 2,
            explanation: 'Toute fonction linéaire passe par l\'origine'
          },
          {
            question: 'Si f(x) = -0,5x, la fonction est :',
            options: ['Croissante', 'Décroissante', 'Constante', 'Ni l\'un ni l\'autre'],
            correct: 1,
            explanation: 'a = -0,5 < 0, donc la fonction est décroissante'
          }
        ]
      }
    ]
  },
  {
    id: '9',
    chapterId: 'fonctions',
    title: 'Fonctions affines',
    duration: 25,
    objectives: [
      'Comprendre la notion de fonction affine',
      'Déterminer le coefficient directeur et l\'ordonnée à l\'origine',
      'Tracer la représentation graphique'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Une fonction affine a la forme :',
            options: ['f(x) = ax', 'f(x) = ax + b', 'f(x) = x²', 'f(x) = a/x'],
            correct: 1,
            explanation: 'Une fonction affine est de la forme f(x) = ax + b'
          },
          {
            question: 'Dans f(x) = 2x + 3, que représente le 3 ?',
            options: ['Le coefficient directeur', 'L\'ordonnée à l\'origine', 'L\'abscisse', 'La pente'],
            correct: 1,
            explanation: 'Le 3 est l\'ordonnée à l\'origine (où la droite coupe l\'axe des y)'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Fonction affine',
        content: 'Une fonction affine est une fonction de la forme f(x) = ax + b, où a est le coefficient directeur et b l\'ordonnée à l\'origine.',
        math: 'f(x) = ax + b'
      },
      {
        type: 'property',
        title: 'Cas particuliers',
        content: '• Si b = 0 : fonction linéaire f(x) = ax\n• Si a = 0 : fonction constante f(x) = b'
      },
      {
        type: 'realworld',
        title: '🚕 Exemple concret : Le taxi',
        content: 'Un taxi facture 3€ de prise en charge + 1,50€ par km. Le prix P(d) = 1,50d + 3. Pour 10 km : P(10) = 15 + 3 = 18€. Le 3€ est l\'ordonnée à l\'origine (prix de départ).'
      },
      {
        type: 'property',
        title: 'Représentation graphique',
        content: 'La représentation graphique d\'une fonction affine est une droite qui coupe l\'axe des ordonnées au point (0; b).'
      },
      {
        type: 'method',
        title: 'Déterminer a et b graphiquement',
        content: '• b : ordonnée du point d\'intersection avec l\'axe des ordonnées\n• a : on prend deux points A(x₁; y₁) et B(x₂; y₂) et on calcule a = (y₂ - y₁)/(x₂ - x₁)'
      },
      {
        type: 'example',
        title: 'Exemple graphique',
        content: 'La droite passe par (0; 2) et (3; 8).\nb = 2 (ordonnée à l\'origine)\na = (8-2)/(3-0) = 6/3 = 2\nDonc f(x) = 2x + 2'
      },
      {
        type: 'realworld',
        title: '📞 Exemple concret : Le forfait téléphone',
        content: 'Un forfait coûte 15€/mois + 0,10€ par minute hors forfait. C(m) = 0,10m + 15. Avec 30 min hors forfait : C(30) = 3 + 15 = 18€.'
      },
      {
        type: 'method',
        title: 'Tracer une fonction affine',
        content: '1. Placer le point (0; b) sur l\'axe des ordonnées\n2. Calculer f(1) = a + b et placer le point (1; a+b)\n3. Tracer la droite passant par ces deux points'
      },
      {
        type: 'property',
        title: 'Variations',
        content: '• Si a > 0 : fonction croissante\n• Si a < 0 : fonction décroissante\n• Si a = 0 : fonction constante'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Pour f(x) = 2x - 5, calculer f(3)',
            options: ['1', '6', '-1', '11'],
            correct: 0,
            explanation: 'f(3) = 2×3 - 5 = 6 - 5 = 1'
          },
          {
            question: 'Quelle est l\'ordonnée à l\'origine de f(x) = -3x + 7 ?',
            options: ['-3', '7', '3', '-7'],
            correct: 1,
            explanation: 'L\'ordonnée à l\'origine est b = 7'
          },
          {
            question: 'La droite passe par (0;4) et (2;10). Trouver a.',
            options: ['a = 2', 'a = 3', 'a = 4', 'a = 6'],
            correct: 1,
            explanation: 'a = (10-4)/(2-0) = 6/2 = 3'
          }
        ]
      }
    ]
  },
  {
    id: '10',
    chapterId: 'fonctions',
    title: 'Systèmes d\'équations',
    duration: 30,
    objectives: [
      'Résoudre un système par substitution',
      'Résoudre un système par combinaison',
      'Interpréter graphiquement'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Un système de 2 équations a combien d\'inconnues ?',
            options: ['1', '2', '3', 'Autant qu\'on veut'],
            correct: 1,
            explanation: 'On travaille avec 2 équations à 2 inconnues (généralement x et y)'
          },
          {
            question: 'Si x + y = 5 et x = 3, alors y vaut :',
            options: ['2', '8', '3', '5'],
            correct: 0,
            explanation: 'En remplaçant x par 3 : 3 + y = 5, donc y = 2'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Système de deux équations',
        content: 'Un système de deux équations à deux inconnues cherche les valeurs de x et y qui vérifient simultanément les deux équations.'
      },
      {
        type: 'realworld',
        title: '🎵 Exemple concret : Le concert',
        content: 'Billets adultes à 25€ et enfants à 12€. On a vendu 80 billets pour 1 480€. Combien de chaque ?\nx + y = 80 (nombre de billets)\n25x + 12y = 1480 (recette)\nSolution : 40 adultes et 40 enfants.'
      },
      {
        type: 'method',
        title: 'Méthode par substitution',
        content: '1. Exprimer une inconnue en fonction de l\'autre\n2. Remplacer dans l\'autre équation\n3. Résoudre l\'équation obtenue\n4. Calculer l\'autre inconnue'
      },
      {
        type: 'example',
        title: 'Exemple par substitution',
        content: 'x + y = 10 → y = 10 - x\n3x + 2y = 24\n3x + 2(10-x) = 24\n3x + 20 - 2x = 24\nx = 4\ny = 10 - 4 = 6\nSolution : (4; 6)'
      },
      {
        type: 'method',
        title: 'Méthode par combinaison',
        content: '1. Multiplier les équations pour avoir des coefficients opposés\n2. Additionner pour éliminer une inconnue\n3. Résoudre\n4. Reporter dans une équation'
      },
      {
        type: 'example',
        title: 'Exemple par combinaison',
        content: '2x + 3y = 13 (×2)\n4x - 3y = 5\n——————\n4x + 6y = 26\n4x - 3y = 5\n——————\n9y = 21 → y = 21/9 = 7/3'
      },
      {
        type: 'property',
        title: 'Interprétation graphique',
        content: 'Graphiquement, résoudre un système c\'est trouver le point d\'intersection des deux droites représentant les équations.'
      },
      {
        type: 'realworld',
        title: '🏪 Exemple concret : Les fournisseurs',
        content: 'Fournisseur A : 50€ + 3€/article. Fournisseur B : 20€ + 5€/article. Pour combien d\'articles le prix est-il le même ?\n50 + 3x = 20 + 5x\n30 = 2x\nx = 15 articles (prix : 95€)'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Résoudre : x + y = 7 et x - y = 3',
            options: ['x=5, y=2', 'x=4, y=3', 'x=3, y=4', 'x=2, y=5'],
            correct: 0,
            explanation: 'En additionnant : 2x = 10, donc x = 5 et y = 2'
          },
          {
            question: 'Par substitution : y = 2x et x + y = 9',
            options: ['x=3, y=6', 'x=6, y=3', 'x=4, y=5', 'x=9, y=0'],
            correct: 0,
            explanation: 'x + 2x = 9, donc 3x = 9, x = 3 et y = 6'
          },
          {
            question: 'Graphiquement, la solution est :',
            options: ['L\'origine', 'Le point d\'intersection des droites', 'Un point quelconque', 'Il n\'y a pas de solution'],
            correct: 1,
            explanation: 'La solution est le point d\'intersection des deux droites'
          }
        ]
      }
    ]
  },

  // ============================================
  // CHAPITRE 3 : GÉOMÉTRIE
  // ============================================
  {
    id: '11',
    chapterId: 'geometrie',
    title: 'Théorème de Pythagore',
    duration: 25,
    objectives: [
      'Énoncer et appliquer le théorème de Pythagore',
      'Calculer une longueur dans un triangle rectangle',
      'Démontrer qu\'un triangle est rectangle'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Dans un triangle rectangle, le plus grand côté s\'appelle :',
            options: ['Le côté adjacent', 'L\'hypoténuse', 'Le côté opposé', 'La médiane'],
            correct: 1,
            explanation: 'L\'hypoténuse est le côté le plus long, opposé à l\'angle droit'
          },
          {
            question: 'Si un triangle a des côtés 3, 4 et 5, est-il rectangle ?',
            options: ['Oui car 3² + 4² = 5²', 'Non', 'On ne peut pas savoir', 'Oui car 3 + 4 = 7'],
            correct: 0,
            explanation: '9 + 16 = 25, donc 3² + 4² = 5² et le triangle est rectangle'
          }
        ]
      },
      {
        type: 'theorem',
        title: 'Théorème de Pythagore',
        content: 'Dans un triangle rectangle, le carré de l\'hypoténuse est égal à la somme des carrés des deux autres côtés.',
        math: 'BC^2 = AB^2 + AC^2'
      },
      {
        type: 'definition',
        title: 'Hypoténuse',
        content: 'L\'hypoténuse est le côté le plus long du triangle rectangle. C\'est le côté opposé à l\'angle droit.'
      },
      {
        type: 'realworld',
        title: '📺 Exemple concret : La diagonale de l\'écran',
        content: 'Un écran mesure 80 cm de large et 60 cm de haut. Sa diagonale d = √(80² + 60²) = √(6400 + 3600) = √10000 = 100 cm = 40 pouces (car 1 pouce ≈ 2,54 cm).'
      },
      {
        type: 'method',
        title: 'Calculer l\'hypoténuse',
        content: 'Si l\'angle droit est en A, et AB = 5, AC = 12 :\nBC² = AB² + AC² = 25 + 144 = 169\nBC = √169 = 13'
      },
      {
        type: 'method',
        title: 'Calculer un côté de l\'angle droit',
        content: 'Si BC = 10 (hypoténuse) et AB = 6 :\nAC² = BC² - AB² = 100 - 36 = 64\nAC = √64 = 8'
      },
      {
        type: 'realworld',
        title: '🏗️ Exemple concret : L\'échelle',
        content: 'Une échelle de 5 m est posée contre un mur, le pied à 3 m du mur. À quelle hauteur atteint-elle le mur ? h² = 5² - 3² = 25 - 9 = 16, donc h = 4 m.'
      },
      {
        type: 'theorem',
        title: 'Réciproque du théorème de Pythagore',
        content: 'Si dans un triangle ABC on a BC² = AB² + AC², alors le triangle ABC est rectangle en A.'
      },
      {
        type: 'example',
        title: 'Démontrer qu\'un triangle est rectangle',
        content: 'Triangle avec côtés 5, 12 et 13.\n13² = 169\n5² + 12² = 25 + 144 = 169 ✓\nDonc le triangle est rectangle (angle droit opposé au côté 13).'
      },
      {
        type: 'realworld',
        title: '🔨 Exemple concret : La règle du 3-4-5',
        content: 'Les maçons utilisent la règle 3-4-5 pour vérifier un angle droit : 3² + 4² = 9 + 16 = 25 = 5². Un triangle de côtés 30-40-50 cm forme un angle droit parfait.'
      },
      {
        type: 'tip',
        title: 'Triplets pythagoriciens à connaître',
        content: '(3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25) et leurs multiples.'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Triangle rectangle avec côtés 6 et 8. Hypoténuse = ?',
            options: ['14', '10', '100', '48'],
            correct: 1,
            explanation: '6² + 8² = 36 + 64 = 100, donc hypoténuse = √100 = 10'
          },
          {
            question: 'Triangle avec hypoténuse 13 et un côté 5. L\'autre côté = ?',
            options: ['8', '12', '18', '√194'],
            correct: 1,
            explanation: '13² - 5² = 169 - 25 = 144, donc côté = √144 = 12'
          },
          {
            question: 'Le triangle 6-8-11 est-il rectangle ?',
            options: ['Oui', 'Non car 6² + 8² ≠ 11²', 'On ne peut pas savoir', 'Oui car 6 + 8 > 11'],
            correct: 1,
            explanation: '6² + 8² = 100 mais 11² = 121. Donc 100 ≠ 121, pas rectangle'
          }
        ]
      }
    ]
  },
  {
    id: '12',
    chapterId: 'geometrie',
    title: 'Théorème de Thalès',
    duration: 25,
    objectives: [
      'Énoncer et appliquer le théorème de Thalès',
      'Calculer une longueur avec Thalès',
      'Utiliser la réciproque pour prouver le parallélisme'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Le théorème de Thalès concerne :',
            options: ['Les triangles rectangles', 'Les droites parallèles', 'Les cercles', 'Les carrés'],
            correct: 1,
            explanation: 'Thalès s\'applique quand deux droites parallèles coupent deux sécantes'
          },
          {
            question: 'Si deux droites sont parallèles, les longueurs coupées sont :',
            options: ['Égales', 'Proportionnelles', 'Perpendiculaires', 'Quelconques'],
            correct: 1,
            explanation: 'Les segments découpés par des parallèles sont proportionnels'
          }
        ]
      },
      {
        type: 'theorem',
        title: 'Théorème de Thalès',
        content: 'Si deux droites parallèles coupent deux sécantes, alors elles déterminent des segments proportionnels.',
        math: '\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}'
      },
      {
        type: 'definition',
        title: 'Configuration de Thalès',
        content: 'On a une configuration de Thalès quand :\n• Deux droites (d) et (d\') sont sécantes en un point A\n• Deux droites parallèles (BC) et (MN) coupent ces sécantes'
      },
      {
        type: 'realworld',
        title: '🌲 Exemple concret : Mesurer un arbre',
        content: 'Pour mesurer un arbre, on plante un bâton de 2 m. Le bâton fait une ombre de 3 m et l\'arbre une ombre de 15 m. Par Thalès : h/2 = 15/3, donc h = 2 × 5 = 10 m.'
      },
      {
        type: 'method',
        title: 'Appliquer Thalès',
        content: '1. Vérifier que les droites sont parallèles\n2. Identifier les segments correspondants\n3. Écrire les rapports égaux\n4. Résoudre le produit en croix'
      },
      {
        type: 'example',
        title: 'Calcul de longueur',
        content: 'Dans un triangle ABC avec M sur [AB] et N sur [AC], (MN)//(BC).\nAM = 4, AB = 10, AN = 3.\nPar Thalès : AM/AB = AN/AC\n4/10 = 3/AC\nAC = 30/4 = 7,5'
      },
      {
        type: 'realworld',
        title: '🗺️ Exemple concret : La carte',
        content: 'Sur une carte, deux villes sont à 6 cm l\'une de l\'autre. Sur une autre carte 2 fois plus grande, elles seront à 12 cm. C\'est un agrandissement de rapport 2 (Thalès).'
      },
      {
        type: 'theorem',
        title: 'Réciproque du théorème de Thalès',
        content: 'Si les points sont alignés dans le bon ordre ET si AM/AB = AN/AC, alors (MN)//(BC).'
      },
      {
        type: 'warning',
        title: 'Condition d\'alignement',
        content: 'Pour la réciproque, il faut que les points soient alignés dans le bon ordre (A, M, B et A, N, C ou M, A, B et N, A, C).'
      },
      {
        type: 'example',
        title: 'Démontrer un parallélisme',
        content: 'A, M, B alignés avec AM = 2, AB = 6\nA, N, C alignés avec AN = 3, AC = 9\nAM/AB = 2/6 = 1/3\nAN/AC = 3/9 = 1/3 ✓\nDonc (MN)//(BC) par la réciproque de Thalès.'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'AM/AB = 2/5 et AN = 4. Si (MN)//(BC), alors AC = ?',
            options: ['10', '8', '6', '2'],
            correct: 0,
            explanation: 'AN/AC = AM/AB donc 4/AC = 2/5, AC = 4×5/2 = 10'
          },
          {
            question: 'Pour utiliser la réciproque de Thalès, il faut vérifier :',
            options: ['L\'alignement des points', 'L\'égalité des rapports', 'Les deux conditions', 'Aucune condition'],
            correct: 2,
            explanation: 'Il faut l\'alignement ET l\'égalité des rapports pour conclure au parallélisme'
          },
          {
            question: 'Un arbre fait une ombre de 12 m, un bâton de 2 m fait 3 m d\'ombre. Hauteur de l\'arbre ?',
            options: ['8 m', '6 m', '18 m', '4 m'],
            correct: 0,
            explanation: 'h/2 = 12/3 donc h = 2×4 = 8 m'
          }
        ]
      }
    ]
  },
  {
    id: '13',
    chapterId: 'geometrie',
    title: 'Trigonométrie',
    duration: 30,
    objectives: [
      'Connaître les formules trigonométriques',
      'Calculer une longueur avec cos, sin ou tan',
      'Calculer un angle avec cos, sin ou tan'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'La trigonométrie s\'applique dans :',
            options: ['N\'importe quel triangle', 'Les triangles rectangles', 'Les carrés', 'Les cercles'],
            correct: 1,
            explanation: 'Au niveau 3ème, la trigonométrie s\'applique dans les triangles rectangles'
          },
          {
            question: 'CAH-SOH-TOA est un moyen de retenir :',
            options: ['Les formules de Pythagore', 'Les formules de cos, sin et tan', 'Les identités remarquables', 'Les formules d\'aire'],
            correct: 1,
            explanation: 'CAH = Cos Adjacent/Hypoténuse, SOH = Sin Opposé/Hypoténuse, TOA = Tan Opposé/Adjacent'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Trigonométrie',
        content: 'La trigonométrie permet de calculer des longueurs et des angles dans un triangle rectangle en utilisant les rapports entre les côtés.'
      },
      {
        type: 'formula',
        title: 'Cosinus',
        content: 'Dans un triangle rectangle, le cosinus d\'un angle aigu est le rapport du côté adjacent sur l\'hypoténuse.',
        math: '\\cos(\\hat{A}) = \\frac{\\text{côté adjacent}}{\\text{hypoténuse}}'
      },
      {
        type: 'formula',
        title: 'Sinus',
        content: 'Le sinus d\'un angle aigu est le rapport du côté opposé sur l\'hypoténuse.',
        math: '\\sin(\\hat{A}) = \\frac{\\text{côté opposé}}{\\text{hypoténuse}}'
      },
      {
        type: 'formula',
        title: 'Tangente',
        content: 'La tangente d\'un angle aigu est le rapport du côté opposé sur le côté adjacent.',
        math: '\\tan(\\hat{A}) = \\frac{\\text{côté opposé}}{\\text{côté adjacent}} = \\frac{\\sin(\\hat{A})}{\\cos(\\hat{A})}'
      },
      {
        type: 'tip',
        title: 'Moyen mnémotechnique : CAH-SOH-TOA',
        content: 'Cos = Adjacent/Hypoténuse\nSin = Opposé/Hypoténuse\nTan = Opposé/Adjacent\n\nOu : \"Casse-toi, ça saoule !\"'
      },
      {
        type: 'realworld',
        title: '🎿 Exemple concret : La pente de ski',
        content: 'Une piste de ski descend de 200 m sur 800 m de long. L\'angle de pente α vérifie sin(α) = 200/800 = 0,25, donc α = 14,5°. C\'est une piste bleue.'
      },
      {
        type: 'method',
        title: 'Calculer une longueur',
        content: 'Triangle ABC rectangle en C, avec AB = 10 et angle Â = 35°.\nBC = AB × sin(35°) = 10 × 0,574 = 5,74\nAC = AB × cos(35°) = 10 × 0,819 = 8,19'
      },
      {
        type: 'method',
        title: 'Calculer un angle',
        content: 'Si on connaît deux côtés, on utilise la fonction inverse (arccos, arcsin, arctan).\ncos(Â) = 8/10 = 0,8\n → = arccos(0,8) ≈ 36,9°'
      },
      {
        type: 'realworld',
        title: '✈️ Exemple concret : L\'atterrissage',
        content: 'Un avion descend avec un angle de 3° vers la piste située à 10 km. À quelle altitude est-il ? h = 10 × tan(3°) = 10 × 0,052 = 0,52 km = 520 m.'
      },
      {
        type: 'property',
        title: 'Valeurs remarquables',
        content: 'cos(30°) = √3/2 ≈ 0,866 ; sin(30°) = 1/2 = 0,5\ncos(45°) = sin(45°) = √2/2 ≈ 0,707\ncos(60°) = 1/2 ; sin(60°) = √3/2'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Dans un triangle rectangle, cos(A) = adjacent/hypoténuse = 8/10. Donc cos(A) = ?',
            options: ['0,8', '0,6', '1,25', '80'],
            correct: 0,
            explanation: 'cos(A) = 8/10 = 0,8'
          },
          {
            question: 'Si tan(A) = 1, alors l\'angle A vaut :',
            options: ['30°', '45°', '60°', '90°'],
            correct: 1,
            explanation: 'tan(45°) = 1 car les côtés adjacents et opposés sont égaux'
          },
          {
            question: 'Hypoténuse = 10, angle = 30°. Côté opposé = ?',
            options: ['5', '8,66', '10', '5√3'],
            correct: 0,
            explanation: 'Opposé = hypoténuse × sin(30°) = 10 × 0,5 = 5'
          }
        ]
      }
    ]
  },
  {
    id: '14',
    chapterId: 'geometrie',
    title: 'Agrandissement et réduction',
    duration: 20,
    objectives: [
      'Comprendre la notion de rapport d\'agrandissement/réduction',
      'Calculer des longueurs, aires et volumes avec un rapport',
      'Résoudre des problèmes d\'échelle'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Si on double les longueurs d\'un carré, son aire est :',
            options: ['Doublée', 'Quadruplée', 'Inchangée', 'Triplée'],
            correct: 1,
            explanation: 'Si k=2 pour les longueurs, l\'aire est multipliée par k² = 4'
          },
          {
            question: 'Une échelle 1/100 signifie :',
            options: ['1 cm = 100 m', '1 cm = 1 m', '1 cm = 100 cm = 1 m', '100 cm = 1 cm'],
            correct: 2,
            explanation: '1 cm sur le plan = 100 cm = 1 m en réalité'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Rapport d\'agrandissement/réduction',
        content: 'Quand on multiplie toutes les longueurs d\'une figure par un nombre k > 0 :\n• Si k > 1 : agrandissement\n• Si k < 1 : réduction\n• Si k = 1 : figure identique'
      },
      {
        type: 'realworld',
        title: '📷 Exemple concret : Le zoom photo',
        content: 'Tu zoomes ×3 sur une photo. Une distance de 2 cm devient 6 cm. L\'image est un agrandissement de rapport 3.'
      },
      {
        type: 'theorem',
        title: 'Effet sur les longueurs',
        content: 'Si le rapport d\'agrandissement est k, alors toutes les longueurs sont multipliées par k.',
        math: 'L\' = k \\times L'
      },
      {
        type: 'theorem',
        title: 'Effet sur les aires',
        content: 'Si les longueurs sont multipliées par k, les aires sont multipliées par k².',
        math: 'A\' = k^2 \\times A'
      },
      {
        type: 'theorem',
        title: 'Effet sur les volumes',
        content: 'Si les longueurs sont multipliées par k, les volumes sont multipliés par k³.',
        math: 'V\' = k^3 \\times V'
      },
      {
        type: 'realworld',
        title: '🍕 Exemple concret : Les pizzas',
        content: 'Une pizza de diamètre 30 cm vs une de 40 cm. Le rapport des diamètres est 40/30 = 4/3. Le rapport des aires est (4/3)² = 16/9 ≈ 1,78. La grande pizza est presque 2 fois plus grande en surface !'
      },
      {
        type: 'example',
        title: 'Calcul avec les aires',
        content: 'Un terrain de 200 m² est représenté par un rectangle de 8 cm² sur un plan.\nRapport des aires : 200 m²/8 cm² = 200×10000 cm²/8 cm² = 250000\nRapport des longueurs : √250000 = 500\nÉchelle : 1/500'
      },
      {
        type: 'realworld',
        title: '🎈 Exemple concret : Le ballon',
        content: 'Un ballon double de rayon (k=2). Son aire est multipliée par 4 (il faut 4× plus de matière). Son volume est multiplié par 8 (il contient 8× plus d\'air).'
      },
      {
        type: 'method',
        title: 'Échelle d\'une carte',
        content: 'L\'échelle 1/25000 signifie que 1 cm sur la carte = 25000 cm = 250 m en réalité. C\'est une réduction de rapport k = 1/25000.'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Rapport k = 3. L\'aire est multipliée par :',
            options: ['3', '6', '9', '27'],
            correct: 2,
            explanation: 'L\'aire est multipliée par k² = 3² = 9'
          },
          {
            question: 'Rapport k = 2. Le volume est multiplié par :',
            options: ['2', '4', '6', '8'],
            correct: 3,
            explanation: 'Le volume est multiplié par k³ = 2³ = 8'
          },
          {
            question: 'Échelle 1/50000. 3 cm sur la carte = ? en réalité',
            options: ['150 m', '1,5 km', '15 km', '1500 m'],
            correct: 1,
            explanation: '3 × 50000 = 150000 cm = 1500 m = 1,5 km'
          }
        ]
      }
    ]
  },
  {
    id: '15',
    chapterId: 'geometrie',
    title: 'Sections de solides',
    duration: 20,
    objectives: [
      'Déterminer la section d\'un cube ou d\'un pavé par un plan',
      'Déterminer la section d\'un cylindre ou d\'un cône',
      'Calculer l\'aire d\'une section'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Une section d\'un solide est :',
            options: ['Son volume', 'La forme obtenue en le coupant', 'Sa surface totale', 'Son périmètre'],
            correct: 1,
            explanation: 'Une section est la forme de la "tranche" quand on coupe un solide'
          },
          {
            question: 'La section d\'une sphère par un plan est toujours :',
            options: ['Un carré', 'Un cercle', 'Un triangle', 'Un rectangle'],
            correct: 1,
            explanation: 'Toute section plane d\'une sphère est un cercle'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Section plane',
        content: 'La section d\'un solide par un plan est l\'ensemble des points communs au solide et au plan. C\'est la \"tranche\" obtenue si on coupe le solide.'
      },
      {
        type: 'property',
        title: 'Section d\'un cube par un plan parallèle à une face',
        content: 'La section est un carré de même dimensions que la face.'
      },
      {
        type: 'realworld',
        title: '🍰 Exemple concret : Le gâteau',
        content: 'Quand tu coupes un gâteau cylindrique horizontalement, tu obtiens un disque (section circulaire). Verticalement, tu obtiens un rectangle.'
      },
      {
        type: 'property',
        title: 'Section d\'un cylindre',
        content: '• Par un plan perpendiculaire à l\'axe : cercle (de rayon r)\n• Par un plan parallèle à l\'axe : rectangle'
      },
      {
        type: 'property',
        title: 'Section d\'une sphère',
        content: 'Toute section plane d\'une sphère est un cercle. Le plus grand cercle (passant par le centre) s\'appelle grand cercle.'
      },
      {
        type: 'realworld',
        title: '🌍 Exemple concret : La Terre',
        content: 'L\'équateur est un grand cercle de la Terre (section passant par le centre). Les parallèles sont des petits cercles (sections ne passant pas par le centre).'
      },
      {
        type: 'property',
        title: 'Section d\'un cône',
        content: '• Par un plan perpendiculaire à l\'axe : cercle (de rayon proportionnel à la distance au sommet)\n• Par un plan passant par le sommet : triangle isocèle'
      },
      {
        type: 'property',
        title: 'Section d\'une pyramide',
        content: 'La section d\'une pyramide par un plan parallèle à la base est une figure semblable à la base, avec un rapport de réduction.'
      },
      {
        type: 'example',
        title: 'Calcul de section',
        content: 'Un cône de hauteur 12 cm et de rayon de base 6 cm. Section à 8 cm du sommet.\nPar Thalès : r/6 = 8/12, donc r = 4 cm.\nAire de la section = π × 4² ≈ 50,3 cm².'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Section d\'un cylindre par un plan perpendiculaire à l\'axe :',
            options: ['Rectangle', 'Cercle', 'Ellipse', 'Triangle'],
            correct: 1,
            explanation: 'C\'est un cercle de même rayon que la base'
          },
          {
            question: 'Section d\'un cône par un plan passant par le sommet :',
            options: ['Cercle', 'Carré', 'Triangle isocèle', 'Rectangle'],
            correct: 2,
            explanation: 'C\'est un triangle isocèle dont le sommet est celui du cône'
          },
          {
            question: 'Le grand cercle d\'une sphère passe par :',
            options: ['N\'importe où', 'Le centre de la sphère', 'Le pôle', 'L\'équateur seulement'],
            correct: 1,
            explanation: 'Le grand cercle est la section passant par le centre (rayon maximum)'
          }
        ]
      }
    ]
  },
  {
    id: '16',
    chapterId: 'geometrie',
    title: 'Transformations géométriques',
    duration: 25,
    objectives: [
      'Construire l\'image d\'une figure par translation',
      'Construire l\'image d\'une figure par rotation',
      'Construire l\'image d\'une figure par homothétie'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'Une translation conserve :',
            options: ['Seulement les angles', 'Seulement les longueurs', 'Les angles et les longueurs', 'Rien'],
            correct: 2,
            explanation: 'La translation conserve toutes les propriétés : angles, longueurs, aires'
          },
          {
            question: 'Une homothétie de rapport 2 :',
            options: ['Réduit de moitié', 'Double les longueurs', 'Ne change rien', 'Fait pivoter'],
            correct: 1,
            explanation: 'Une homothétie de rapport 2 multiplie toutes les longueurs par 2'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Translation',
        content: 'Une translation de vecteur ū transforme tout point M en un point M\' tel que MM\' = ū. Tous les points se déplacent de la même manière.'
      },
      {
        type: 'realworld',
        title: '🛗 Exemple concret : L\'ascenseur',
        content: 'Quand un ascenseur monte, tous les points de la cabine subissent la même translation verticale. Les distances et les formes sont conservées.'
      },
      {
        type: 'property',
        title: 'Propriétés de la translation',
        content: 'La translation conserve :\n• Les longueurs\n• Les angles\n• Les aires\n• Le parallélisme'
      },
      {
        type: 'definition',
        title: 'Rotation',
        content: 'Une rotation de centre O et d\'angle α transforme tout point M en un point M\' tel que OM = OM\' et l\'angle MOM\' = α.'
      },
      {
        type: 'realworld',
        title: '🎡 Exemple concret : La grande roue',
        content: 'Les cabines d\'une grande roue effectuent une rotation autour de l\'axe central. Elles restent toutes à la même distance du centre.'
      },
      {
        type: 'property',
        title: 'Propriétés de la rotation',
        content: 'La rotation conserve :\n• Les longueurs\n• Les angles\n• Les aires'
      },
      {
        type: 'definition',
        title: 'Homothétie',
        content: 'Une homothétie de centre O et de rapport k transforme tout point M en un point M\' tel que OM\' = k × OM. Les points O, M, M\' sont alignés.'
      },
      {
        type: 'realworld',
        title: '🔍 Exemple concret : La loupe',
        content: 'Une loupe réalise une homothétie : elle agrandit l\'image (k > 1) en gardant le centre optique fixe. Les proportions sont conservées.'
      },
      {
        type: 'property',
        title: 'Propriétés de l\'homothétie',
        content: '• Les longueurs sont multipliées par |k|\n• Les angles sont conservés\n• Les aires sont multipliées par k²\n• Si k < 0 : la figure est retournée'
      },
      {
        type: 'example',
        title: 'Homothétie de rapport négatif',
        content: 'Une homothétie de rapport -2 double les longueurs ET retourne la figure par rapport au centre (symétrie + agrandissement).'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Par une rotation de centre O et d\'angle 90°, le point A devient A\'. Alors :',
            options: ['OA = OA\'', 'OA > OA\'', 'OA < OA\'', 'On ne peut pas savoir'],
            correct: 0,
            explanation: 'La rotation conserve les distances au centre'
          },
          {
            question: 'Homothétie de rapport k = -1. C\'est équivalent à :',
            options: ['Une translation', 'Une symétrie centrale', 'Une rotation de 90°', 'Aucune transformation'],
            correct: 1,
            explanation: 'k = -1 : les longueurs sont conservées mais la figure est retournée = symétrie centrale'
          },
          {
            question: 'Par homothétie de rapport 3, une aire de 4 cm² devient :',
            options: ['12 cm²', '36 cm²', '7 cm²', '64 cm²'],
            correct: 1,
            explanation: 'L\'aire est multipliée par k² = 3² = 9. Donc 4 × 9 = 36 cm²'
          }
        ]
      }
    ]
  },

  // ============================================
  // CHAPITRE 4 : STATISTIQUES ET PROBABILITÉS
  // ============================================
  {
    id: '17',
    chapterId: 'statistiques',
    title: 'Statistiques : Moyenne et médiane',
    duration: 20,
    objectives: [
      'Calculer une moyenne simple et pondérée',
      'Déterminer une médiane',
      'Interpréter ces indicateurs'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'La moyenne de 10, 12 et 14 est :',
            options: ['11', '12', '13', '36'],
            correct: 1,
            explanation: 'Moyenne = (10+12+14)/3 = 36/3 = 12'
          },
          {
            question: 'La médiane est :',
            options: ['La plus grande valeur', 'La valeur du milieu', 'La moyenne', 'La plus petite valeur'],
            correct: 1,
            explanation: 'La médiane est la valeur qui partage la série en deux parties égales'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Moyenne',
        content: 'La moyenne d\'une série statistique est la somme des valeurs divisée par l\'effectif total.',
        math: '\\bar{x} = \\frac{x_1 + x_2 + ... + x_n}{n}'
      },
      {
        type: 'realworld',
        title: '📝 Exemple concret : Les notes',
        content: 'Tu as eu 12, 15, 14, 11 et 13. Ta moyenne est (12+15+14+11+13)/5 = 65/5 = 13.'
      },
      {
        type: 'formula',
        title: 'Moyenne pondérée',
        content: 'Quand les valeurs ont des coefficients différents, on multiplie chaque valeur par son coefficient.',
        math: '\\bar{x} = \\frac{n_1 x_1 + n_2 x_2 + ... + n_k x_k}{n_1 + n_2 + ... + n_k}'
      },
      {
        type: 'realworld',
        title: '🎓 Exemple concret : Le bac',
        content: 'Maths coef 4 : note 14. Français coef 3 : note 12. Moyenne = (4×14 + 3×12)/(4+3) = (56+36)/7 = 92/7 ≈ 13,1.'
      },
      {
        type: 'definition',
        title: 'Médiane',
        content: 'La médiane est la valeur qui partage la série ordonnée en deux groupes de même effectif. 50% des valeurs sont inférieures, 50% sont supérieures.'
      },
      {
        type: 'method',
        title: 'Calculer la médiane',
        content: '1. Ranger les valeurs dans l\'ordre croissant\n2. Si n est impair : la médiane est la valeur du milieu (rang (n+1)/2)\n3. Si n est pair : la médiane est la moyenne des deux valeurs centrales'
      },
      {
        type: 'example',
        title: 'Exemple',
        content: 'Série : 8, 12, 15, 3, 7, 9, 11\nRangée : 3, 7, 8, 9, 11, 12, 15\nn = 7 (impair), médiane = valeur de rang 4 = 9'
      },
      {
        type: 'realworld',
        title: '💰 Exemple concret : Les salaires',
        content: 'Dans une entreprise : 5 employés à 1800€, 3 à 2500€, 1 patron à 10000€. Moyenne = 2922€. Médiane = 1800€. La médiane est plus représentative car non influencée par les valeurs extrêmes.'
      },
      {
        type: 'tip',
        title: 'Quand utiliser quoi ?',
        content: '• Moyenne : données homogènes, pas de valeurs extrêmes\n• Médiane : résistante aux valeurs extrêmes, plus représentative des \"cas typiques\"'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Moyenne pondérée : 15 (coef 2) et 12 (coef 3). Résultat ?',
            options: ['13,5', '13,2', '13,8', '27'],
            correct: 1,
            explanation: '(2×15 + 3×12)/(2+3) = (30+36)/5 = 66/5 = 13,2'
          },
          {
            question: 'Médiane de 3, 7, 8, 12, 15 :',
            options: ['7', '8', '9', '12'],
            correct: 1,
            explanation: '5 valeurs, la médiane est la 3ème = 8'
          },
          {
            question: 'Série : 1000€, 1200€, 1100€, 50000€. Le meilleur indicateur est :',
            options: ['La moyenne', 'La médiane', 'L\'étendue', 'Le maximum'],
            correct: 1,
            explanation: 'La médiane n\'est pas influencée par la valeur extrême de 50000€'
          }
        ]
      }
    ]
  },
  {
    id: '18',
    chapterId: 'statistiques',
    title: 'Statistiques : Étendue et quartiles',
    duration: 20,
    objectives: [
      'Calculer l\'étendue d\'une série',
      'Déterminer les quartiles',
      'Représenter une série par un diagramme en boîte'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'L\'étendue d\'une série mesure :',
            options: ['La moyenne', 'La dispersion', 'Le centre', 'L\'effectif'],
            correct: 1,
            explanation: 'L\'étendue = max - min, elle mesure la dispersion des valeurs'
          },
          {
            question: 'Combien y a-t-il de quartiles ?',
            options: ['2', '3', '4', '1'],
            correct: 1,
            explanation: 'Il y a 3 quartiles : Q1, Q2 (médiane) et Q3'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Étendue',
        content: 'L\'étendue est la différence entre la plus grande et la plus petite valeur de la série.',
        math: 'e = x_{max} - x_{min}'
      },
      {
        type: 'realworld',
        title: '🌡️ Exemple concret : Les températures',
        content: 'Sur une semaine, températures min 12°C et max 28°C. L\'étendue est 28 - 12 = 16°C. Cela mesure la dispersion des températures.'
      },
      {
        type: 'definition',
        title: 'Quartiles',
        content: 'Les quartiles partagent la série ordonnée en 4 groupes de même effectif.\n• Q1 (1er quartile) : 25% des valeurs sont inférieures\n• Q2 = médiane : 50%\n• Q3 (3ème quartile) : 75% des valeurs sont inférieures'
      },
      {
        type: 'definition',
        title: 'Écart interquartile',
        content: 'L\'écart interquartile IQ = Q3 - Q1 mesure la dispersion des 50% centraux de la série.',
        math: 'IQ = Q_3 - Q_1'
      },
      {
        type: 'realworld',
        title: '🏃 Exemple concret : Le marathon',
        content: 'Temps des coureurs : Q1 = 3h30, médiane = 4h, Q3 = 4h45. La moitié des coureurs finissent entre 3h30 et 4h45 (IQ = 1h15).'
      },
      {
        type: 'method',
        title: 'Construire un diagramme en boîte',
        content: '1. Tracer une droite graduée\n2. Placer les valeurs min, Q1, médiane, Q3, max\n3. Dessiner une boîte de Q1 à Q3\n4. Tracer la médiane à l\'intérieur\n5. Ajouter les moustaches jusqu\'au min et max'
      },
      {
        type: 'property',
        title: 'Lecture d\'un diagramme en boîte',
        content: '• La boîte centrale contient 50% des données\n• La médiane partage la boîte en deux\n• Les moustaches montrent l\'étendue totale\n• La largeur de la boîte = écart interquartile'
      },
      {
        type: 'realworld',
        title: '📊 Exemple concret : Comparer deux classes',
        content: 'Les diagrammes en boîte permettent de comparer visuellement deux séries. Si les boîtes ne se chevauchent pas, les groupes sont très différents.'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Étendue de 5, 12, 8, 3, 15 :',
            options: ['12', '10', '15', '3'],
            correct: 0,
            explanation: 'Étendue = max - min = 15 - 3 = 12'
          },
          {
            question: 'L\'écart interquartile est :',
            options: ['Q3 - Q1', 'Q2 - Q1', 'Max - Min', 'Q3 + Q1'],
            correct: 0,
            explanation: 'L\'écart interquartile = Q3 - Q1'
          },
          {
            question: 'Dans un diagramme en boîte, la boîte contient :',
            options: ['100% des valeurs', '50% des valeurs', '25% des valeurs', '75% des valeurs'],
            correct: 1,
            explanation: 'La boîte va de Q1 à Q3, soit 50% des valeurs (du 25ème au 75ème percentile)'
          }
        ]
      }
    ]
  },
  {
    id: '19',
    chapterId: 'statistiques',
    title: 'Probabilités : Vocabulaire et calculs',
    duration: 25,
    objectives: [
      'Maîtriser le vocabulaire des probabilités',
      'Calculer des probabilités simples',
      'Utiliser un arbre de probabilités'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'La probabilité d\'un événement est un nombre entre :',
            options: ['0 et 100', '-1 et 1', '0 et 1', '1 et 10'],
            correct: 2,
            explanation: 'Une probabilité est toujours comprise entre 0 (impossible) et 1 (certain)'
          },
          {
            question: 'L\'univers d\'un lancer de dé est :',
            options: ['{1, 2, 3}', '{1, 2, 3, 4, 5, 6}', '{pair, impair}', '{1, 6}'],
            correct: 1,
            explanation: 'L\'univers contient toutes les issues possibles : 1, 2, 3, 4, 5, 6'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Expérience aléatoire',
        content: 'Une expérience aléatoire est une expérience dont on ne peut pas prévoir le résultat avec certitude, mais dont on connaît tous les résultats possibles.'
      },
      {
        type: 'definition',
        title: 'Vocabulaire',
        content: '• Issue : résultat possible de l\'expérience\n• Univers Ω : ensemble de toutes les issues\n• Événement : ensemble d\'issues\n• Événement élémentaire : une seule issue'
      },
      {
        type: 'realworld',
        title: '🎲 Exemple concret : Le dé',
        content: 'Lancer un dé : Ω = {1, 2, 3, 4, 5, 6}. \"Obtenir un nombre pair\" est l\'événement {2, 4, 6}. \"Obtenir 6\" est un événement élémentaire.'
      },
      {
        type: 'definition',
        title: 'Probabilité',
        content: 'La probabilité d\'un événement A, notée P(A), est un nombre entre 0 et 1.\n• P(A) = 0 : événement impossible\n• P(A) = 1 : événement certain\n• P(Ω) = 1 (la somme des probabilités vaut 1)'
      },
      {
        type: 'formula',
        title: 'Équiprobabilité',
        content: 'Si toutes les issues sont équiprobables :',
        math: 'P(A) = \\frac{\\text{nombre d\'issues favorables}}{\\text{nombre total d\'issues}}'
      },
      {
        type: 'realworld',
        title: '🎴 Exemple concret : Les cartes',
        content: 'Dans un jeu de 52 cartes, probabilité de tirer un as = 4/52 = 1/13. Probabilité de tirer un cœur = 13/52 = 1/4.'
      },
      {
        type: 'property',
        title: 'Événement contraire',
        content: 'L\'événement contraire de A, noté Ā, contient toutes les issues qui ne sont pas dans A.',
        math: 'P(\\bar{A}) = 1 - P(A)'
      },
      {
        type: 'realworld',
        title: '☂️ Exemple concret : La météo',
        content: 'S\'il y a 30% de chances qu\'il pleuve, il y a 70% de chances qu\'il ne pleuve pas. P(pas de pluie) = 1 - 0,30 = 0,70.'
      },
      {
        type: 'method',
        title: 'Arbre de probabilités',
        content: 'Pour les expériences à plusieurs étapes :\n• Chaque branche représente une issue\n• On écrit la probabilité sur chaque branche\n• La probabilité d\'un chemin = produit des probabilités des branches'
      },
      {
        type: 'example',
        title: 'Exemple avec arbre',
        content: 'On tire 2 fois une pièce. P(2 faces) = P(Face) × P(Face) = 1/2 × 1/2 = 1/4.\nP(au moins 1 pile) = 1 - P(2 faces) = 3/4.'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'Probabilité d\'obtenir un 6 avec un dé équilibré :',
            options: ['1/3', '1/6', '6', '0'],
            correct: 1,
            explanation: '1 issue favorable (le 6) sur 6 issues possibles = 1/6'
          },
          {
            question: 'P(obtenir un nombre pair avec un dé) = ?',
            options: ['1/6', '1/3', '1/2', '2/3'],
            correct: 2,
            explanation: '3 issues favorables (2, 4, 6) sur 6 possibles = 3/6 = 1/2'
          },
          {
            question: 'Si P(A) = 0,3, alors P(contraire de A) = ?',
            options: ['0,3', '0,7', '0', '1'],
            correct: 1,
            explanation: 'P(contraire) = 1 - P(A) = 1 - 0,3 = 0,7'
          }
        ]
      }
    ]
  },
  {
    id: '20',
    chapterId: 'statistiques',
    title: 'Probabilités : Événements et fréquences',
    duration: 20,
    objectives: [
      'Calculer la probabilité d\'une réunion ou intersection',
      'Lier fréquence et probabilité',
      'Résoudre des problèmes de probabilités'
    ],
    content: [
      {
        type: 'quiz',
        title: 'Teste tes connaissances',
        quizType: 'pre',
        questions: [
          {
            question: 'A ∪ B signifie :',
            options: ['A ET B', 'A OU B', 'Ni A ni B', 'A sans B'],
            correct: 1,
            explanation: '∪ signifie "union" = A ou B (ou les deux)'
          },
          {
            question: 'La fréquence observée se rapproche de la probabilité quand :',
            options: ['On fait peu d\'expériences', 'On fait beaucoup d\'expériences', 'Jamais', 'Toujours exactement'],
            correct: 1,
            explanation: 'C\'est la loi des grands nombres : plus on répète, plus la fréquence converge'
          }
        ]
      },
      {
        type: 'definition',
        title: 'Réunion d\'événements',
        content: 'L\'événement A ∪ B (\"A ou B\") est réalisé si A est réalisé OU B est réalisé (ou les deux).'
      },
      {
        type: 'definition',
        title: 'Intersection d\'événements',
        content: 'L\'événement A ∩ B (\"A et B\") est réalisé si A est réalisé ET B est réalisé simultanément.'
      },
      {
        type: 'definition',
        title: 'Événements incompatibles',
        content: 'Deux événements sont incompatibles si leur intersection est vide (ils ne peuvent pas se produire en même temps). Dans ce cas : P(A ∪ B) = P(A) + P(B).'
      },
      {
        type: 'realworld',
        title: '🎲 Exemple concret : Le dé',
        content: 'A = \"pair\" = {2,4,6}, B = \"supérieur à 4\" = {5,6}.\nA ∩ B = {6} (pair ET >4)\nA ∪ B = {2,4,5,6} (pair OU >4)'
      },
      {
        type: 'formula',
        title: 'Formule générale',
        content: 'Pour deux événements quelconques :',
        math: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)'
      },
      {
        type: 'definition',
        title: 'Fréquence',
        content: 'La fréquence d\'un événement est le rapport entre le nombre de fois où il s\'est produit et le nombre total d\'expériences.',
        math: 'f = \\frac{\\text{nombre de fois où A se produit}}{\\text{nombre total d\'expériences}}'
      },
      {
        type: 'property',
        title: 'Lien fréquence-probabilité',
        content: 'Quand le nombre d\'expériences augmente, la fréquence observée se rapproche de la probabilité théorique. C\'est la loi des grands nombres.'
      },
      {
        type: 'realworld',
        title: '🎰 Exemple concret : Les jeux',
        content: 'Au loto, la probabilité de gagner le gros lot est d\'environ 1/19 millions. Si tu joues 19 millions de fois... tu devrais gagner une fois en moyenne. Mais chaque tirage reste indépendant !'
      },
      {
        type: 'example',
        title: 'Calcul de probabilité',
        content: 'On lance un dé. P(pair) = 3/6 = 1/2. P(>4) = 2/6 = 1/3. P(pair et >4) = P({6}) = 1/6.\nP(pair ou >4) = 1/2 + 1/3 - 1/6 = 3/6 + 2/6 - 1/6 = 4/6 = 2/3.'
      },
      {
        type: 'warning',
        title: 'Piège classique',
        content: 'Une pièce est tombée sur pile 5 fois de suite. La probabilité d\'avoir pile au 6ème lancer est toujours 1/2 ! Les lancers sont indépendants.'
      },
      {
        type: 'quiz',
        title: 'Vérifie ta compréhension',
        quizType: 'post',
        questions: [
          {
            question: 'P(A) = 1/2, P(B) = 1/3, A et B incompatibles. P(A ou B) = ?',
            options: ['1/6', '5/6', '1', '2/5'],
            correct: 1,
            explanation: 'Si incompatibles, P(A∪B) = P(A) + P(B) = 1/2 + 1/3 = 5/6'
          },
          {
            question: 'Après 100 lancers, on obtient 47 piles. La fréquence est :',
            options: ['47', '0,47', '47%', '0,47 et 47%'],
            correct: 3,
            explanation: 'Fréquence = 47/100 = 0,47 = 47%'
          },
          {
            question: 'Une pièce tombe 10 fois sur pile. Au 11ème lancer, P(pile) = ?',
            options: ['Très élevée', 'Très faible', '1/2', '0'],
            correct: 2,
            explanation: 'Chaque lancer est indépendant, donc P(pile) = 1/2 toujours'
          }
        ]
      }
    ]
  }
]
