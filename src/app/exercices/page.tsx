'use client'

import { useState } from 'react'
import { ClipboardList, Calculator, Variable, Shapes, BarChart2, ChevronRight, FileText, HelpCircle, FileQuestion } from 'lucide-react'
import Link from 'next/link'
import { exercises, problemExercises } from '@/data/exercises'
import { chapters } from '@/data/lessons'
import { cn } from '@/lib/utils'

const chapterIcons = {
  nombres: Calculator,
  fonctions: Variable,
  geometrie: Shapes,
  statistiques: BarChart2,
}

const chapterColors: Record<string, { bg: string; icon: string }> = {
  'nombres': { bg: 'bg-blue-100 dark:bg-blue-900/30', icon: 'text-blue-600 dark:text-blue-400' },
  'fonctions': { bg: 'bg-purple-100 dark:bg-purple-900/30', icon: 'text-purple-600 dark:text-purple-400' },
  'geometrie': { bg: 'bg-teal-100 dark:bg-teal-900/30', icon: 'text-teal-600 dark:text-teal-400' },
  'statistiques': { bg: 'bg-orange-100 dark:bg-orange-900/30', icon: 'text-orange-600 dark:text-orange-400' },
}

const difficultyColors = {
  'Facile': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Moyen': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Difficile': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

type Tab = 'qcm' | 'problemes'

export default function ExercicesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('qcm')

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
            <ClipboardList className="h-8 w-8 text-primary-600" />
            Exercices et QCM
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Entraîne-toi avec des exercices type Brevet et des QCM corrigés
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('qcm')}
            className={cn(
              'flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === 'qcm'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            )}
          >
            <HelpCircle className="h-4 w-4" />
            QCM ({exercises.length})
          </button>
          <button
            onClick={() => setActiveTab('problemes')}
            className={cn(
              'flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === 'problemes'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            )}
          >
            <FileText className="h-4 w-4" />
            Problèmes ({problemExercises.length})
          </button>
          <Link
            href="/annales"
            className="flex items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <FileQuestion className="h-4 w-4" />
            Annales Brevet
          </Link>
        </div>

        {activeTab === 'qcm' && (
          <div className="space-y-8">
            {chapters.map((chapter) => {
              const Icon = chapterIcons[chapter.id as keyof typeof chapterIcons]
              const chapterExercises = exercises.filter(e => e.chapterId === chapter.id)

              if (chapterExercises.length === 0) return null

              return (
                <div key={chapter.id} className="card">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', chapterColors[chapter.id]?.bg)}>
                      <Icon className={cn('h-5 w-5', chapterColors[chapter.id]?.icon)} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{chapter.name}</h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{chapterExercises.length} QCM</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {chapterExercises.map((exercise) => (
                      <Link
                        key={exercise.id}
                        href={`/exercices/${exercise.id}`}
                        className="group rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-primary-300 hover:bg-primary-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-slate-900 group-hover:text-primary-700 dark:text-slate-100 dark:group-hover:text-primary-300">
                              {exercise.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              {exercise.description}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', difficultyColors[exercise.difficulty])}>
                                {exercise.difficulty}
                              </span>
                              <span className="text-xs text-slate-400 dark:text-slate-500">
                                {exercise.questions.length} questions
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-500" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'problemes' && (
          <div className="space-y-8">
            {chapters.map((chapter) => {
              const Icon = chapterIcons[chapter.id as keyof typeof chapterIcons]
              const chapterProblems = problemExercises.filter(e => e.chapterId === chapter.id)

              if (chapterProblems.length === 0) return null

              return (
                <div key={chapter.id} className="card">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', chapterColors[chapter.id]?.bg)}>
                      <Icon className={cn('h-5 w-5', chapterColors[chapter.id]?.icon)} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{chapter.name}</h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{chapterProblems.length} problèmes</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {chapterProblems.map((problem) => (
                      <Link
                        key={problem.id}
                        href={`/exercices/probleme/${problem.id}`}
                        className="group rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-primary-300 hover:bg-primary-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-slate-900 group-hover:text-primary-700 dark:text-slate-100 dark:group-hover:text-primary-300">
                              {problem.title}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                              {problem.context}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', difficultyColors[problem.difficulty])}>
                                {problem.difficulty}
                              </span>
                              <span className="text-xs text-slate-400 dark:text-slate-500">
                                {problem.steps.length} questions • {problem.totalPoints} pts
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-500" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
