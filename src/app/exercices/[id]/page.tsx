'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Trophy, ChevronRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { exercises, Exercise, Question } from '@/data/exercises'
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

export default function ExercisePage() {
  const params = useParams()
  const exerciseId = params.id as string
  const exercise = exercises.find(e => e.id === exerciseId)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [mounted, setMounted] = useState(false)
  const store = useGamificationStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (exercise) {
      setAnswers(new Array(exercise.questions.length).fill(null))
    }
  }, [exercise])

  if (!exercise) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">Exercice non trouvé</p>
          <Link href="/exercices" className="mt-4 block text-center text-primary-600 hover:underline">
            Retour aux exercices
          </Link>
        </div>
      </div>
    )
  }

  const chapter = chapters.find(c => c.id === exercise.chapterId)
  const question = exercise.questions[currentQuestion]
  const totalQuestions = exercise.questions.length
  const correctAnswers = answers.filter((a, i) => a === exercise.questions[i].correctAnswer).length

  const handleAnswer = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = index
    setAnswers(newAnswers)
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (!exercise) return

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      try {
        // Calcul du score final
        const finalScore = answers.filter((a, i) => a === exercise.questions[i].correctAnswer).length
        const percentage = (finalScore / totalQuestions) * 100

        // Attribution des points selon la performance (seulement si monté côté client)
        if (mounted && store) {
          let points = POINTS.EXERCISE_COMPLETED
          if (percentage === 100) {
            points += 50 // Bonus parfait
          } else if (percentage >= 80) {
            points += 25 // Bon score
          }

          store.addPoints(points, `Exercice terminé : ${exercise.title} (${Math.round(percentage)}%)`)
          store.incrementStat('exercises')
          store.recordActivity('exercise', exerciseId)
        }

        setIsComplete(true)
      } catch (error) {
        console.error('Error completing exercise:', error)
        setIsComplete(true)
      }
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnswers(new Array(totalQuestions).fill(null))
    setIsComplete(false)
  }

  if (isComplete) {
    const percentage = (correctAnswers / totalQuestions) * 100
    const getMessage = () => {
      if (percentage === 100) return { text: 'Parfait ! Tu maîtrises ce sujet !', icon: '🏆' }
      if (percentage >= 80) return { text: 'Excellent travail !', icon: '🌟' }
      if (percentage >= 60) return { text: 'Bien joué, continue comme ça !', icon: '👍' }
      if (percentage >= 40) return { text: 'Tu progresses, révise la leçon !', icon: '📚' }
      return { text: 'Courage, retourne voir la leçon !', icon: '💪' }
    }
    const message = getMessage()

    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-2xl px-4">
          <div className="card text-center">
            <div className="mb-6 text-6xl">{message.icon}</div>
            <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Exercice terminé !
            </h1>
            <p className="mb-6 text-lg text-slate-600 dark:text-slate-400">
              {message.text}
            </p>

            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="rounded-xl bg-primary-100 px-6 py-4 dark:bg-primary-900/30">
                <div className="text-3xl font-bold text-primary-700 dark:text-primary-300">
                  {correctAnswers}/{totalQuestions}
                </div>
                <div className="text-sm text-primary-600 dark:text-primary-400">
                  Bonnes réponses
                </div>
              </div>
              <div className="rounded-xl bg-slate-100 px-6 py-4 dark:bg-slate-800">
                <div className="text-3xl font-bold text-slate-700 dark:text-slate-300">
                  {Math.round(percentage)}%
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Score
                </div>
              </div>
            </div>

            {/* Récapitulatif des réponses */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">
                Récapitulatif
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {answers.map((answer, index) => {
                  const isCorrect = answer === exercise.questions[index].correctAnswer
                  return (
                    <div
                      key={index}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium',
                        isCorrect
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      )}
                    >
                      {index + 1}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleRetry}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Recommencer
              </button>
              {exercise.lessonId && (
                <Link
                  href={`/lecons/${exercise.lessonId}`}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Revoir la leçon
                </Link>
              )}
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
            <span className={cn('rounded-full px-2 py-0.5', difficultyColors[exercise.difficulty])}>
              {exercise.difficulty}
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {exercise.title}
          </h1>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Question {currentQuestion + 1} sur {totalQuestions}</span>
            <span>{Math.round(((currentQuestion + (showExplanation ? 1 : 0)) / totalQuestions) * 100)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-primary-500 transition-all duration-300"
              style={{ width: `${((currentQuestion + (showExplanation ? 1 : 0)) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="card mb-6">
          <h2 className="mb-6 text-lg font-medium text-slate-900 dark:text-slate-100">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correctAnswer
              const showResult = showExplanation

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={cn(
                    'w-full rounded-lg border-2 p-4 text-left transition-all',
                    !showResult && !isSelected && 'border-slate-200 bg-white hover:border-primary-300 hover:bg-primary-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary-600 dark:hover:bg-primary-900/20',
                    !showResult && isSelected && 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/30',
                    showResult && isCorrect && 'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/30',
                    showResult && isSelected && !isCorrect && 'border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/30',
                    showResult && !isSelected && !isCorrect && 'border-slate-200 bg-slate-50 opacity-50 dark:border-slate-700 dark:bg-slate-800'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      'font-medium',
                      showResult && isCorrect && 'text-green-700 dark:text-green-300',
                      showResult && isSelected && !isCorrect && 'text-red-700 dark:text-red-300',
                      !showResult && 'text-slate-900 dark:text-slate-100'
                    )}>
                      {option}
                    </span>
                    {showResult && isCorrect && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Explication */}
        {showExplanation && (
          <div className={cn(
            'card mb-6',
            selectedAnswer === question.correctAnswer
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
              : 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20'
          )}>
            <h3 className={cn(
              'mb-2 font-semibold',
              selectedAnswer === question.correctAnswer
                ? 'text-green-800 dark:text-green-300'
                : 'text-amber-800 dark:text-amber-300'
            )}>
              {selectedAnswer === question.correctAnswer ? '✓ Bonne réponse !' : '✗ Mauvaise réponse'}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Navigation */}
        {showExplanation && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="btn-primary flex items-center gap-2"
            >
              {currentQuestion < totalQuestions - 1 ? 'Question suivante' : 'Voir les résultats'}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
