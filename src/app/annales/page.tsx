'use client'

import { useState } from 'react'
import { FileQuestion, Calendar, ChevronDown, ChevronUp, CheckCircle, BookOpen, Award } from 'lucide-react'
import Link from 'next/link'
import { annales } from '@/data/exercises'
import { cn } from '@/lib/utils'

export default function AnnalesPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null)
  const [showCorrection, setShowCorrection] = useState<Record<string, boolean>>({})

  const years = Array.from(new Set(annales.map(a => a.year))).sort((a, b) => b - a)

  const toggleExercise = (id: string) => {
    setExpandedExercise(expandedExercise === id ? null : id)
  }

  const toggleCorrection = (id: string) => {
    setShowCorrection(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/exercices"
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            ← Retour aux exercices
          </Link>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
            <FileQuestion className="h-8 w-8 text-primary-600" />
            Annales du Brevet
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Entraîne-toi sur les sujets des années précédentes
          </p>
        </div>

        {/* Year selector */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedYear(null)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              selectedYear === null
                ? 'bg-primary-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
            )}
          >
            Toutes les années
          </button>
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                selectedYear === year
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              )}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Annales list */}
        <div className="space-y-6">
          {annales
            .filter(a => selectedYear === null || a.year === selectedYear)
            .map(annale => (
              <div key={annale.id} className="card">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <Calendar className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      Brevet {annale.year}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {annale.session} • {annale.exercises.length} exercices
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {annale.exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="rounded-lg border border-slate-200 dark:border-slate-700"
                    >
                      <button
                        onClick={() => toggleExercise(exercise.id)}
                        className="flex w-full items-center justify-between p-4 text-left"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-slate-900 dark:text-slate-100">
                              {exercise.title}
                            </h3>
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                              {exercise.points} points
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {exercise.theme}
                          </p>
                        </div>
                        {expandedExercise === exercise.id ? (
                          <ChevronUp className="h-5 w-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-400" />
                        )}
                      </button>

                      {expandedExercise === exercise.id && (
                        <div className="border-t border-slate-200 p-4 dark:border-slate-700">
                          {/* Statement */}
                          <div className="mb-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                            <h4 className="mb-2 flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                              <BookOpen className="h-4 w-4" />
                              Énoncé
                            </h4>
                            <p className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">
                              {exercise.statement}
                            </p>
                          </div>

                          {/* Questions */}
                          <div className="mb-4 space-y-3">
                            {exercise.questions.map((q, i) => (
                              <div key={i} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                                <p className="font-medium text-slate-800 dark:text-slate-200">
                                  {i + 1}. {q.question}
                                </p>
                                {q.subQuestions && (
                                  <ul className="mt-2 space-y-1 pl-4">
                                    {q.subQuestions.map((sub, j) => (
                                      <li key={j} className="text-sm text-slate-600 dark:text-slate-400">
                                        {sub}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Correction toggle */}
                          <button
                            onClick={() => toggleCorrection(exercise.id)}
                            className={cn(
                              'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                              showCorrection[exercise.id]
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50'
                            )}
                          >
                            {showCorrection[exercise.id] ? (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                Masquer la correction
                              </>
                            ) : (
                              <>
                                <Award className="h-4 w-4" />
                                Voir la correction
                              </>
                            )}
                          </button>

                          {/* Correction */}
                          {showCorrection[exercise.id] && (
                            <div className="mt-4 rounded-lg border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                              <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-800 dark:text-green-300">
                                <CheckCircle className="h-4 w-4" />
                                Correction
                              </h4>
                              <p className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">
                                {exercise.correction}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Tips */}
        <div className="mt-8 rounded-xl border-2 border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
          <h3 className="mb-3 font-semibold text-amber-800 dark:text-amber-300">
            Conseils pour réussir le Brevet
          </h3>
          <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-400">
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>Lis attentivement tout l'énoncé avant de commencer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>Gère ton temps : environ 2h pour 6-7 exercices</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>Justifie toujours tes réponses avec des calculs ou des théorèmes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>Vérifie tes calculs et relis tes réponses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>N'oublie pas d'encadrer ou souligner tes résultats</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
