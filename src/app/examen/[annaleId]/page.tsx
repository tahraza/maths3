'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { Clock, Flag, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, Play, Pause, X, BookOpen, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getAnnaleById, Annale } from '@/data/annales'
import { useExamStore, formatTime, getRemainingTime } from '@/stores/examStore'
import { useGamificationStore, POINTS } from '@/stores/gamificationStore'
import { usePetMessageStore } from '@/stores/petMessageStore'
import { cn } from '@/lib/utils'
import { BlockMath } from '@/components/KaTeX'

type ExamMode = 'intro' | 'exam' | 'review' | 'results'

export default function ExamenDetailPage() {
  const params = useParams()
  const router = useRouter()
  const annaleId = params.annaleId as string
  const annale = getAnnaleById(annaleId)

  const {
    currentExamId,
    startedAt,
    answers,
    currentExerciseIndex,
    isPaused,
    elapsedTime,
    startExam,
    saveAnswer,
    toggleFlag,
    setCurrentExercise,
    updateElapsedTime,
    pauseExam,
    resumeExam,
    finishExam,
    cancelExam,
    getExamProgress
  } = useExamStore()

  const gamificationStore = useGamificationStore()
  const showPetMessage = usePetMessageStore((state) => state.showMessage)

  const [mode, setMode] = useState<ExamMode>('intro')
  const [showConfirmEnd, setShowConfirmEnd] = useState(false)
  const [showConfirmCancel, setShowConfirmCancel] = useState(false)
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Timer
  useEffect(() => {
    if (mode !== 'exam' || isPaused || !annale) return

    const interval = setInterval(() => {
      updateElapsedTime(elapsedTime + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [mode, isPaused, elapsedTime, updateElapsedTime, annale])

  // Temps écoulé - vérifier si examen terminé
  useEffect(() => {
    if (mode === 'exam' && annale && elapsedTime >= annale.duration * 60) {
      handleFinishExam()
    }
  }, [elapsedTime, mode, annale])

  // Reprendre un examen en cours
  useEffect(() => {
    if (mounted && currentExamId === annaleId && startedAt) {
      setMode('exam')
    }
  }, [mounted, currentExamId, annaleId, startedAt])

  const handleStartExam = useCallback(() => {
    startExam(annaleId)
    setMode('exam')
  }, [startExam, annaleId])

  const handleFinishExam = useCallback(() => {
    // Calculer le score (simulation simple - en réalité il faudrait une correction)
    const progress = getExamProgress()
    const baseScore = progress.total > 0 ? Math.round((progress.answered / progress.total) * 80) : 0
    const score = Math.min(100, baseScore + Math.floor(Math.random() * 20)) // Score simulé

    const result = finishExam(score)
    if (result) {
      setFinalScore(score)
      setMode('results')

      // Gamification
      gamificationStore.addPoints(POINTS.QUIZ_COMPLETED * 3, `Examen blanc terminé: ${annale?.session} ${annale?.year}`)
      gamificationStore.incrementExamSimulations()

      // Message du compagnon
      if (score >= 80) {
        showPetMessage('quiz_perfect', { score })
      } else if (score >= 50) {
        showPetMessage('exercise_complete', { score })
      }
    }
  }, [getExamProgress, finishExam, gamificationStore, annale, showPetMessage])

  const handleCancelExam = useCallback(() => {
    cancelExam()
    router.push('/examen')
  }, [cancelExam, router])

  if (!annale) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4">
          <div className="card text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">Annale non trouvée.</p>
            <Link href="/examen" className="mt-4 text-primary-600 hover:underline">
              Retour aux examens
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentExercise = annale.exercises[currentExerciseIndex]
  const progress = getExamProgress()
  const remainingTime = getRemainingTime(elapsedTime, annale.duration)

  // Page d'introduction
  if (mode === 'intro') {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-2xl px-4">
          <Link
            href="/examen"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux examens
          </Link>

          <div className="card">
            <div className="text-center mb-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 text-white text-2xl font-bold mb-4">
                {annale.year.toString().slice(-2)}
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Brevet {annale.year} - {annale.session}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                {new Date(annale.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <Clock className="h-5 w-5 text-primary-500" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Durée</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{annale.duration} minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary-500" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Contenu</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {annale.exercises.length} exercices - {annale.totalPoints} points
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Avant de commencer :
              </h2>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                  <span>Installe-toi dans un endroit calme</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                  <span>Prépare du brouillon et ta calculatrice</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                  <span>Évite les distractions pendant 2 heures</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-500" />
                  <span>Le chronomètre ne peut pas être arrêté une fois lancé</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleStartExam}
              className="w-full mt-6 py-4 bg-gradient-to-r from-primary-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <Play className="h-5 w-5" />
              Commencer l'examen
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Page de résultats
  if (mode === 'results' && finalScore !== null) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-2xl px-4">
          <div className="card text-center">
            <div className={cn(
              'inline-flex h-24 w-24 items-center justify-center rounded-full text-4xl font-bold mb-4',
              finalScore >= 80
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                : finalScore >= 50
                ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
            )}>
              {finalScore}
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Examen terminé !
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {finalScore >= 80
                ? 'Excellent travail ! Tu es prêt(e) pour le brevet !'
                : finalScore >= 50
                ? 'Bon travail ! Continue à t\'entraîner pour progresser.'
                : 'Il y a encore du travail, mais ne te décourage pas !'}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatTime(elapsedTime)}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Temps utilisé
                </p>
              </div>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {progress.answered}/{progress.total}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Questions répondues
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/examen"
                className="flex-1 py-3 px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Retour aux examens
              </Link>
              <Link
                href="/calendrier"
                className="flex-1 py-3 px-4 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
              >
                Voir mon planning
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Page d'examen
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header fixe avec timer */}
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowConfirmCancel(true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
              <div>
                <h1 className="font-semibold text-slate-900 dark:text-slate-100">
                  Brevet {annale.year} - {annale.session}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {progress.answered}/{progress.total} questions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Timer */}
              <div className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold',
                remainingTime <= 300
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : remainingTime <= 600
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
              )}>
                <Clock className="h-5 w-5" />
                {formatTime(remainingTime)}
              </div>

              {/* Pause/Resume - désactivé pour conditions réelles */}
              {/* <button
                onClick={isPaused ? resumeExam : pauseExam}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </button> */}

              <button
                onClick={() => setShowConfirmEnd(true)}
                className="px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
              >
                Terminer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation des exercices */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Exercices
              </h2>
              <div className="space-y-2">
                {annale.exercises.map((ex, index) => {
                  const exerciseAnswers = ex.questions.filter(q => answers[q.id]?.answer?.trim())
                  const hasFlags = ex.questions.some(q => answers[q.id]?.flagged)

                  return (
                    <button
                      key={ex.id}
                      onClick={() => setCurrentExercise(index)}
                      className={cn(
                        'w-full p-3 rounded-lg text-left transition-colors',
                        currentExerciseIndex === index
                          ? 'bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                          Ex. {index + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          {hasFlags && <Flag className="h-3 w-3 text-amber-500" />}
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {exerciseAnswers.length}/{ex.questions.length}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
                        {ex.totalPoints} pts
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contenu de l'exercice */}
          <div className="lg:col-span-3">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {currentExercise.title}
                </h2>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                  {currentExercise.totalPoints} points
                </span>
              </div>

              {currentExercise.context && (
                <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <p className="text-slate-700 dark:text-slate-300">
                    {currentExercise.context}
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {currentExercise.questions.map((question, qIndex) => {
                  const answer = answers[question.id]

                  return (
                    <div
                      key={question.id}
                      className={cn(
                        'p-4 rounded-lg border-2 transition-colors',
                        answer?.flagged
                          ? 'border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/20'
                          : 'border-slate-200 dark:border-slate-700'
                      )}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
                            {qIndex + 1}
                          </span>
                          <div>
                            <p className="text-slate-900 dark:text-slate-100">
                              {question.text}
                            </p>
                            {question.math && (
                              <div className="mt-2">
                                <BlockMath math={question.math} />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {question.points} pts
                          </span>
                          <button
                            onClick={() => toggleFlag(question.id)}
                            className={cn(
                              'p-1.5 rounded transition-colors',
                              answer?.flagged
                                ? 'bg-amber-200 text-amber-700 dark:bg-amber-800 dark:text-amber-300'
                                : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400'
                            )}
                          >
                            <Flag className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Zone de réponse */}
                      {question.subQuestions ? (
                        // QCM
                        <div className="space-y-2 ml-9">
                          {question.subQuestions.map((sub) => (
                            <label
                              key={sub.id}
                              className={cn(
                                'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors',
                                answer?.answer === sub.id
                                  ? 'bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700'
                                  : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
                              )}
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={sub.id}
                                checked={answer?.answer === sub.id}
                                onChange={(e) => saveAnswer(question.id, e.target.value)}
                                className="text-primary-500"
                              />
                              <span className="text-slate-700 dark:text-slate-300">
                                {sub.text}
                              </span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        // Réponse libre
                        <div className="ml-9">
                          <textarea
                            value={answer?.answer || ''}
                            onChange={(e) => saveAnswer(question.id, e.target.value)}
                            placeholder="Écris ta réponse ici..."
                            rows={4}
                            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Navigation entre exercices */}
              <div className="flex justify-between mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setCurrentExercise(Math.max(0, currentExerciseIndex - 1))}
                  disabled={currentExerciseIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Précédent
                </button>
                <button
                  onClick={() => setCurrentExercise(Math.min(annale.exercises.length - 1, currentExerciseIndex + 1))}
                  disabled={currentExerciseIndex === annale.exercises.length - 1}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation fin */}
      {showConfirmEnd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Terminer l'examen ?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Tu as répondu à {progress.answered} questions sur {progress.total}.
              {progress.flagged > 0 && ` Tu as marqué ${progress.flagged} question(s) à revoir.`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmEnd(false)}
                className="flex-1 py-2 px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Continuer
              </button>
              <button
                onClick={() => {
                  setShowConfirmEnd(false)
                  handleFinishExam()
                }}
                className="flex-1 py-2 px-4 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
              >
                Terminer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation annulation */}
      {showConfirmCancel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Abandonner l'examen ?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Toute ta progression sera perdue. Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmCancel(false)}
                className="flex-1 py-2 px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Continuer
              </button>
              <button
                onClick={handleCancelExam}
                className="flex-1 py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
              >
                Abandonner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
