import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateWeeklyChallenges, getWeekStartDate, SIDE_QUESTS, WeeklyChallenge, SideQuest } from '@/data/challenges'

export interface ActiveChallenge extends WeeklyChallenge {
  progress: number
  completed: boolean
  claimed: boolean
}

export interface ActiveSideQuest extends SideQuest {
  progress: number
  completed: boolean
  claimed: boolean
}

export const POINTS = {
  LESSON_COMPLETED: 50,
  LESSON_REVIEWED: 20,
  EXERCISE_COMPLETED: 25,
  EXERCISE_CORRECT: 20,
  EXERCISE_FIRST_TRY: 30,
  QUIZ_COMPLETED: 30,
  QUIZ_PERFECT: 100,
  FLASHCARD_REVIEWED: 5,
  FLASHCARD_CORRECT: 5,
  FLASHCARD_MASTERED: 25,
  STREAK_BONUS_7: 100,
  STREAK_BONUS_30: 500,
  DAILY_LOGIN: 10,
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  requirement: number
  type: 'lessons' | 'exercises' | 'quizzes' | 'streaks' | 'special'
}

export const BADGES: Badge[] = [
  // Lesson badges
  { id: 'first-lesson', name: 'Premier théorème', description: 'Complète ta première leçon', icon: '📐', requirement: 1, type: 'lessons' },
  { id: 'lesson-5', name: 'Mathématicien en herbe', description: 'Complète 5 leçons', icon: '📚', requirement: 5, type: 'lessons' },
  { id: 'lesson-10', name: 'Apprenti Pythagore', description: 'Complète 10 leçons', icon: '🔺', requirement: 10, type: 'lessons' },
  { id: 'lesson-20', name: 'Maître des maths', description: 'Complète 20 leçons', icon: '🎓', requirement: 20, type: 'lessons' },

  // Exercise badges
  { id: 'first-exercise', name: 'Calculateur', description: 'Réussis ton premier exercice', icon: '✏️', requirement: 1, type: 'exercises' },
  { id: 'exercise-10', name: 'Entraîné', description: 'Réussis 10 exercices', icon: '💪', requirement: 10, type: 'exercises' },
  { id: 'exercise-25', name: 'Géomètre', description: 'Réussis 25 exercices', icon: '📏', requirement: 25, type: 'exercises' },
  { id: 'exercise-50', name: 'Expert', description: 'Réussis 50 exercices', icon: '🧮', requirement: 50, type: 'exercises' },

  // Quiz badges
  { id: 'first-quiz', name: 'Testeur', description: 'Complète ton premier QCM', icon: '❓', requirement: 1, type: 'quizzes' },
  { id: 'quiz-5', name: 'Quiz master', description: 'Complète 5 QCM', icon: '🎯', requirement: 5, type: 'quizzes' },
  { id: 'perfect-quiz', name: 'Score parfait', description: 'Obtiens 100% à un QCM', icon: '💯', requirement: 1, type: 'quizzes' },
  { id: 'perfect-quiz-5', name: 'Perfectionniste', description: 'Obtiens 100% à 5 QCM', icon: '⭐', requirement: 5, type: 'quizzes' },

  // Streak badges
  { id: 'streak-3', name: 'Régulier', description: 'Série de 3 jours', icon: '🔥', requirement: 3, type: 'streaks' },
  { id: 'streak-7', name: 'Semaine parfaite', description: 'Série de 7 jours', icon: '💪', requirement: 7, type: 'streaks' },
  { id: 'streak-14', name: 'Déterminé', description: 'Série de 14 jours', icon: '🌟', requirement: 14, type: 'streaks' },
  { id: 'streak-30', name: 'Inarrêtable', description: 'Série de 30 jours', icon: '🏅', requirement: 30, type: 'streaks' },

  // Special badges
  { id: 'pythagore', name: 'Disciple de Pythagore', description: 'Maîtrise le théorème de Pythagore', icon: '📐', requirement: 1, type: 'special' },
  { id: 'thales', name: 'Héritier de Thalès', description: 'Maîtrise le théorème de Thalès', icon: '📏', requirement: 1, type: 'special' },
  { id: 'points-1000', name: 'Millionnaire', description: 'Accumule 1000 points', icon: '💰', requirement: 1000, type: 'special' },
]

interface GamificationState {
  totalPoints: number
  pointsHistory: { date: string; points: number; reason: string }[]
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
  unlockedBadges: string[]
  achievements: { badgeId: string; unlockedAt: string }[]
  dailyActivities: {
    [date: string]: {
      lessonsCompleted: string[]
      exercisesCompleted: string[]
      quizzesCompleted: string[]
      flashcardsReviewed: string[]
      pointsEarned: number
    }
  }
  totalLessonsCompleted: number
  totalExercisesCompleted: number
  totalQuizzesCompleted: number
  totalCorrectAnswers: number
  totalPerfectQuizzes: number

