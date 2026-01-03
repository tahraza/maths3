'use client'

import { useParams } from 'next/navigation'
import { ArrowLeft, Clock, Target, CheckCircle, AlertTriangle, HelpCircle, Award } from 'lucide-react'
import Link from 'next/link'
import { lessons, chapters } from '@/data/lessons'
import { cn } from '@/lib/utils'
import { useGamificationStore, POINTS } from '@/stores/gamificationStore'
import { useState, useEffect } from 'react'
import { BlockMath, InlineMath } from '@/components/KaTeX'
import LessonQuiz from '@/components/LessonQuiz'
import VideoPlayer from '@/components/VideoPlayer'

const chapterColors: Record<string, string> = {
  'nombres': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'fonctions': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'geometrie': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  'statistiques': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
}

export default function LessonPage() {
  const params = useParams()
  const lessonId = params.id as string
  const lesson = lessons.find(l => l.id === lessonId)
  const [completed, setCompleted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const store = useGamificationStore()

  useEffect(() => {
    setMounted(true)
    const today = new Date().toISOString().split('T')[0]
    const completedLessons = JSON.parse(localStorage.getItem('maths3-completed-lessons') || '{}')
    if (completedLessons[today]?.includes(lessonId)) {
      setCompleted(true)
    }
  }, [lessonId])

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">Leçon non trouvée</p>
          <Link href="/lecons" className="mt-4 block text-center text-primary-600 hover:underline">
            Retour aux leçons
          </Link>
        </div>
      </div>
    )
  }

  const chapter = chapters.find(c => c.id === lesson.chapterId)
  const lessonIndex = lessons.filter(l => l.chapterId === lesson.chapterId).findIndex(l => l.id === lessonId)
  const nextLesson = lessons.filter(l => l.chapterId === lesson.chapterId)[lessonIndex + 1]

  const handleComplete = () => {
    if (completed || !lesson) return

    try {
      const today = new Date().toISOString().split('T')[0]
      const storedData = localStorage.getItem('maths3-completed-lessons')
      const completedLessons = storedData ? JSON.parse(storedData) : {}

      if (!completedLessons[today]) {
        completedLessons[today] = []
      }
      if (!completedLessons[today].includes(lessonId)) {
        completedLessons[today].push(lessonId)
      }
      localStorage.setItem('maths3-completed-lessons', JSON.stringify(completedLessons))

      if (mounted && store) {
        store.addPoints(POINTS.LESSON_COMPLETED, `Leçon terminée : ${lesson.title}`)
        store.incrementStat('lessons')
        store.recordActivity('lesson', lessonId)
      }

      setCompleted(true)
    } catch (error) {
      console.error('Error completing lesson:', error)
      setCompleted(true)
    }
  }

  const renderSection = (section: typeof lesson.content[0], index: number) => {
    const renderContent = (content: string | string[]) => {
      if (Array.isArray(content)) {
        return (
          <ul className="space-y-2 pl-4">
            {content.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
      }
      return <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">{content}</p>
    }

    switch (section.type) {
      case 'text':
        return (
          <div key={index} className="mb-6">
            {section.title && (
              <h3 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                {section.title}
              </h3>
            )}
            {section.content && renderContent(section.content)}
          </div>
        )

      case 'definition':
        return (
          <div key={index} className="definition-box mb-6">
            <h4 className="mb-2 font-semibold text-primary-800 dark:text-primary-300">
              📖 {section.title}
            </h4>
            {section.content && renderContent(section.content)}
            {section.math && <div className="mt-3"><BlockMath math={section.math} /></div>}
          </div>
        )

      case 'theorem':
        return (
          <div key={index} className="theorem-box mb-6">
            <h4 className="mb-2 font-semibold text-purple-800 dark:text-purple-300">
              📐 {section.title}
            </h4>
            {section.content && renderContent(section.content)}
            {section.math && <div className="mt-3"><BlockMath math={section.math} /></div>}
          </div>
        )

      case 'property':
        return (
          <div key={index} className="property-box mb-6">
            <h4 className="mb-2 font-semibold text-teal-800 dark:text-teal-300">
              ✓ {section.title}
            </h4>
            {section.content && renderContent(section.content)}
            {section.math && <div className="mt-3"><BlockMath math={section.math} /></div>}
          </div>
        )

      case 'formula':
        return (
          <div key={index} className="formula-box mb-6">
            <h4 className="mb-2 font-semibold text-amber-800 dark:text-amber-300">
              📝 {section.title}
            </h4>
            {section.content && renderContent(section.content)}
            {section.math && <div className="mt-3 text-lg"><BlockMath math={section.math} /></div>}
          </div>
        )

      case 'example':
        return (
          <div key={index} className="example-box mb-6">
            <h4 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
              💡 {section.title}
            </h4>
            {section.content && renderContent(section.content)}
            {section.math && <div className="mt-3"><BlockMath math={section.math} /></div>}
          </div>
        )

      case 'realworld':
        return (
          <div key={index} className="realworld-box mb-6">
            <h4 className="mb-2 font-semibold text-orange-800 dark:text-orange-300">
              {section.title}
            </h4>
            {section.content && renderContent(section.content)}
          </div>
        )

      case 'method':
        return (
          <div key={index} className="method-box mb-6">
            <h4 className="mb-2 font-semibold text-cyan-800 dark:text-cyan-300">
              🔧 {section.title}
            </h4>
            {section.content && renderContent(section.content)}
            {section.math && <div className="mt-3"><BlockMath math={section.math} /></div>}
          </div>
        )

      case 'warning':
        return (
          <div key={index} className="warning-box mb-6">
            <h4 className="mb-2 font-semibold text-red-800 dark:text-red-300">
              ⚠️ {section.title}
            </h4>
            {section.content && renderContent(section.content)}
          </div>
        )

      case 'tip':
        return (
          <div key={index} className="tip-box mb-6">
            <h4 className="mb-2 font-semibold text-green-800 dark:text-green-300">
              💡 {section.title}
            </h4>
            {section.content && renderContent(section.content)}
          </div>
        )

      case 'list':
        return (
          <div key={index} className="mb-6">
            {section.title && (
              <h3 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
                {section.title}
              </h3>
            )}
            {section.content && renderContent(section.content)}
          </div>
        )

      case 'quiz':
        if (!section.questions || section.questions.length === 0) return null
        return (
          <div key={index} className={cn(
            'mb-8 rounded-xl border-2 p-6',
            section.quizType === 'pre'
              ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
              : 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
          )}>
            <h3 className={cn(
              'mb-4 flex items-center gap-2 text-lg font-semibold',
              section.quizType === 'pre'
                ? 'text-blue-800 dark:text-blue-300'
                : 'text-green-800 dark:text-green-300'
            )}>
              {section.quizType === 'pre' ? (
                <>
                  <HelpCircle className="h-5 w-5" />
                  {section.title || 'Teste tes connaissances avant de commencer'}
                </>
              ) : (
                <>
                  <Award className="h-5 w-5" />
                  {section.title || 'Vérifie ta compréhension'}
                </>
              )}
            </h3>
            <LessonQuiz
              title={section.title || ''}
              questions={section.questions}
              type={section.quizType || 'post'}
            />
          </div>
        )

      case 'errors':
        return (
          <div key={index} className="mb-8 rounded-xl border-2 border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-800 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
              {section.title || 'Erreurs fréquentes à éviter'}
            </h3>
            {section.content && (
              <div className="space-y-3">
                {Array.isArray(section.content) ? (
                  section.content.map((error, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg bg-white/60 p-3 dark:bg-slate-800/60">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-200 text-sm font-bold text-red-700 dark:bg-red-800 dark:text-red-300">
                        {i + 1}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300">{error}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-700 dark:text-slate-300">{section.content}</p>
                )}
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/lecons"
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux leçons
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className={cn('rounded-full px-2 py-0.5', chapterColors[chapter?.id || 'nombres'])}>
              {chapter?.name}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {lesson.duration} min
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
            {lesson.title}
          </h1>
        </div>

        {/* Objectifs */}
        <div className="mb-8 rounded-xl border border-primary-200 bg-primary-50 p-6 dark:border-primary-800 dark:bg-primary-900/20">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-primary-800 dark:text-primary-300">
            <Target className="h-5 w-5" />
            Objectifs de la leçon
          </h2>
          <ul className="space-y-2">
            {lesson.objectives.map((objective, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vidéo explicative */}
        {lesson.videoUrl && (
          <div className="mb-8">
            <VideoPlayer
              videoUrl={lesson.videoUrl}
              videoDuration={lesson.videoDuration}
              videoCreator={lesson.videoCreator}
              onComplete={() => {
                if (mounted && store) {
                  store.addPoints(10, `Vidéo regardée : ${lesson.title}`)
                }
              }}
            />
          </div>
        )}

        {/* Contenu */}
        <div className="card mb-8">
          <div className="lesson-content">
            {lesson.content.map((section, index) => renderSection(section, index))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4 rounded-xl bg-gradient-to-r from-primary-50 to-indigo-50 p-6 dark:from-primary-900/20 dark:to-indigo-900/20">
          {completed ? (
            <div className="flex items-center gap-2 text-lg font-medium text-primary-700 dark:text-primary-300">
              <CheckCircle className="h-6 w-6" />
              Leçon terminée ! +50 XP
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="btn-primary flex items-center gap-2 px-6 py-3 text-lg"
            >
              <CheckCircle className="h-5 w-5" />
              Marquer comme terminée
            </button>
          )}

          <div className="flex gap-4">
            {nextLesson && (
              <Link
                href={`/lecons/${nextLesson.id}`}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Leçon suivante : {nextLesson.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
