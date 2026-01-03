'use client'

import { useEffect, useState } from 'react'
import { Trophy, Flame, BookOpen, ClipboardList, Brain, Calendar, TrendingUp, Award, Gamepad2, Settings } from 'lucide-react'
import { useGamificationStore, BADGES } from '@/stores/gamificationStore'
import { usePetStore } from '@/stores/petStore'
import { cn } from '@/lib/utils'
import PetCompanion from '@/components/PetCompanion'
import PetSelector from '@/components/PetSelector'
import PetShop from '@/components/PetShop'
import GamificationTab from '@/components/GamificationTab'
import DataManagement from '@/components/DataManagement'

type TabType = 'stats' | 'gamification' | 'data'

export default function StatsPage() {
  const store = useGamificationStore()
  const selectedPet = usePetStore((state) => state.selectedPet)
  const [mounted, setMounted] = useState(false)
  const [showPetSelector, setShowPetSelector] = useState(false)
  const [showShop, setShowShop] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('stats')

  useEffect(() => {
    setMounted(true)
    // Refresh weekly challenges on page load
    store.checkAndRefreshWeeklyChallenges()
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-8 h-40 rounded-xl bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    )
  }

  const levelInfo = store.getLevel()
  const { level, title: levelName, currentXP, nextLevelXP, progress: progressToNext } = levelInfo
  const streak = store.currentStreak
  const unlockedBadges = store.unlockedBadges
  const history = store.pointsHistory
  const stats = {
    lessons: store.totalLessonsCompleted,
    exercises: store.totalExercisesCompleted,
    flashcards: store.totalCorrectAnswers,
  }

  // Calculer les statistiques des 7 derniers jours
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })

  const activityByDay = last7Days.map(day => {
    const dayHistory = history.filter(h => h.date.startsWith(day))
    return {
      date: day,
      points: dayHistory.reduce((sum, h) => sum + h.points, 0),
      count: dayHistory.length,
    }
  })

  const maxPoints = Math.max(...activityByDay.map(d => d.points), 50)

  // Count pending rewards
  const pendingChallenges = store.weeklyChallenges.filter(c => c.completed && !c.claimed).length
  const pendingQuests = store.sideQuests.filter(q => q.completed && !q.claimed).length
  const totalPending = pendingChallenges + pendingQuests

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
            <Trophy className="h-8 w-8 text-primary-600" />
            Mes statistiques
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Suis ta progression et tes accomplissements
          </p>
        </div>

        {/* Niveau et XP */}
        <div className="card mb-6 bg-gradient-to-r from-primary-500 to-indigo-600 text-white">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-4xl sm:mb-0 sm:mr-6">
              <span>{level}</span>
            </div>
            <div className="flex-1">
              <div className="text-lg font-medium text-white/80">Niveau {level}</div>
              <div className="text-2xl font-bold">{levelName}</div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>{currentXP} XP</span>
                  <span>{nextLevelXP} XP</span>
                </div>
                <div className="mt-1 h-3 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{ width: `${Math.min(progressToNext, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mon Compagnon */}
        <div className="mb-6">
          {selectedPet ? (
            <PetCompanion
              onOpenShop={() => setShowShop(true)}
              onChangePet={() => setShowPetSelector(true)}
            />
          ) : (
            <button
              onClick={() => setShowPetSelector(true)}
              className="w-full card border-2 border-dashed border-primary-300 dark:border-primary-700
                bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20
                hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30
                transition-all"
            >
              <div className="flex flex-col items-center gap-3 py-4">
                <span className="text-5xl">🐾</span>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Choisis ton compagnon !
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Un animal t&apos;accompagnera dans tes révisions
                  </p>
                </div>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium">
                  Choisir →
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('stats')}
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all whitespace-nowrap',
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            <TrendingUp className="h-5 w-5" />
            <span>Statistiques</span>
          </button>
          <button
            onClick={() => setActiveTab('gamification')}
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all whitespace-nowrap relative',
              activeTab === 'gamification'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            <Gamepad2 className="h-5 w-5" />
            <span>Gamification</span>
            {totalPending > 0 && (
              <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {totalPending}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all whitespace-nowrap',
              activeTab === 'data'
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Données</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'stats' && (
          <>
            {/* Stats rapides */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="card flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{streak}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Jours de suite</div>
                </div>
              </div>

              <div className="card flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.lessons}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Leçons terminées</div>
                </div>
              </div>

              <div className="card flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <ClipboardList className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.exercises}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Exercices faits</div>
                </div>
              </div>

              <div className="card flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.flashcards}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Flashcards révisées</div>
                </div>
              </div>
            </div>

            {/* Activité des 7 derniers jours */}
            <div className="card mb-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                <TrendingUp className="h-5 w-5 text-primary-600" />
                Activité de la semaine
              </h2>
              <div className="flex items-end justify-between gap-2" style={{ height: '150px' }}>
                {activityByDay.map((day) => {
                  const height = day.points > 0 ? (day.points / maxPoints) * 100 : 5
                  const dayName = new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'short' })
                  const isToday = day.date === new Date().toISOString().split('T')[0]

                  return (
                    <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                      <div className="relative w-full" style={{ height: '120px' }}>
                        <div
                          className={cn(
                            'absolute bottom-0 w-full rounded-t-lg transition-all duration-500',
                            isToday ? 'bg-primary-500' : 'bg-primary-200 dark:bg-primary-800',
                            day.points === 0 && 'bg-slate-200 dark:bg-slate-700'
                          )}
                          style={{ height: `${height}%` }}
                        />
                        {day.points > 0 && (
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-slate-600 dark:text-slate-400">
                            {day.points}
                          </div>
                        )}
                      </div>
                      <span className={cn(
                        'text-xs',
                        isToday ? 'font-bold text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400'
                      )}>
                        {dayName}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Badges */}
            <div className="card">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                <Award className="h-5 w-5 text-primary-600" />
                Badges ({unlockedBadges.length}/{BADGES.length})
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BADGES.map((badge) => {
                  const isUnlocked = unlockedBadges.includes(badge.id)

                  return (
                    <div
                      key={badge.id}
                      className={cn(
                        'rounded-lg border p-4 transition-all',
                        isUnlocked
                          ? 'border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20'
                          : 'border-slate-200 bg-slate-50 opacity-50 dark:border-slate-700 dark:bg-slate-800/50'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'text-3xl',
                          !isUnlocked && 'grayscale'
                        )}>
                          {badge.icon}
                        </div>
                        <div>
                          <h3 className={cn(
                            'font-medium',
                            isUnlocked
                              ? 'text-slate-900 dark:text-slate-100'
                              : 'text-slate-500 dark:text-slate-400'
                          )}>
                            {badge.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {badge.description}
                          </p>
                          {!isUnlocked && (
                            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                              Objectif: {badge.requirement} {badge.type}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Historique récent */}
            {history.length > 0 && (
              <div className="card mt-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  Activité récente
                </h2>
                <div className="space-y-3">
                  {history.slice(-10).reverse().map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800"
                    >
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {item.reason}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {new Date(item.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </p>
                      </div>
                      <span className={cn(
                        "font-semibold",
                        item.points >= 0
                          ? "text-primary-600 dark:text-primary-400"
                          : "text-orange-600 dark:text-orange-400"
                      )}>
                        {item.points >= 0 ? '+' : ''}{item.points} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'gamification' && (
          <GamificationTab />
        )}

        {activeTab === 'data' && (
          <DataManagement />
        )}
      </div>

      {/* Modals */}
      {showPetSelector && (
        <PetSelector onClose={() => setShowPetSelector(false)} />
      )}
      {showShop && (
        <PetShop onClose={() => setShowShop(false)} />
      )}
    </div>
  )
}
