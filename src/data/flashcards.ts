export interface Flashcard {
  id: string
  chapterId: string
  category: string
  front: string
  back: string
  math?: string
  tip?: string
}

export const flashcards: Flashcard[] = [
  // NOMBRES ET CALCULS - Fractions
  {
    id: 'fc-1',
    chapterId: 'nombres',
    category: 'Fractions',
    front: 'Comment additionner deux fractions ?',
    back: 'On met au même dénominateur, puis on additionne les numérateurs.',
    math: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}',
    tip: 'Pense à simplifier le résultat !'
  },
  {
    id: 'fc-2',
    chapterId: 'nombres',
    category: 'Fractions',
    front: 'Comment multiplier deux fractions ?',
    back: 'On multiplie les numérateurs entre eux et les dénominateurs entre eux.',
    math: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}',
  },
  {
    id: 'fc-3',
    chapterId: 'nombres',
    category: 'Fractions',
    front: 'Comment diviser par une fraction ?',
    back: 'Diviser par une fraction revient à multiplier par son inverse.',
    math: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}',
    tip: 'Exemple : 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2'
  },

  // NOMBRES ET CALCULS - Puissances
  {
    id: 'fc-4',
    chapterId: 'nombres',
    category: 'Puissances',
    front: 'Produit de puissances de même base',
    back: 'On garde la base et on additionne les exposants.',
    math: 'a^m \\times a^n = a^{m+n}',
    tip: 'Exemple : 2³ × 2⁴ = 2⁷'
  },
  {
    id: 'fc-5',
    chapterId: 'nombres',
    category: 'Puissances',
    front: 'Quotient de puissances de même base',
    back: 'On garde la base et on soustrait les exposants.',
    math: '\\frac{a^m}{a^n} = a^{m-n}',
    tip: 'Exemple : 5⁶ ÷ 5² = 5⁴'
  },
  {
    id: 'fc-6',
    chapterId: 'nombres',
    category: 'Puissances',
    front: 'Puissance d\'une puissance',
    back: 'On garde la base et on multiplie les exposants.',
    math: '(a^m)^n = a^{m \\times n}',
    tip: 'Exemple : (3²)³ = 3⁶'
  },
  {
    id: 'fc-7',
    chapterId: 'nombres',
    category: 'Puissances',
    front: 'Que vaut a⁰ ?',
    back: 'Tout nombre (non nul) élevé à la puissance 0 égale 1.',
    math: 'a^0 = 1 \\quad (a \\neq 0)',
  },
  {
    id: 'fc-8',
    chapterId: 'nombres',
    category: 'Puissances',
    front: 'Que vaut a⁻ⁿ ?',
    back: 'Une puissance négative est l\'inverse de la puissance positive.',
    math: 'a^{-n} = \\frac{1}{a^n}',
    tip: 'Exemple : 10⁻³ = 1/1000 = 0,001'
  },
  {
    id: 'fc-9',
    chapterId: 'nombres',
    category: 'Puissances',
    front: 'Écriture scientifique',
    back: 'Un nombre en écriture scientifique a la forme a × 10ⁿ avec 1 ≤ a < 10.',
    math: 'a \\times 10^n \\quad (1 \\leq a < 10)',
    tip: 'Exemple : 4500 = 4,5 × 10³'
  },

  // NOMBRES ET CALCULS - Racines carrées
  {
    id: 'fc-10',
    chapterId: 'nombres',
    category: 'Racines carrées',
    front: 'Définition de √a',
    back: '√a est le nombre positif dont le carré vaut a.',
    math: '(\\sqrt{a})^2 = a \\quad \\text{et} \\quad \\sqrt{a^2} = |a|',
  },
  {
    id: 'fc-11',
    chapterId: 'nombres',
    category: 'Racines carrées',
    front: 'Produit de racines carrées',
    back: 'La racine du produit égale le produit des racines.',
    math: '\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}',
    tip: 'Utile pour simplifier : √50 = √25×2 = 5√2'
  },
  {
    id: 'fc-12',
    chapterId: 'nombres',
    category: 'Racines carrées',
    front: 'Quotient de racines carrées',
    back: 'La racine du quotient égale le quotient des racines.',
    math: '\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}',
  },
  {
    id: 'fc-13',
    chapterId: 'nombres',
    category: 'Racines carrées',
    front: 'Attention avec l\'addition de racines !',
    back: '√(a+b) ≠ √a + √b ! Cette égalité est FAUSSE.',
    math: '\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}',
    tip: 'Contre-exemple : √(9+16) = √25 = 5, mais √9 + √16 = 3 + 4 = 7'
  },

  // NOMBRES ET CALCULS - Identités remarquables
  {
    id: 'fc-14',
    chapterId: 'nombres',
    category: 'Identités remarquables',
    front: 'Carré d\'une somme (a + b)²',
    back: 'Le carré d\'une somme égale la somme des carrés plus le double produit.',
    math: '(a+b)^2 = a^2 + 2ab + b^2',
    tip: 'Moyen mnémotechnique : "premier carré, double produit, dernier carré"'
  },
  {
    id: 'fc-15',
    chapterId: 'nombres',
    category: 'Identités remarquables',
    front: 'Carré d\'une différence (a - b)²',
    back: 'Le carré d\'une différence égale la somme des carrés moins le double produit.',
    math: '(a-b)^2 = a^2 - 2ab + b^2',
  },
  {
    id: 'fc-16',
    chapterId: 'nombres',
    category: 'Identités remarquables',
    front: 'Différence de deux carrés (a+b)(a-b)',
    back: 'Le produit d\'une somme par une différence donne la différence des carrés.',
    math: '(a+b)(a-b) = a^2 - b^2',
    tip: 'Très utile pour factoriser : x² - 9 = (x+3)(x-3)'
  },

  // NOMBRES ET CALCULS - Équations
  {
    id: 'fc-17',
    chapterId: 'nombres',
    category: 'Équations',
    front: 'Comment résoudre ax + b = c ?',
    back: 'On isole x : ax = c - b, donc x = (c - b) / a',
    math: 'ax + b = c \\Rightarrow x = \\frac{c-b}{a}',
    tip: 'N\'oublie pas de vérifier ta solution !'
  },
  {
    id: 'fc-18',
    chapterId: 'nombres',
    category: 'Équations',
    front: 'Produit nul',
    back: 'Si A × B = 0, alors A = 0 ou B = 0.',
    math: 'A \\times B = 0 \\Leftrightarrow A = 0 \\text{ ou } B = 0',
    tip: 'Très utile pour les équations factorisées !'
  },

  // FONCTIONS
  {
    id: 'fc-19',
    chapterId: 'fonctions',
    category: 'Vocabulaire',
    front: 'Qu\'est-ce que l\'image de x par f ?',
    back: 'C\'est le nombre f(x) obtenu en appliquant la fonction f à x.',
    tip: 'f(3) = 7 signifie "l\'image de 3 par f est 7"'
  },
  {
    id: 'fc-20',
    chapterId: 'fonctions',
    category: 'Vocabulaire',
    front: 'Qu\'est-ce qu\'un antécédent ?',
    back: 'Un antécédent de y par f est un nombre x tel que f(x) = y.',
    tip: 'Un nombre peut avoir plusieurs antécédents (ex: pour f(x) = x², les antécédents de 4 sont 2 et -2)'
  },
  {
    id: 'fc-21',
    chapterId: 'fonctions',
    category: 'Fonctions linéaires',
    front: 'Forme d\'une fonction linéaire',
    back: 'Une fonction linéaire est de la forme f(x) = ax.',
    math: 'f(x) = ax',
    tip: 'Sa courbe passe toujours par l\'origine O(0;0)'
  },
  {
    id: 'fc-22',
    chapterId: 'fonctions',
    category: 'Fonctions linéaires',
    front: 'Propriété de proportionnalité',
    back: 'Une fonction linéaire traduit une situation de proportionnalité. Le coefficient a est le coefficient de proportionnalité.',
    tip: 'Exemple : Prix = 2€ × nombre de kg → f(x) = 2x'
  },
  {
    id: 'fc-23',
    chapterId: 'fonctions',
    category: 'Fonctions affines',
    front: 'Forme d\'une fonction affine',
    back: 'Une fonction affine est de la forme f(x) = ax + b.',
    math: 'f(x) = ax + b',
    tip: 'a = coefficient directeur (pente), b = ordonnée à l\'origine'
  },
  {
    id: 'fc-24',
    chapterId: 'fonctions',
    category: 'Fonctions affines',
    front: 'Comment calculer le coefficient directeur a ?',
    back: 'À partir de deux points A(xₐ, yₐ) et B(x_b, y_b) :',
    math: 'a = \\frac{y_B - y_A}{x_B - x_A}',
    tip: 'C\'est "la variation de y divisée par la variation de x"'
  },
  {
    id: 'fc-25',
    chapterId: 'fonctions',
    category: 'Fonctions affines',
    front: 'Sens de variation d\'une fonction affine',
    back: 'Si a > 0, la fonction est croissante. Si a < 0, elle est décroissante.',
    tip: 'La droite "monte" si a > 0, "descend" si a < 0'
  },

  // GÉOMÉTRIE - Pythagore
  {
    id: 'fc-26',
    chapterId: 'geometrie',
    category: 'Pythagore',
    front: 'Théorème de Pythagore',
    back: 'Dans un triangle rectangle, le carré de l\'hypoténuse égale la somme des carrés des deux autres côtés.',
    math: 'BC^2 = AB^2 + AC^2',
    tip: 'L\'hypoténuse est le côté opposé à l\'angle droit (le plus grand côté)'
  },
  {
    id: 'fc-27',
    chapterId: 'geometrie',
    category: 'Pythagore',
    front: 'Réciproque de Pythagore',
    back: 'Si BC² = AB² + AC², alors le triangle est rectangle en A.',
    tip: 'Utile pour prouver qu\'un triangle est rectangle !'
  },
  {
    id: 'fc-28',
    chapterId: 'geometrie',
    category: 'Pythagore',
    front: 'Contraposée de Pythagore',
    back: 'Si BC² ≠ AB² + AC², alors le triangle n\'est pas rectangle.',
  },

  // GÉOMÉTRIE - Thalès
  {
    id: 'fc-29',
    chapterId: 'geometrie',
    category: 'Thalès',
    front: 'Théorème de Thalès',
    back: 'Si (MN)//(BC), alors les rapports des longueurs sont égaux.',
    math: '\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}',
    tip: 'Les points doivent être alignés dans le bon ordre !'
  },
  {
    id: 'fc-30',
    chapterId: 'geometrie',
    category: 'Thalès',
    front: 'Réciproque de Thalès',
    back: 'Si les rapports sont égaux ET les points alignés dans le même ordre, alors les droites sont parallèles.',
    math: '\\frac{AM}{AB} = \\frac{AN}{AC} \\Rightarrow (MN) \\parallel (BC)',
  },

  // GÉOMÉTRIE - Trigonométrie
  {
    id: 'fc-31',
    chapterId: 'geometrie',
    category: 'Trigonométrie',
    front: 'Cosinus d\'un angle',
    back: 'Le cosinus est le rapport du côté adjacent sur l\'hypoténuse.',
    math: '\\cos(\\hat{A}) = \\frac{\\text{côté adjacent}}{\\text{hypoténuse}}',
    tip: 'Moyen mnémotechnique : CAH (Cosinus = Adjacent / Hypoténuse)'
  },
  {
    id: 'fc-32',
    chapterId: 'geometrie',
    category: 'Trigonométrie',
    front: 'Sinus d\'un angle',
    back: 'Le sinus est le rapport du côté opposé sur l\'hypoténuse.',
    math: '\\sin(\\hat{A}) = \\frac{\\text{côté opposé}}{\\text{hypoténuse}}',
    tip: 'Moyen mnémotechnique : SOH (Sinus = Opposé / Hypoténuse)'
  },
  {
    id: 'fc-33',
    chapterId: 'geometrie',
    category: 'Trigonométrie',
    front: 'Tangente d\'un angle',
    back: 'La tangente est le rapport du côté opposé sur le côté adjacent.',
    math: '\\tan(\\hat{A}) = \\frac{\\text{côté opposé}}{\\text{côté adjacent}}',
    tip: 'Moyen mnémotechnique : TOA (Tangente = Opposé / Adjacent)'
  },
  {
    id: 'fc-34',
    chapterId: 'geometrie',
    category: 'Trigonométrie',
    front: 'Relation entre sin, cos et tan',
    back: 'La tangente est le quotient du sinus par le cosinus.',
    math: '\\tan(\\hat{A}) = \\frac{\\sin(\\hat{A})}{\\cos(\\hat{A})}',
  },
  {
    id: 'fc-35',
    chapterId: 'geometrie',
    category: 'Trigonométrie',
    front: 'Formule fondamentale',
    back: 'Pour tout angle A : cos²(A) + sin²(A) = 1',
    math: '\\cos^2(A) + \\sin^2(A) = 1',
  },

  // GÉOMÉTRIE - Transformations
  {
    id: 'fc-36',
    chapterId: 'geometrie',
    category: 'Transformations',
    front: 'Qu\'est-ce qu\'une translation ?',
    back: 'Un glissement dans une direction et une distance données, caractérisé par un vecteur.',
    tip: 'Conserve les distances, les angles et le parallélisme'
  },
  {
    id: 'fc-37',
    chapterId: 'geometrie',
    category: 'Transformations',
    front: 'Qu\'est-ce qu\'une rotation ?',
    back: 'Un pivotement autour d\'un point (centre) d\'un certain angle.',
    tip: 'Conserve les distances et les angles'
  },
  {
    id: 'fc-38',
    chapterId: 'geometrie',
    category: 'Transformations',
    front: 'Qu\'est-ce qu\'une homothétie ?',
    back: 'Un agrandissement ou réduction par rapport à un centre avec un rapport k.',
    tip: 'Si |k| > 1 : agrandissement. Si |k| < 1 : réduction'
  },
  {
    id: 'fc-39',
    chapterId: 'geometrie',
    category: 'Agrandissement',
    front: 'Effet d\'un agrandissement/réduction sur les longueurs',
    back: 'Les longueurs sont multipliées par k (le coefficient).',
    math: 'L\' = k \\times L',
  },
  {
    id: 'fc-40',
    chapterId: 'geometrie',
    category: 'Agrandissement',
    front: 'Effet d\'un agrandissement/réduction sur les aires',
    back: 'Les aires sont multipliées par k².',
    math: 'A\' = k^2 \\times A',
    tip: 'Si k = 2, l\'aire est multipliée par 4 !'
  },
  {
    id: 'fc-41',
    chapterId: 'geometrie',
    category: 'Agrandissement',
    front: 'Effet d\'un agrandissement/réduction sur les volumes',
    back: 'Les volumes sont multipliés par k³.',
    math: 'V\' = k^3 \\times V',
    tip: 'Si k = 2, le volume est multiplié par 8 !'
  },

  // STATISTIQUES
  {
    id: 'fc-42',
    chapterId: 'statistiques',
    category: 'Moyenne',
    front: 'Comment calculer la moyenne ?',
    back: 'Somme des valeurs divisée par le nombre de valeurs.',
    math: '\\bar{x} = \\frac{x_1 + x_2 + ... + x_n}{n}',
  },
  {
    id: 'fc-43',
    chapterId: 'statistiques',
    category: 'Moyenne',
    front: 'Moyenne pondérée',
    back: 'On multiplie chaque valeur par son coefficient, puis on divise par la somme des coefficients.',
    math: '\\bar{x} = \\frac{c_1 x_1 + c_2 x_2 + ... + c_n x_n}{c_1 + c_2 + ... + c_n}',
    tip: 'Utilisé pour les moyennes de notes avec coefficients'
  },
  {
    id: 'fc-44',
    chapterId: 'statistiques',
    category: 'Médiane',
    front: 'Définition de la médiane',
    back: 'La médiane partage la série ordonnée en deux parties égales : 50% des valeurs sont en dessous, 50% au-dessus.',
    tip: 'Moins sensible aux valeurs extrêmes que la moyenne'
  },
  {
    id: 'fc-45',
    chapterId: 'statistiques',
    category: 'Médiane',
    front: 'Comment trouver la médiane ?',
    back: 'On ordonne les valeurs. Si n est impair, c\'est la valeur du milieu. Si n est pair, c\'est la moyenne des deux valeurs centrales.',
  },
  {
    id: 'fc-46',
    chapterId: 'statistiques',
    category: 'Étendue',
    front: 'Définition de l\'étendue',
    back: 'Différence entre la plus grande et la plus petite valeur.',
    math: 'E = \\max - \\min',
    tip: 'Mesure la dispersion des données'
  },
  {
    id: 'fc-47',
    chapterId: 'statistiques',
    category: 'Quartiles',
    front: 'Définition des quartiles',
    back: 'Q1 : 25% des données en dessous. Q2 (médiane) : 50%. Q3 : 75% des données en dessous.',
    tip: 'L\'écart interquartile est Q3 - Q1'
  },

  // PROBABILITÉS
  {
    id: 'fc-48',
    chapterId: 'statistiques',
    category: 'Probabilités',
    front: 'Définition de la probabilité',
    back: 'Probabilité = nombre de cas favorables / nombre de cas possibles.',
    math: 'P(A) = \\frac{\\text{cas favorables}}{\\text{cas possibles}}',
    tip: 'Une probabilité est toujours entre 0 et 1'
  },
  {
    id: 'fc-49',
    chapterId: 'statistiques',
    category: 'Probabilités',
    front: 'Probabilité de l\'événement contraire',
    back: 'La probabilité du contraire égale 1 moins la probabilité de l\'événement.',
    math: 'P(\\bar{A}) = 1 - P(A)',
    tip: 'Utile quand il est plus simple de calculer le contraire !'
  },
  {
    id: 'fc-50',
    chapterId: 'statistiques',
    category: 'Probabilités',
    front: 'Événements incompatibles',
    back: 'Deux événements A et B sont incompatibles s\'ils ne peuvent pas se produire en même temps.',
    math: 'P(A \\cup B) = P(A) + P(B)',
    tip: 'Exemple : obtenir 1 ET obtenir 6 avec un seul dé'
  },
]
