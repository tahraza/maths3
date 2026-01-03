import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Annale, getAnnaleById } from '@/data/annales'

export interface ExamAnswer {
  questionId: string
  answer: string
  timeSpent: number // en secondes
  flagged: boolean
}

export interface ExamResult {
  annaleId: string
  startedAt: string
  completedAt: string
  totalTime: number // en secondes
  answers: ExamAnswer[]
  score: number // sur 100
}

interface ExamState {
  // Examen en cours
  currentExamId: string | null
  startedAt: string | null
  answers: Record<string, ExamAnswer>
  currentExerciseIndex: number
  isPaused: boolean
  elapsedTime: number // en secondes

  // Historique des examens
  examHistory: ExamResult[]

  // Actions
  startExam: (annaleId: string) => void
  saveAnswer: (questionId: string, answer: string) => void
  toggleFlag: (questionId: string) => void
  setCurrentExercise: (index: number) => void
  updateElapsedTime: (time: number) => void
  pauseExam: () => void
  resumeExam: () => void
  finishExam: (score: number) => ExamResult | null
  cancelExam: () => void

  // Getters
  getCurrentAnnale: () => Annale | null
  getExamProgress: () => { answered: number; total: number; flagged: number }
  getExamStats: () => { totalExams: number; averageScore: number; bestScore: number }
}

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      currentExamId: null,
      startedAt: null,
      answers: {},
      currentExerciseIndex: 0,
      isPaused: false,
      elapsedTime: 0,
      examHistory: [],

      startExam: (annaleId) => {
        const annale = getAnnaleById(annaleId)
        if (!annale) return

        set({
          currentExamId: annaleId,
          startedAt: new Date().toISOString(),
          answers: {},
          currentExerciseIndex: 0,
          isPaused: false,
          elapsedTime: 0
        })
      },

      saveAnswer: (questionId, answer) => {
        const { answers, elapsedTime } = get()
        const existingAnswer = answers[questionId]

        set({
          answers: {
            ...answers,
            [questionId]: {
              questionId,
              answer,
              timeSpent: existingAnswer?.timeSpent || elapsedTime,
              flagged: existingAnswer?.flagged || false
            }
          }
        })
      },

      toggleFlag: (questionId) => {
        const { answers } = get()
        const existingAnswer = answers[questionId]

        set({
          answers: {
            ...answers,
            [questionId]: {
              questionId,
              answer: existingAnswer?.answer || '',
              timeSpent: existingAnswer?.timeSpent || 0,
              flagged: !existingAnswer?.flagged
            }
          }
        })
      },

      setCurrentExercise: (index) => {
        set({ currentExerciseIndex: index })
      },

      updateElapsedTime: (time) => {
        set({ elapsedTime: time })
      },

      pauseExam: () => {
        set({ isPaused: true })
      },

      resumeExam: () => {
        set({ isPaused: false })
      },

      finishExam: (score) => {
        const { currentExamId, startedAt, answers, elapsedTime, examHistory } = get()

        if (!currentExamId || !startedAt) return null

        const result: ExamResult = {
          annaleId: currentExamId,
          startedAt,
          completedAt: new Date().toISOString(),
          totalTime: elapsedTime,
          answers: Object.values(answers),
          score
        }

        set({
          examHistory: [...examHistory, result],
          currentExamId: null,
          startedAt: null,
          answers: {},
          currentExerciseIndex: 0,
          isPaused: false,
          elapsedTime: 0
        })

        return result
      },

      cancelExam: () => {
        set({
          currentExamId: null,
          startedAt: null,
          answers: {},
          currentExerciseIndex: 0,
          isPaused: false,
          elapsedTime: 0
        })
      },

      getCurrentAnnale: () => {
        const { currentExamId } = get()
        if (!currentExamId) return null
        return getAnnaleById(currentExamId) || null
      },

      getExamProgress: () => {
        const { answers, currentExamId } = get()
        const annale = currentExamId ? getAnnaleById(currentExamId) : null

        if (!annale) return { answered: 0, total: 0, flagged: 0 }

        let total = 0
        annale.exercises.forEach(ex => {
          total += ex.questions.length
        })

        const answered = Object.values(answers).filter(a => a.answer.trim() !== '').length
        const flagged = Object.values(answers).filter(a => a.flagged).length

        return { answered, total, flagged }
      },

      getExamStats: () => {
        const { examHistory } = get()

        if (examHistory.length === 0) {
          return { totalExams: 0, averageScore: 0, bestScore: 0 }
        }

        const totalExams = examHistory.length
        const scores = examHistory.map(e => e.score)
        const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalExams)
        const bestScore = Math.max(...scores)

        return { totalExams, averageScore, bestScore }
      }
    }),
    {
      name: 'maths3-exam'
    }
  )
)

/**
 * Formate le temps en heures:minutes:secondes
 */
export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * Calcule le temps restant en secondes
 */
export function getRemainingTime(elapsedSeconds: number, durationMinutes: number): number {
  const totalSeconds = durationMinutes * 60
  return Math.max(0, totalSeconds - elapsedSeconds)
}
