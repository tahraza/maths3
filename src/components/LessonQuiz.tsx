'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { QuizQuestion } from '@/data/lessons'

interface LessonQuizProps {
  title: string
  questions: QuizQuestion[]
  type: 'pre' | 'post'
}

export default function LessonQuiz({ title, questions, type }: LessonQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [isComplete, setIsComplete] = useState(false)

  const question = questions[currentQuestion]
  const correctCount = answers.filter((a, i) => a === questions[i].correct).length

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleValidate = () => {
    if (selectedAnswer === null) return
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setIsComplete(true)
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setAnswers(new Array(questions.length).fill(null))
    setIsComplete(false)
  }

  if (isComplete) {
    const percentage = Math.round((correctCount / questions.length) * 100)
    const getMessage = () => {
      if (type === 'pre') {
        if (percentage >= 80) return { text: 'Tu maîtrises déjà bien ce sujet ! Cette leçon va te permettre de consolider tes acquis.', emoji: '🌟' }
        if (percentage >= 50) return { text: 'Tu as quelques bases. Cette leçon va t\'aider à progresser.', emoji: '📚' }
        return { text: 'C\'est le moment d\'apprendre ! Lis attentivement la leçon.', emoji: '🎯' }
      } else {
        if (percentage === 100) return { text: 'Parfait ! Tu as tout compris !', emoji: '🏆' }
        if (percentage >= 80) return { text: 'Excellent ! Tu as bien assimilé cette leçon.', emoji: '🌟' }
        if (percentage >= 60) return { text: 'Bien ! Quelques points à revoir.', emoji: '👍' }
        return { text: 'Relis la leçon et réessaie le quiz.', emoji: '📖' }
      }
    }
    const message = getMessage()

    return (
      <div className="text-center py-4">
        <div className="text-4xl mb-3">{message.emoji}</div>
        <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {correctCount}/{questions.length} bonnes réponses
        </div>
        <div className="text-slate-600 dark:text-slate-400 mb-4">
          {message.text}
        </div>
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          <RotateCcw className="h-4 w-4" />
          Recommencer le quiz
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
        <span>Question {currentQuestion + 1}/{questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 w-6 rounded-full',
                i < currentQuestion
                  ? answers[i] === questions[i].correct
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : i === currentQuestion
                    ? 'bg-primary-500'
                    : 'bg-slate-200 dark:bg-slate-700'
              )}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <p className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correct

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showResult}
              className={cn(
                'w-full text-left px-4 py-3 rounded-lg border-2 transition-all',
                !showResult && !isSelected && 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600',
                !showResult && isSelected && 'border-primary-500 bg-primary-50 dark:bg-primary-900/30',
                showResult && isCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                showResult && isSelected && !isCorrect && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                showResult && !isSelected && !isCorrect && 'border-slate-200 dark:border-slate-700 opacity-50'
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  showResult && isCorrect && 'text-green-700 dark:text-green-300 font-medium',
                  showResult && isSelected && !isCorrect && 'text-red-700 dark:text-red-300'
                )}>
                  {option}
                </span>
                {showResult && isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {showResult && question.explanation && (
        <div className={cn(
          'p-4 rounded-lg mb-4',
          selectedAnswer === question.correct
            ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800'
            : 'bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
        )}>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>Explication :</strong> {question.explanation}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!showResult ? (
          <button
            onClick={handleValidate}
            disabled={selectedAnswer === null}
            className="btn-primary disabled:opacity-50"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn-primary flex items-center gap-2"
          >
            {currentQuestion < questions.length - 1 ? 'Suivant' : 'Voir le résultat'}
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
