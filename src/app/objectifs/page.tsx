'use client'

import { useState } from 'react'
import { Target, Calendar, CheckCircle, ArrowRight, Trophy, BookOpen, Brain, FileText } from 'lucide-react'
import Link from 'next/link'
import { useGamificationStore, OBJECTIVE_REQUIREMENTS } from '@/stores/gamificationStore'
import { cn } from '@/lib/utils'

const GRADE_OPTIONS = [10, 12, 14, 16, 18, 20] as const

const GRADE_COLORS: Record<number, string> = {
  10: 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
  12: 'border-green-400 bg-green-50 dark:bg-green-900/20',
  14: 'border-blue-400 bg-blue-50 dark:bg-blue-900/20',
  16: 'border-purple-400 bg-purple-50 dark:bg-purple-900/20',
  18: 'border-pink-400 bg-pink-50 dark:bg-pink-900/20',
  20: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
}

const GRADE_EMOJIS: Record<number, string> = {
  10: '📗',
  12: '📘',
  14: '📙',
  16: '⭐',
  18: '🌟',
  20: '🏆',
}

export default function ObjectifsPage() {
  const objective = useGamificationStore((state) => state.objective)
  const setObjective = useGamificationStore((state) => state.setObjective)
  const getObjectiveProgress = useGamificationStore((state) => state.getObjectiveProgress)
  const totalExercisesCompleted = useGamificationStore((state) => state.totalExercisesCompleted)
  const examSimulationsCompleted = useGamificationStore((state) => state.examSimulationsCompleted)

  const [selectedGrade, setSelectedGrade] = useState<typeof GRADE_OPTIONS[number] | null>(
    objective?.targetGrade || null
  )
  const [brevetDate, setBrevetDate] = useState(objective?.brevetDate || '')
  const [step, setStep] = useState<'select' | 'date' | 'done'>(
    objective ? 'done' : 'select'
  )

  const progress = getObjectiveProgress()

  const handleConfirm = () => {
    if (!selectedGrade) return

    if (step === 'select') {
      setStep('date')
    } else if (step === 'date') {
      setObjective(selectedGrade, brevetDate || undefined)
      setStep('done')
    }
  }

  const handleReset = () => {
    setSelectedGrade(null)
    setBrevetDate('')
    setStep('select')
  }

  // Affichage de l'objectif déjà défini
  if (step === 'done' && objective) {
    const requirements = OBJECTIVE_REQUIREMENTS[objective.targetGrade]
    const daysUntilBrevet = objective.brevetDate
      ? Math.ceil((new Date(objective.brevetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      : null

    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="flex items-center justify-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
              <Target className="h-8 w-8 text-primary-600" />
              Mon Objectif
            </h1>
          </div>

          {/* Objectif actuel */}
          <div className={cn(
            'card border-2 mb-6 text-center',
            GRADE_COLORS[objective.targetGrade]
          )}>
            <div className="text-5xl mb-3">{GRADE_EMOJIS[objective.targetGrade]}</div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {objective.targetGrade}/20
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {requirements?.description}
            </p>
            {daysUntilBrevet !== null && daysUntilBrevet > 0 && (
              <p className="mt-3 text-lg font-medium text-primary-600 dark:text-primary-400">
                Brevet dans {daysUntilBrevet} jour{daysUntilBrevet > 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Progression */}
          {progress && (
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Ma Progression
              </h3>

              <div className="space-y-4">
                {/* Progression globale */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Progression globale</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{progress.overallProgress}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${progress.overallProgress}%` }}
                    />
                  </div>
                </div>

                {/* Exercices */}
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-700 dark:text-slate-300">Exercices</span>
                        <span className="text-blue-600 dark:text-blue-400">
                          {totalExercisesCompleted}/{requirements?.exercisesCompleted}
                        </span>
                      </div>
                      <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${progress.exercisesProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flashcards */}
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-purple-500" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-700 dark:text-slate-300">Flashcards</span>
                        <span className="text-purple-600 dark:text-purple-400">
                          0/{requirements?.flashcardsReviewed}
                        </span>
                      </div>
                      <div className="h-2 bg-purple-200 dark:bg-purple-800 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${progress.flashcardsProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Examens blancs */}
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-700 dark:text-slate-300">Examens blancs</span>
                        <span className="text-green-600 dark:text-green-400">
                          {examSimulationsCompleted}/{requirements?.examSimulations}
                        </span>
                      </div>
                      <div className="h-2 bg-green-200 dark:bg-green-800 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${progress.examsProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {objective.brevetDate && (
              <Link
                href="/calendrier"
                className="flex-1 py-3 px-4 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Voir mon planning
              </Link>
            )}
            <button
              onClick={handleReset}
              className="py-3 px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Sélection de l'objectif
  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="flex items-center justify-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
            <Target className="h-8 w-8 text-primary-600" />
            Mon Objectif au Brevet
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {step === 'select'
              ? 'Quelle note vises-tu ?'
              : 'Quand est ton brevet ?'}
          </p>
        </div>

        {step === 'select' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {GRADE_OPTIONS.map((grade) => {
                const requirements = OBJECTIVE_REQUIREMENTS[grade]
                const isSelected = selectedGrade === grade

                return (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all text-center',
                      isSelected
                        ? cn('border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800', GRADE_COLORS[grade])
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                    )}
                  >
                    <div className="text-3xl mb-2">{GRADE_EMOJIS[grade]}</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {grade}/20
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {requirements?.description}
                    </div>
                  </button>
                )
              })}
            </div>

            {selectedGrade && (
              <div className="card mb-6">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Pour atteindre {selectedGrade}/20 :
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Compléter {OBJECTIVE_REQUIREMENTS[selectedGrade]?.exercisesCompleted} exercices
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Réviser {OBJECTIVE_REQUIREMENTS[selectedGrade]?.flashcardsReviewed} flashcards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Faire {OBJECTIVE_REQUIREMENTS[selectedGrade]?.examSimulations} examen{OBJECTIVE_REQUIREMENTS[selectedGrade]?.examSimulations > 1 ? 's' : ''} blanc{OBJECTIVE_REQUIREMENTS[selectedGrade]?.examSimulations > 1 ? 's' : ''}
                  </li>
                </ul>
              </div>
            )}
          </>
        )}

        {step === 'date' && (
          <div className="card mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-6 w-6 text-primary-500" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Date du Brevet
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Indique la date de ton brevet pour générer un planning de révision personnalisé.
            </p>
            <input
              type="date"
              value={brevetDate}
              onChange={(e) => setBrevetDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Tu peux aussi passer cette étape et ajouter la date plus tard.
            </p>
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={step === 'select' && !selectedGrade}
          className="w-full py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {step === 'select' ? 'Continuer' : 'Définir mon objectif'}
          <ArrowRight className="h-5 w-5" />
        </button>

        {step === 'date' && (
          <button
            onClick={() => setStep('select')}
            className="w-full mt-3 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          >
            Retour
          </button>
        )}
      </div>
    </div>
  )
}
