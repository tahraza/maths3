'use client'

import { useState, useMemo } from 'react'
import { Calendar, ChevronLeft, ChevronRight, BookOpen, FileText, Brain, Target, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useGamificationStore } from '@/stores/gamificationStore'
import { lessons } from '@/data/lessons'
import { cn } from '@/lib/utils'

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

type DayType = 'lesson' | 'exercise' | 'flashcard' | 'exam' | 'rest' | 'completed' | null

const DAY_ICONS: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  lesson: { icon: <BookOpen className="h-4 w-4" />, label: 'Leçon', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' },
  exercise: { icon: <FileText className="h-4 w-4" />, label: 'Exercices', color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' },
  flashcard: { icon: <Brain className="h-4 w-4" />, label: 'Flashcards', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' },
  exam: { icon: <Target className="h-4 w-4" />, label: 'Examen blanc', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300' },
  rest: { icon: null, label: 'Repos', color: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400' },
  completed: { icon: <CheckCircle className="h-4 w-4" />, label: 'Terminé', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' },
}

export default function CalendrierPage() {
  const objective = useGamificationStore((state) => state.objective)
  const revisionPlan = useGamificationStore((state) => state.revisionPlan)
  const markDayCompleted = useGamificationStore((state) => state.markDayCompleted)
  const generateRevisionPlan = useGamificationStore((state) => state.generateRevisionPlan)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = today.toISOString().split('T')[0]

  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(todayStr)

  // Calculer les jours du mois
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Le premier jour de la semaine (0 = dimanche, 1 = lundi, etc.)
    let startDay = firstDay.getDay()
    startDay = startDay === 0 ? 6 : startDay - 1 // Convertir pour commencer le lundi

    const days: Array<{ date: string; day: number; isCurrentMonth: boolean }> = []

    // Jours du mois précédent
    const prevMonth = new Date(currentYear, currentMonth, 0)
    const prevMonthDays = prevMonth.getDate()
    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i
      const date = new Date(currentYear, currentMonth - 1, day)
      days.push({
        date: date.toISOString().split('T')[0],
        day,
        isCurrentMonth: false,
      })
    }

    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i)
      days.push({
        date: date.toISOString().split('T')[0],
        day: i,
        isCurrentMonth: true,
      })
    }

    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length // 6 semaines * 7 jours
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentYear, currentMonth + 1, i)
      days.push({
        date: date.toISOString().split('T')[0],
        day: i,
        isCurrentMonth: false,
      })
    }

    return days
  }, [currentMonth, currentYear])

  const getDayType = (dateStr: string): DayType => {
    if (!revisionPlan?.dailyPlan[dateStr]) return null

    const plan = revisionPlan.dailyPlan[dateStr]
    if (plan.completed) return 'completed'
    if (plan.examSimulation) return 'exam'
    if (plan.lessons.length > 0) return 'lesson'
    if (plan.exercises.length > 0) return 'exercise'
    if (plan.flashcards) return 'flashcard'
    return 'rest'
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const goToToday = () => {
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
    setSelectedDate(todayStr)
  }

  // Calcul des jours restants jusqu'au brevet
  const daysUntilBrevet = objective?.brevetDate
    ? Math.ceil((new Date(objective.brevetDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null

  const selectedPlan = selectedDate && revisionPlan?.dailyPlan[selectedDate]

  // Si pas d'objectif ou pas de date de brevet
  if (!objective) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="card text-center py-12">
            <Calendar className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Calendrier de Révision
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Définis d'abord ton objectif au brevet pour générer un planning personnalisé.
            </p>
            <Link
              href="/objectifs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
            >
              <Target className="h-5 w-5" />
              Définir mon objectif
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!objective.brevetDate) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="card text-center py-12">
            <Clock className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Date du Brevet Requise
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Tu as défini un objectif de {objective.targetGrade}/20, mais tu n'as pas encore indiqué la date de ton brevet.
            </p>
            <Link
              href="/objectifs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              Ajouter la date du brevet
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Générer le plan si nécessaire
  if (!revisionPlan && objective.brevetDate) {
    generateRevisionPlan()
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
            <Calendar className="h-8 w-8 text-primary-600" />
            Mon Planning de Révision
          </h1>
          {daysUntilBrevet !== null && daysUntilBrevet > 0 && (
            <p className="mt-2 text-lg text-primary-600 dark:text-primary-400">
              Brevet dans <span className="font-bold">{daysUntilBrevet}</span> jour{daysUntilBrevet > 1 ? 's' : ''}
              <span className="text-slate-500 dark:text-slate-400"> - {new Date(objective.brevetDate!).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </p>
          )}
          {daysUntilBrevet !== null && daysUntilBrevet <= 0 && (
            <p className="mt-2 text-lg text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Le brevet est passé ! Bravo pour tes efforts !
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendrier */}
          <div className="lg:col-span-2 card">
            {/* Navigation du mois */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </button>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {MONTHS[currentMonth]} {currentYear}
                </h2>
                <button
                  onClick={goToToday}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Aujourd'hui
                </button>
              </div>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Grille du calendrier */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map(({ date, day, isCurrentMonth }) => {
                const dayType = getDayType(date)
                const isToday = date === todayStr
                const isSelected = date === selectedDate
                const isPast = new Date(date) < today
                const isBrevet = date === objective.brevetDate

                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      'relative aspect-square p-1 rounded-lg transition-all flex flex-col items-center justify-center',
                      !isCurrentMonth && 'opacity-40',
                      isToday && 'ring-2 ring-primary-500',
                      isSelected && 'bg-primary-100 dark:bg-primary-900/30',
                      !isSelected && 'hover:bg-slate-100 dark:hover:bg-slate-700',
                      isBrevet && 'ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-900/30'
                    )}
                  >
                    <span className={cn(
                      'text-sm font-medium',
                      isCurrentMonth ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-600',
                      isToday && 'text-primary-600 dark:text-primary-400'
                    )}>
                      {day}
                    </span>
                    {dayType && (
                      <div className={cn(
                        'mt-0.5 w-2 h-2 rounded-full',
                        dayType === 'completed' && 'bg-emerald-500',
                        dayType === 'lesson' && 'bg-blue-500',
                        dayType === 'exercise' && 'bg-green-500',
                        dayType === 'flashcard' && 'bg-purple-500',
                        dayType === 'exam' && 'bg-orange-500',
                        dayType === 'rest' && 'bg-slate-300 dark:bg-slate-600',
                        isPast && dayType !== 'completed' && 'opacity-50'
                      )} />
                    )}
                    {isBrevet && (
                      <div className="absolute -top-1 -right-1 text-xs">
                        <Target className="h-4 w-4 text-amber-500" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Légende */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap gap-3 text-sm">
                {Object.entries(DAY_ICONS).map(([key, { icon, label, color }]) => (
                  <div key={key} className={cn('flex items-center gap-1.5 px-2 py-1 rounded-full', color)}>
                    {icon}
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Détails du jour sélectionné */}
          <div className="card h-fit">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              }) : "Sélectionne un jour"}
            </h3>

            {selectedDate === objective.brevetDate && (
              <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-medium">
                  <Target className="h-5 w-5" />
                  Jour du Brevet !
                </div>
                <p className="mt-1 text-sm text-amber-600 dark:text-amber-400">
                  C'est le grand jour. Tu es prêt(e) !
                </p>
              </div>
            )}

            {selectedPlan ? (
              <div className="space-y-3">
                {selectedPlan.completed ? (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-medium">
                      <CheckCircle className="h-5 w-5" />
                      Journée terminée !
                    </div>
                  </div>
                ) : (
                  <>
                    {selectedPlan.lessons.length > 0 && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-medium mb-2">
                          <BookOpen className="h-5 w-5" />
                          Leçons
                        </div>
                        <ul className="space-y-1">
                          {selectedPlan.lessons.map((lessonId) => {
                            const lesson = lessons.find(l => l.id === lessonId)
                            return (
                              <li key={lessonId}>
                                <Link
                                  href={`/lecons/${lessonId}`}
                                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  {lesson?.title || `Leçon ${lessonId}`}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )}

                    {selectedPlan.exercises.length > 0 && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-300 font-medium mb-2">
                          <FileText className="h-5 w-5" />
                          Exercices
                        </div>
                        <Link
                          href="/exercices"
                          className="text-sm text-green-600 dark:text-green-400 hover:underline"
                        >
                          Voir les exercices
                        </Link>
                      </div>
                    )}

                    {selectedPlan.flashcards && (
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-medium mb-2">
                          <Brain className="h-5 w-5" />
                          Flashcards
                        </div>
                        <Link
                          href="/flashcards"
                          className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                        >
                          Réviser les flashcards
                        </Link>
                      </div>
                    )}

                    {selectedPlan.examSimulation && (
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 font-medium mb-2">
                          <Target className="h-5 w-5" />
                          Examen blanc
                        </div>
                        <Link
                          href="/examen"
                          className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                        >
                          Faire un examen blanc
                        </Link>
                      </div>
                    )}

                    {!selectedPlan.lessons.length && !selectedPlan.exercises.length && !selectedPlan.flashcards && !selectedPlan.examSimulation && (
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                          Jour de repos
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                          Profite pour te détendre !
                        </p>
                      </div>
                    )}

                    {selectedDate <= todayStr && (selectedPlan.lessons.length > 0 || selectedPlan.exercises.length > 0 || selectedPlan.flashcards || selectedPlan.examSimulation) && (
                      <button
                        onClick={() => markDayCompleted(selectedDate)}
                        className="w-full mt-2 py-2 px-4 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Marquer comme terminé
                      </button>
                    )}
                  </>
                )}
              </div>
            ) : selectedDate && !revisionPlan?.dailyPlan[selectedDate] ? (
              <div className="text-center py-4 text-slate-500 dark:text-slate-400">
                <AlertCircle className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">Pas de plan pour ce jour</p>
              </div>
            ) : (
              <div className="text-center py-4 text-slate-500 dark:text-slate-400">
                <Calendar className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">Clique sur un jour pour voir le programme</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats rapides */}
        {revisionPlan && (
          <div className="mt-6 card">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Statistiques du Planning
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(() => {
                const plans = Object.values(revisionPlan.dailyPlan)
                const totalDays = plans.length
                const completedDays = plans.filter(p => p.completed).length
                const lessonDays = plans.filter(p => p.lessons.length > 0).length
                const examDays = plans.filter(p => p.examSimulation).length

                return (
                  <>
                    <div className="text-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {completedDays}/{totalDays}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Jours complétés
                      </div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {lessonDays}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Jours de leçons
                      </div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {examDays}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Examens blancs
                      </div>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {Math.round((completedDays / totalDays) * 100) || 0}%
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Progression
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