  // Défis hebdomadaires
  weeklyStartDate: string | null
  weeklyChallenges: ActiveChallenge[]
  sideQuests: ActiveSideQuest[]

  addPoints: (points: number, reason: string) => void
  spendXP: (amount: number, reason: string) => boolean
  getSpendableXP: () => number
  updateStreak: () => void
  checkBadges: () => string[]
  recordActivity: (type: 'lesson' | 'exercise' | 'quiz' | 'flashcard', id: string) => void
  incrementStat: (stat: 'lessons' | 'exercises' | 'quizzes' | 'correctAnswers' | 'perfectQuizzes') => void
  getLevel: () => { level: number; title: string; currentXP: number; nextLevelXP: number; progress: number }
  getBadgesWithStatus: () => Array<Badge & { unlockedAt?: string }>
  exportData: () => string
  importData: (data: string) => boolean

  // Défis
  checkAndRefreshWeeklyChallenges: () => void
  updateChallengeProgress: (type: string, amount?: number) => void
  claimChallengeReward: (challengeId: string) => boolean
  claimSideQuestReward: (questId: string) => boolean
  resetAllData: () => void
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      totalPoints: 0,
      pointsHistory: [],
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      unlockedBadges: [],
      achievements: [],
      dailyActivities: {},
      totalLessonsCompleted: 0,
      totalExercisesCompleted: 0,
      totalQuizzesCompleted: 0,
      totalCorrectAnswers: 0,
      totalPerfectQuizzes: 0,
      weeklyStartDate: null,
      weeklyChallenges: [],
      sideQuests: SIDE_QUESTS.map(q => ({ ...q, progress: 0, completed: false, claimed: false })),

      addPoints: (points, reason) => {
        const today = new Date().toISOString().split('T')[0]
        set((state) => ({
          totalPoints: state.totalPoints + points,
          pointsHistory: [
            ...state.pointsHistory.slice(-99),
            { date: today, points, reason }
          ],
          dailyActivities: {
            ...state.dailyActivities,
            [today]: {
              ...state.dailyActivities[today],
              pointsEarned: (state.dailyActivities[today]?.pointsEarned || 0) + points,
            }
          }
        }))
        get().updateStreak()
        get().checkBadges()
      },

      spendXP: (amount, reason) => {
        const spendable = get().getSpendableXP()
        if (amount > spendable || amount <= 0) return false

        const today = new Date().toISOString().split('T')[0]
        set((state) => ({
          totalPoints: state.totalPoints - amount,
          pointsHistory: [
            ...state.pointsHistory.slice(-99),
            { date: today, points: -amount, reason }
          ]
        }))
        return true
      },

