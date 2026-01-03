/**
 * Annales du Brevet de Mathématiques
 * Chaque annale contient plusieurs exercices avec questions
 */

export interface AnnaleQuestion {
  id: string
  text: string
  math?: string
  points: number
  subQuestions?: Array<{
    id: string
    text: string
    math?: string
    points: number
  }>
  image?: string
}

export interface AnnaleExercise {
  id: string
  title: string
  context?: string
  totalPoints: number
  questions: AnnaleQuestion[]
}

export interface Annale {
  id: string
  year: number
  session: string // "Métropole", "Polynésie", etc.
  date: string
  totalPoints: number
  duration: number // en minutes
  exercises: AnnaleExercise[]
}

export const annales: Annale[] = [
  {
    id: 'metropole-2024',
    year: 2024,
    session: 'Métropole',
    date: '2024-06-27',
    totalPoints: 100,
    duration: 120,
    exercises: [
      {
        id: 'ex1-2024',
        title: 'Exercice 1 - QCM',
        context: "Pour chaque question, entourer la bonne réponse. Aucune justification n'est demandée.",
        totalPoints: 16,
        questions: [
          {
            id: 'q1-1',
            text: "Le nombre 72 peut s'écrire sous la forme a² × b où a et b sont des entiers. Quelles sont les valeurs de a et b ?",
            points: 4,
            subQuestions: [
              { id: 'q1-1a', text: 'a = 6 et b = 2', points: 0 },
              { id: 'q1-1b', text: 'a = 4 et b = 4,5', points: 0 },
              { id: 'q1-1c', text: 'a = 3 et b = 8', points: 0 },
            ]
          },
          {
            id: 'q1-2',
            text: 'Le prix d\'un article augmente de 20%, puis baisse de 20%. Le prix final est :',
            points: 4,
            subQuestions: [
              { id: 'q1-2a', text: 'Égal au prix initial', points: 0 },
              { id: 'q1-2b', text: 'Inférieur au prix initial', points: 0 },
              { id: 'q1-2c', text: 'Supérieur au prix initial', points: 0 },
            ]
          },
          {
            id: 'q1-3',
            text: 'On considère la fonction f définie par f(x) = 2x - 5. L\'image de 3 par la fonction f est :',
            points: 4,
            subQuestions: [
              { id: 'q1-3a', text: '1', points: 0 },
              { id: 'q1-3b', text: '4', points: 0 },
              { id: 'q1-3c', text: '-1', points: 0 },
            ]
          },
          {
            id: 'q1-4',
            text: 'Dans un triangle rectangle, si un angle aigu mesure 35°, l\'autre angle aigu mesure :',
            points: 4,
            subQuestions: [
              { id: 'q1-4a', text: '55°', points: 0 },
              { id: 'q1-4b', text: '145°', points: 0 },
              { id: 'q1-4c', text: '65°', points: 0 },
            ]
          }
        ]
      },
      {
        id: 'ex2-2024',
        title: 'Exercice 2 - Géométrie',
        context: 'On considère la figure ci-dessous où ABCD est un rectangle tel que AB = 8 cm et BC = 6 cm.',
        totalPoints: 20,
        questions: [
          {
            id: 'q2-1',
            text: 'Calculer la longueur AC.',
            points: 6
          },
          {
            id: 'q2-2',
            text: 'On place le point M sur le segment [AB] tel que AM = 3 cm. On place le point N sur le segment [BC] tel que BN = 4 cm. Les droites (MN) et (AC) sont-elles parallèles ? Justifier.',
            points: 8
          },
          {
            id: 'q2-3',
            text: 'Calculer l\'aire du triangle AMN.',
            points: 6
          }
        ]
      },
      {
        id: 'ex3-2024',
        title: 'Exercice 3 - Fonctions',
        context: 'Un artisan fabrique des objets en bois. Pour x objets fabriqués (avec x compris entre 0 et 50), le coût de fabrication, en euros, est donné par C(x) = 2x² + 10x + 100.',
        totalPoints: 22,
        questions: [
          {
            id: 'q3-1',
            text: 'Calculer le coût de fabrication de 10 objets.',
            points: 4
          },
          {
            id: 'q3-2',
            text: 'Chaque objet est vendu 50 €. Exprimer la recette R(x) en fonction du nombre x d\'objets vendus.',
            points: 4
          },
          {
            id: 'q3-3',
            text: 'Le bénéfice B(x) est la différence entre la recette et le coût. Montrer que B(x) = -2x² + 40x - 100.',
            points: 6
          },
          {
            id: 'q3-4',
            text: 'Représenter graphiquement la fonction B sur l\'intervalle [0 ; 25].',
            points: 4
          },
          {
            id: 'q3-5',
            text: 'À partir du graphique, déterminer pour quelles valeurs de x le bénéfice est positif.',
            points: 4
          }
        ]
      },
      {
        id: 'ex4-2024',
        title: 'Exercice 4 - Probabilités et statistiques',
        context: 'Une enquête a été menée auprès de 200 élèves de 3ème sur le temps passé devant les écrans chaque jour.',
        totalPoints: 20,
        questions: [
          {
            id: 'q4-1',
            text: 'Compléter le tableau des effectifs cumulés croissants.',
            points: 4
          },
          {
            id: 'q4-2',
            text: 'Calculer la moyenne du temps passé devant les écrans.',
            points: 6
          },
          {
            id: 'q4-3',
            text: 'Déterminer la médiane de cette série.',
            points: 5
          },
          {
            id: 'q4-4',
            text: 'On choisit un élève au hasard. Quelle est la probabilité qu\'il passe plus de 3 heures par jour devant les écrans ?',
            points: 5
          }
        ]
      },
      {
        id: 'ex5-2024',
        title: 'Exercice 5 - Problème',
        context: 'Une piscine municipale a la forme d\'un parallélépipède rectangle de dimensions 25 m × 12 m × 2 m.',
        totalPoints: 22,
        questions: [
          {
            id: 'q5-1',
            text: 'Calculer le volume de la piscine en m³.',
            points: 4
          },
          {
            id: 'q5-2',
            text: 'Convertir ce volume en litres.',
            points: 3
          },
          {
            id: 'q5-3',
            text: 'La piscine est remplie à 90% de sa capacité. Calculer le volume d\'eau.',
            points: 5
          },
          {
            id: 'q5-4',
            text: 'On veut peindre les parois intérieures de la piscine (fond et 4 côtés). Calculer la surface à peindre.',
            points: 6
          },
          {
            id: 'q5-5',
            text: 'Un pot de peinture permet de couvrir 15 m². Combien de pots faut-il acheter ?',
            points: 4
          }
        ]
      }
    ]
  },
  {
    id: 'metropole-2023',
    year: 2023,
    session: 'Métropole',
    date: '2023-06-26',
    totalPoints: 100,
    duration: 120,
    exercises: [
      {
        id: 'ex1-2023',
        title: 'Exercice 1 - Calcul numérique',
        totalPoints: 18,
        questions: [
          {
            id: 'q1-2023-1',
            text: 'Calculer et donner le résultat sous forme d\'une fraction irréductible : A = 3/4 - 2/5 + 1/2',
            math: 'A = \\frac{3}{4} - \\frac{2}{5} + \\frac{1}{2}',
            points: 6
          },
          {
            id: 'q1-2023-2',
            text: 'Développer et réduire : B = (2x - 3)(x + 5)',
            math: 'B = (2x - 3)(x + 5)',
            points: 6
          },
          {
            id: 'q1-2023-3',
            text: 'Factoriser : C = 9x² - 16',
            math: 'C = 9x^2 - 16',
            points: 6
          }
        ]
      },
      {
        id: 'ex2-2023',
        title: 'Exercice 2 - Théorème de Pythagore et trigonométrie',
        context: 'Dans un triangle ABC rectangle en A, on donne AB = 5 cm et AC = 12 cm.',
        totalPoints: 22,
        questions: [
          {
            id: 'q2-2023-1',
            text: 'Calculer la longueur BC.',
            points: 6
          },
          {
            id: 'q2-2023-2',
            text: 'Calculer la mesure de l\'angle ABC, arrondie au degré près.',
            points: 8
          },
          {
            id: 'q2-2023-3',
            text: 'Calculer l\'aire du triangle ABC.',
            points: 4
          },
          {
            id: 'q2-2023-4',
            text: 'Le point M est le milieu de [BC]. Calculer la longueur AM.',
            points: 4
          }
        ]
      },
      {
        id: 'ex3-2023',
        title: 'Exercice 3 - Programmation',
        context: 'On considère le programme Scratch ci-dessous qui permet de tracer une figure.',
        totalPoints: 18,
        questions: [
          {
            id: 'q3-2023-1',
            text: 'Quelle figure obtient-on en exécutant ce programme ?',
            points: 6
          },
          {
            id: 'q3-2023-2',
            text: 'Modifier le programme pour tracer un hexagone régulier.',
            points: 6
          },
          {
            id: 'q3-2023-3',
            text: 'Écrire un programme qui trace un triangle équilatéral de côté 100.',
            points: 6
          }
        ]
      },
      {
        id: 'ex4-2023',
        title: 'Exercice 4 - Statistiques',
        context: 'Le tableau suivant donne la répartition des notes obtenues par une classe à un contrôle de mathématiques.',
        totalPoints: 20,
        questions: [
          {
            id: 'q4-2023-1',
            text: 'Calculer l\'effectif total de la classe.',
            points: 3
          },
          {
            id: 'q4-2023-2',
            text: 'Calculer la note moyenne de la classe.',
            points: 6
          },
          {
            id: 'q4-2023-3',
            text: 'Déterminer la médiane des notes.',
            points: 5
          },
          {
            id: 'q4-2023-4',
            text: 'Quel pourcentage d\'élèves a obtenu une note supérieure ou égale à 12 ?',
            points: 6
          }
        ]
      },
      {
        id: 'ex5-2023',
        title: 'Exercice 5 - Problème de proportionnalité',
        context: 'Une recette de gâteau pour 6 personnes nécessite : 250 g de farine, 200 g de sucre, 3 œufs, 150 g de beurre.',
        totalPoints: 22,
        questions: [
          {
            id: 'q5-2023-1',
            text: 'Calculer les quantités nécessaires pour 9 personnes.',
            points: 8
          },
          {
            id: 'q5-2023-2',
            text: 'On dispose de 400 g de farine. Pour combien de personnes peut-on faire le gâteau ?',
            points: 6
          },
          {
            id: 'q5-2023-3',
            text: 'Le prix du beurre est de 8€ le kg. Calculer le coût du beurre pour 6 personnes.',
            points: 4
          },
          {
            id: 'q5-2023-4',
            text: 'Le prix total des ingrédients pour 6 personnes est de 5,50€. Quel est le prix par personne ?',
            points: 4
          }
        ]
      }
    ]
  },
  {
    id: 'polynesie-2024',
    year: 2024,
    session: 'Polynésie',
    date: '2024-06-17',
    totalPoints: 100,
    duration: 120,
    exercises: [
      {
        id: 'ex1-poly-2024',
        title: 'Exercice 1 - Calculs et fractions',
        totalPoints: 20,
        questions: [
          {
            id: 'q1-poly-1',
            text: 'Calculer A = 3/5 × 10/9 et donner le résultat sous forme de fraction irréductible.',
            math: 'A = \\frac{3}{5} \\times \\frac{10}{9}',
            points: 5
          },
          {
            id: 'q1-poly-2',
            text: 'Calculer B = 7/12 - 3/8.',
            math: 'B = \\frac{7}{12} - \\frac{3}{8}',
            points: 5
          },
          {
            id: 'q1-poly-3',
            text: 'Développer et réduire C = (3x + 2)² - 9.',
            math: 'C = (3x + 2)^2 - 9',
            points: 5
          },
          {
            id: 'q1-poly-4',
            text: 'Résoudre l\'équation : 5x - 3 = 2x + 9',
            math: '5x - 3 = 2x + 9',
            points: 5
          }
        ]
      },
      {
        id: 'ex2-poly-2024',
        title: 'Exercice 2 - Géométrie dans l\'espace',
        context: 'Un cône de révolution a pour base un disque de rayon 3 cm et pour hauteur 4 cm.',
        totalPoints: 20,
        questions: [
          {
            id: 'q2-poly-1',
            text: 'Calculer le volume du cône.',
            points: 6
          },
          {
            id: 'q2-poly-2',
            text: 'Calculer la longueur de la génératrice du cône.',
            points: 6
          },
          {
            id: 'q2-poly-3',
            text: 'Calculer l\'aire latérale du cône.',
            points: 8
          }
        ]
      },
      {
        id: 'ex3-poly-2024',
        title: 'Exercice 3 - Fonctions affines',
        context: 'On considère les fonctions f et g définies par f(x) = 2x - 1 et g(x) = -x + 5.',
        totalPoints: 20,
        questions: [
          {
            id: 'q3-poly-1',
            text: 'Calculer f(3) et g(-2).',
            points: 4
          },
          {
            id: 'q3-poly-2',
            text: 'Tracer les représentations graphiques de f et g dans un repère.',
            points: 6
          },
          {
            id: 'q3-poly-3',
            text: 'Déterminer graphiquement puis par le calcul les coordonnées du point d\'intersection des deux droites.',
            points: 6
          },
          {
            id: 'q3-poly-4',
            text: 'Pour quelle valeur de x a-t-on f(x) > g(x) ?',
            points: 4
          }
        ]
      },
      {
        id: 'ex4-poly-2024',
        title: 'Exercice 4 - Probabilités',
        context: 'Un sac contient 3 boules rouges, 5 boules bleues et 2 boules vertes. On tire une boule au hasard.',
        totalPoints: 20,
        questions: [
          {
            id: 'q4-poly-1',
            text: 'Quelle est la probabilité de tirer une boule rouge ?',
            points: 4
          },
          {
            id: 'q4-poly-2',
            text: 'Quelle est la probabilité de tirer une boule qui n\'est pas verte ?',
            points: 4
          },
          {
            id: 'q4-poly-3',
            text: 'On tire deux boules successivement avec remise. Quelle est la probabilité de tirer deux boules bleues ?',
            points: 6
          },
          {
            id: 'q4-poly-4',
            text: 'On ajoute des boules rouges dans le sac. Combien faut-il en ajouter pour que la probabilité de tirer une boule rouge soit égale à 1/2 ?',
            points: 6
          }
        ]
      },
      {
        id: 'ex5-poly-2024',
        title: 'Exercice 5 - Théorème de Thalès',
        context: 'Dans la figure ci-dessous, les droites (DE) et (BC) sont parallèles.',
        totalPoints: 20,
        questions: [
          {
            id: 'q5-poly-1',
            text: 'Montrer que AD = 4 cm.',
            points: 8
          },
          {
            id: 'q5-poly-2',
            text: 'Calculer la longueur DE.',
            points: 6
          },
          {
            id: 'q5-poly-3',
            text: 'Les triangles ADE et ABC sont-ils semblables ? Justifier.',
            points: 6
          }
        ]
      }
    ]
  }
]

export function getAnnaleById(id: string): Annale | undefined {
  return annales.find(a => a.id === id)
}

export function getAnnalesByYear(year: number): Annale[] {
  return annales.filter(a => a.year === year)
}

export function getAllYears(): number[] {
  const years = Array.from(new Set(annales.map(a => a.year)))
  return years.sort((a, b) => b - a)
}
