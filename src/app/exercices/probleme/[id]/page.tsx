'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowLeft, ChevronRight, ChevronDown, Eye, EyeOff, Lightbulb, CheckCircle, Award } from 'lucide-react'
import Link from 'next/link'
import { problemExercises } from '@/data/exercises'
import { chapters } from '@/data/lessons'
import { cn } from '@/lib/utils'
import { useGamificationStore, POINTS } from '@/stores/gamificationStore'

const difficultyColors = {
  'Facile': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Moyen': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Difficile': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const chapterColors: Record<string, string> = {
  'nombres': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'fonctions': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'geometrie': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  'statistiques': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
}

export default function ProblemPage() {
  const params = useParams()
  const problemId = params.id as string
  const problem = problemExercises.find(p => p.id === problemId)

  const [currentStep, setCurrentStep] = useState(0)
  const [showAnswer, setShowAnswer] = useState<boolean[]>([])
  const [hintsUsed, setHintsUsed] = useState<number[][]>([])
  const [mounted, setMounted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const store = useGamificationStore()

  useEffect(() => {
    setMounted(true)
    if (problem) {
      setShowAnswer(new Array(problem.steps.length).fill(false))
      setHintsUsed(problem.steps.map(() => []))
    }
  }, [problem])

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">Problème non trouvé</p>
          <Link href="/exercices" className="mt-4 block text-center text-primary-600 hover:underline">
            Retour aux exercices
          </Link>
        </div>
      </div>
    )
  }

  const chapter = chapters.find(c => c.id === problem.chapterId)
  const step = problem.steps[currentStep]

  const calculateXP = () => {
    let totalXP = POINTS.EXERCISE_COMPLETED
    let penalty = 0

    hintsUsed.forEach((stepHints, stepIndex) => {
      const stepPenalty = stepHints.reduce((sum, hintIndex) => {
        const hint = problem.steps[stepIndex].hints?.[hintIndex]
        return sum + (hint?.xpPenalty || 0)
      }, 0)
      penalty += stepPenalty
    })

    return Math.max(totalXP - penalty, 10) // Minimum 10 XP
  }

  const handleUseHint = (hintIndex: number) => {
    const newHintsUsed = [...hintsUsed]
    if (!newHintsUsed[currentStep].includes(hintIndex)) {
      newHintsUsed[currentStep] = [...newHintsUsed[currentStep], hintIndex]
      setHintsUsed(newHintsUsed)
    }
  }

  const handleShowAnswer = () => {
    const newShowAnswer = [...showAnswer]
    newShowAnswer[currentStep] = true
    setShowAnswer(newShowAnswer)
  }

  const handleNext = () => {
    if (!problem) return

    if (currentStep < problem.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      try {
        const xp = calculateXP()
        if (mounted && store) {
          store.addPoints(xp, `Problème terminé : ${problem.title}`)
          store.incrementStat('exercises')
          store.recordActivity('exercise', problemId)
        }
        setIsComplete(true)
      } catch (error) {
        console.error('Error completing problem:', error)
        setIsComplete(true)
      }
    }
  }

  const totalPenalty = hintsUsed.reduce((total, stepHints, stepIndex) => {
    return total + stepHints.reduce((sum, hintIndex) => {
      const hint = problem.steps[stepIndex].hints?.[hintIndex]
      return sum + (hint?.xpPenalty || 0)
    }, 0)
  }, 0)

  if (isComplete) {
    const xpEarned = calculateXP()
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-2xl px-4">
          <div className="card text-center">
            <div className="mb-6 text-6xl">
              <Award className="mx-auto h-16 w-16 text-primary-500" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Problème terminé !
            </h1>
            <p className="mb-6 text-lg text-slate-600 dark:text-slate-400">
              {problem.title}
            </p>

            <div className="mb-8 rounded-xl bg-primary-100 p-6 dark:bg-primary-900/30">
              <div className="text-3xl font-bold text-primary-700 dark:text-primary-300">
                +{xpEarned} XP
              </div>
              {totalPenalty > 0 && (
                <div className="mt-2 text-sm text-primary-600 dark:text-primary-400">
                  ({POINTS.EXERCISE_COMPLETED} XP - {totalPenalty} XP d'indices utilisés)
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/exercices"
                className="btn-primary flex items-center justify-center gap-2"
              >
                Autres exercices
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/exercices"
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux exercices
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className={cn('rounded-full px-2 py-0.5', chapterColors[chapter?.id || 'nombres'])}>
              {chapter?.name}
            </span>
            <span className={cn('rounded-full px-2 py-0.5', difficultyColors[problem.difficulty])}>
              {problem.difficulty}
            </span>
            <span className="text-slate-400 dark:text-slate-500">
              {problem.totalPoints} points
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {problem.title}
          </h1>
        </div>

        {/* Contexte */}
        <div className="card mb-6 border-2 border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20">
          <h2 className="mb-3 font-semibold text-primary-800 dark:text-primary-300">Énoncé</h2>
          <p className="whitespace-pre-line text-slate-700 dark:text-slate-300">
            {problem.context}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Question {currentStep + 1} sur {problem.steps.length}</span>
            <span>{step.points} points</span>
          </div>
          <div className="mt-2 flex gap-1">
            {problem.steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-2 flex-1 rounded-full',
                  i < currentStep
                    ? 'bg-green-500'
                    : i === currentStep
                      ? 'bg-primary-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                )}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="card mb-6">
          <h3 className="mb-4 text-lg font-medium text-slate-900 dark:text-slate-100">
            {step.question}
          </h3>

          {/* Hints */}
          {step.hints && step.hints.length > 0 && (
            <div className="mb-4 space-y-2">
              {step.hints.map((hint, hintIndex) => (
                <div key={hintIndex}>
                  {hintsUsed[currentStep]?.includes(hintIndex) ? (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <div>
                          <p className="text-sm text-amber-800 dark:text-amber-300">{hint.text}</p>
                          <p className="mt-1 text-xs text-amber-600 dark:text-amber-500">
                            (-{hint.xpPenalty} XP)
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUseHint(hintIndex)}
                      className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700 transition-colors hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/40"
                    >
                      <Lightbulb className="h-4 w-4" />
                      Indice {hintIndex + 1} (-{hint.xpPenalty} XP)
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Show/Hide Answer */}
          {!showAnswer[currentStep] ? (
            <button
              onClick={handleShowAnswer}
              className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700 transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40"
            >
              <Eye className="h-4 w-4" />
              Voir la correction
            </button>
          ) : (
            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
              <div className="mb-2 flex items-center gap-2 font-semibold text-green-800 dark:text-green-300">
                <CheckCircle className="h-5 w-5" />
                Correction
              </div>
              <p className="text-slate-700 dark:text-slate-300">{step.answer}</p>
            </div>
          )}
        </div>

        {/* XP Info */}
        {totalPenalty > 0 && (
          <div className="mb-6 rounded-lg bg-slate-100 p-3 text-center text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            Indices utilisés : -{totalPenalty} XP
          </div>
        )}

        {/* Navigation */}
        {showAnswer[currentStep] && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="btn-primary flex items-center gap-2"
            >
              {currentStep < problem.steps.length - 1 ? 'Question suivante' : 'Terminer'}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