      getSpendableXP: () => {
        const { totalPoints } = get()
        const levelInfo = get().getLevel()
        // Les XP dépensables sont ceux au-delà du seuil du niveau actuel
        // Le seuil cumulatif pour le niveau N est: sum(1 to N-1) * 100 = (N-1)*N/2 * 100
        // Mais avec la logique actuelle: niveau * 100
        const levelThreshold = levelInfo.level * 100
        return Math.max(0, totalPoints - levelThreshold)
      },

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0]
        const { lastActivityDate, currentStreak, longestStreak } = get()

        if (lastActivityDate === today) return

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]

        let newStreak = 1
        if (lastActivityDate === yesterdayStr) {
          newStreak = currentStreak + 1
        }

        set({
          currentStreak: newStreak,
          longestStreak: Math.max(longestStreak, newStreak),
          lastActivityDate: today,
        })

        if (newStreak === 7) {
          get().addPoints(POINTS.STREAK_BONUS_7, 'Bonus série 7 jours')
        } else if (newStreak === 30) {
          get().addPoints(POINTS.STREAK_BONUS_30, 'Bonus série 30 jours')
        }
      },

      checkBadges: () => {
        const state = get()
        const newlyUnlocked: string[] = []

        BADGES.forEach((badge) => {
          if (state.unlockedBadges.includes(badge.id)) return

          let shouldUnlock = false

          switch (badge.type) {
            case 'lessons':
              shouldUnlock = state.totalLessonsCompleted >= badge.requirement
              break
            case 'exercises':
              shouldUnlock = state.totalExercisesCompleted >= badge.requirement
              break
            case 'quizzes':
              shouldUnlock = state.totalQuizzesCompleted >= badge.requirement
              break
            case 'streaks':
              shouldUnlock = state.currentStreak >= badge.requirement
              break
            case 'special':
              if (badge.id === 'points-1000') {
                shouldUnlock = state.totalPoints >= 1000
              }
              break
          }

          if (shouldUnlock) {
            newlyUnlocked.push(badge.id)
          }
        })

        if (newlyUnlocked.length > 0) {
          const now = new Date().toISOString()
          set((state) => ({
            unlockedBadges: [...state.unlockedBadges, ...newlyUnlocked],
            achievements: [
              ...state.achievements,
              ...newlyUnlocked.map((id) => ({ badgeId: id, unlockedAt: now }))
            ]
          }))
        }

        return newlyUnlocked
      },

      recordActivity: (type, id) => {
        const today = new Date().toISOString().split('T')[0]
        set((state) => {
          const todayActivities = state.dailyActivities[today] || {
            lessonsCompleted: [],
            exercisesCompleted: [],
            quizzesCompleted: [],
            flashcardsReviewed: [],
            pointsEarned: 0,
          }

          const key = `${type}sCompleted` as keyof typeof todayActivities
          if (key === 'pointsEarned') return state

          const currentList = todayActivities[key] as string[]
          if (currentList.includes(id)) return state

          return {
            dailyActivities: {
              ...state.dailyActivities,
              [today]: {
                ...todayActivities,
                [key]: [...currentList, id],
              }
            }
          }
        })
      },

      incrementStat: (stat) => {
        set((state) => {
          switch (stat) {
            case 'lessons':
              return { totalLessonsCompleted: state.totalLessonsCompleted + 1 }
            case 'exercises':
              return { totalExercisesCompleted: state.totalExercisesCompleted + 1 }
            case 'quizzes':
              return { totalQuizzesCompleted: state.totalQuizzesCompleted + 1 }
            case 'correctAnswers':
              return { totalCorrectAnswers: state.totalCorrectAnswers + 1 }
            case 'perfectQuizzes':
              return { totalPerfectQuizzes: state.totalPerfectQuizzes + 1 }
            default:
              return state
          }
        })
      },

      getLevel: () => {
        const { totalPoints } = get()
        const getLevelThreshold = (level: number) => level * 100
        const LEVEL_TITLES = [
          'Débutant',
          'Apprenti',
          'Initié',
          'Calculateur',
          'Géomètre',
          'Algébriste',
          'Statisticien',
          'Mathématicien',
          'Expert',
          'Prodige des maths'
        ]

        let level = 1
        let remainingXP = totalPoints

        while (remainingXP >= getLevelThreshold(level)) {
          remainingXP -= getLevelThreshold(level)
          level++
        }

        const currentXP = remainingXP
        const nextLevelXP = getLevelThreshold(level)
        const progress = Math.min(100, (currentXP / nextLevelXP) * 100)
        const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)]

        return { level, title, currentXP, nextLevelXP, progress }
      },

      getBadgesWithStatus: () => {
        const { achievements } = get()
        return BADGES.map((badge) => {
          const achievement = achievements.find((a) => a.badgeId === badge.id)
          return {
            ...badge,
            unlockedAt: achievement?.unlockedAt,
          }
        })
      },

      exportData: () => {
        const state = get()
        return JSON.stringify({
          totalPoints: state.totalPoints,
          pointsHistory: state.pointsHistory,
          currentStreak: state.currentStreak,
          longestStreak: state.longestStreak,
          lastActivityDate: state.lastActivityDate,
          unlockedBadges: state.unlockedBadges,
          achievements: state.achievements,
          dailyActivities: state.dailyActivities,
          totalLessonsCompleted: state.totalLessonsCompleted,
          totalExercisesCompleted: state.totalExercisesCompleted,
          totalQuizzesCompleted: state.totalQuizzesCompleted,
          totalCorrectAnswers: state.totalCorrectAnswers,
          totalPerfectQuizzes: state.totalPerfectQuizzes,
          weeklyStartDate: state.weeklyStartDate,
          weeklyChallenges: state.weeklyChallenges,
          sideQuests: state.sideQuests,
        }, null, 2)
      },

      importData: (data: string) => {
        try {
          const parsed = JSON.parse(data)
          set({
            totalPoints: parsed.totalPoints || 0,
            pointsHistory: parsed.pointsHistory || [],
            currentStreak: parsed.currentStreak || 0,
            longestStreak: parsed.longestStreak || 0,
            lastActivityDate: parsed.lastActivityDate || null,
            unlockedBadges: parsed.unlockedBadges || [],
            achievements: parsed.achievements || [],
            dailyActivities: parsed.dailyActivities || {},
            totalLessonsCompleted: parsed.totalLessonsCompleted || 0,
            totalExercisesCompleted: parsed.totalExercisesCompleted || 0,
            totalQuizzesCompleted: parsed.totalQuizzesCompleted || 0,
            totalCorrectAnswers: parsed.totalCorrectAnswers || 0,
            totalPerfectQuizzes: parsed.totalPerfectQuizzes || 0,
            weeklyStartDate: parsed.weeklyStartDate || null,
            weeklyChallenges: parsed.weeklyChallenges || [],
            sideQuests: parsed.sideQuests || SIDE_QUESTS.map(q => ({ ...q, progress: 0, completed: false, claimed: false })),
          })
          return true
        } catch {
          return false
        }
      },

      checkAndRefreshWeeklyChallenges: () => {
        const currentWeekStart = getWeekStartDate()
        const { weeklyStartDate } = get()

        if (weeklyStartDate !== currentWeekStart) {
          // Nouvelle semaine, générer de nouveaux défis
          const newChallenges = generateWeeklyChallenges(5).map(c => ({
            ...c,
            progress: 0,
            completed: false,
            claimed: false
          }))

          set({
            weeklyStartDate: currentWeekStart,
            weeklyChallenges: newChallenges
          })
        }
      },

      updateChallengeProgress: (type: string, amount = 1) => {
        const { weeklyChallenges, sideQuests, currentStreak, totalLessonsCompleted, totalExercisesCompleted, totalQuizzesCompleted, totalPerfectQuizzes } = get()

        // Mise à jour des défis hebdomadaires
        const updatedChallenges = weeklyChallenges.map(challenge => {
          if (challenge.completed) return challenge

          let newProgress = challenge.progress

          if (challenge.type === type) {
            newProgress = challenge.progress + amount
          } else if (challenge.type === 'streak' && type === 'streak') {
            newProgress = currentStreak
          }

          const completed = newProgress >= challenge.target
          return { ...challenge, progress: Math.min(newProgress, challenge.target), completed }
        })

        // Mise à jour des quêtes secondaires
        const updatedQuests = sideQuests.map(quest => {
          if (quest.completed) return quest

          let newProgress = quest.progress

          switch (quest.type) {
            case 'exercises':
              newProgress = totalExercisesCompleted
              break
            case 'lessons':
              newProgress = totalLessonsCompleted
              break
            case 'quizzes':
              newProgress = totalQuizzesCompleted
              break
            case 'perfect':
              newProgress = totalPerfectQuizzes
              break
            case 'streak':
              newProgress = currentStreak
              break
            case 'shop':
              // Géré séparément via petStore
              break
            case 'special':
              // Géré séparément selon le contexte
              break
          }

          const completed = newProgress >= quest.target
          return { ...quest, progress: Math.min(newProgress, quest.target), completed }
        })

        set({
          weeklyChallenges: updatedChallenges,
          sideQuests: updatedQuests
        })
      },

      claimChallengeReward: (challengeId: string) => {
        const { weeklyChallenges } = get()
        const challenge = weeklyChallenges.find(c => c.id === challengeId)

        if (!challenge || !challenge.completed || challenge.claimed) return false

        const updatedChallenges = weeklyChallenges.map(c =>
          c.id === challengeId ? { ...c, claimed: true } : c
        )

        set({ weeklyChallenges: updatedChallenges })
        get().addPoints(challenge.reward, `Défi: ${challenge.title}`)
        return true
      },

      claimSideQuestReward: (questId: string) => {
        const { sideQuests, unlockedBadges } = get()
        const quest = sideQuests.find(q => q.id === questId)

        if (!quest || !quest.completed || quest.claimed) return false

        const updatedQuests = sideQuests.map(q =>
          q.id === questId ? { ...q, claimed: true } : q
        )

        // Débloquer le badge si présent
        let newBadges = unlockedBadges
        if (quest.badgeId && !unlockedBadges.includes(quest.badgeId)) {
          newBadges = [...unlockedBadges, quest.badgeId]
        }

        set({
          sideQuests: updatedQuests,
          unlockedBadges: newBadges
        })
        get().addPoints(quest.reward, `Quête: ${quest.title}`)
        return true
      },

      resetAllData: () => {
        set({
          totalPoints: 0,
          pointsHistory: [],
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: null,
          unlockedBadges: [],
          achievements: [],
          dailyActivities: {},
          totalLessonsCompleted: 0,
          totalExercisesCompleted: 0,
          totalQuizzesCompleted: 0,
          totalCorrectAnswers: 0,
          totalPerfectQuizzes: 0,
          weeklyStartDate: null,
          weeklyChallenges: [],
          sideQuests: SIDE_QUESTS.map(q => ({ ...q, progress: 0, completed: false, claimed: false })),
        })
      },
    }),
    {
      name: 'maths3-gamification',
    }
  )
)
