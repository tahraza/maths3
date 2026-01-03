'use client'

import Link from 'next/link'
import {
  Calculator,
  Shapes,
  BarChart2,
  Variable,
  BookOpen,
  ClipboardList,
  Brain,
  ArrowRight,
  Trophy,
  Target,
  Flame
} from 'lucide-react'

const chapters = [
  {
    id: 'nombres',
    name: 'Nombres et Calculs',
    description: 'Fractions, puissances, racines carrées, calcul littéral',
    icon: Calculator,
    color: 'primary',
    lessonsCount: 6,
  },
  {
    id: 'fonctions',
    name: 'Fonctions',
    description: 'Fonctions linéaires, affines, représentations graphiques',
    icon: Variable,
    color: 'teal',
    lessonsCount: 4,
  },
  {
    id: 'geometrie',
    name: 'Géométrie',
    description: 'Pythagore, Thalès, trigonométrie, transformations',
    icon: Shapes,
    color: 'purple',
    lessonsCount: 6,
  },
  {
    id: 'statistiques',
    name: 'Statistiques et Probabilités',
    description: 'Moyennes, médianes, étendues, probabilités',
    icon: BarChart2,
    color: 'amber',
    lessonsCount: 4,
  },
]

const features = [
  {
    name: 'Leçons complètes',
    description: 'Des cours détaillés avec des exemples concrets du quotidien',
    icon: BookOpen,
  },
  {
    name: 'Exercices corrigés',
    description: 'Des QCM et exercices type Brevet avec explications',
    icon: ClipboardList,
  },
  {
    name: 'Flashcards',
    description: 'Mémorise les formules et théorèmes essentiels',
    icon: Brain,
  },
  {
    name: 'Suivi progression',
    description: 'Gagne des points et des badges en révisant',
    icon: Trophy,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-indigo-600 to-purple-700 py-20 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Réussis ton Brevet
              <span className="block text-primary-200">de Mathématiques</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-primary-100">
              Révise efficacement avec des leçons claires, des exercices type Brevet
              et des exemples concrets tirés de la vie quotidienne.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/lecons"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-semibold text-primary-700 shadow-lg transition hover:bg-primary-50"
              >
                Commencer à réviser
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/exercices"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <Target className="h-5 w-5" />
                S'entraîner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Chapitres */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Les 4 grands domaines du programme
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Tout ce qu'il faut maîtriser pour le Brevet des Collèges
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {chapters.map((chapter) => {
              const Icon = chapter.icon
              return (
                <Link
                  key={chapter.id}
                  href={`/lecons?chapitre=${chapter.id}`}
                  className="group card hover:border-primary-300 hover:shadow-lg dark:hover:border-primary-700"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-${chapter.color}-100 dark:bg-${chapter.color}-900/30`}>
                    <Icon className={`h-6 w-6 text-${chapter.color}-600 dark:text-${chapter.color}-400`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {chapter.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {chapter.description}
                  </p>
                  <p className="mt-3 text-xs font-medium text-primary-600 dark:text-primary-400">
                    {chapter.lessonsCount} leçons →
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="bg-slate-100 py-16 dark:bg-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Une application pensée pour toi
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Des outils modernes pour réviser efficacement
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.name} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
                    <Icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 p-8 shadow-xl sm:p-12">
            <Flame className="mx-auto h-12 w-12 text-white/80" />
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Prêt à devenir un pro des maths ?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Commence dès maintenant et progresse chaque jour vers la réussite au Brevet !
            </p>
            <Link
              href="/lecons"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-semibold text-primary-700 shadow-lg transition hover:bg-primary-50"
            >
              C'est parti !
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
