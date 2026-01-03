'use client'

import { useEffect, useState } from 'react'
import { useGamificationStore, ActiveChallenge, ActiveSideQuest } from '@/stores/gamificationStore'
import { getTimeUntilReset } from '@/data/challenges'

export default function GamificationTab() {
  const weeklyChallenges = useGamificationStore((state) => state.weeklyChallenges)
  const sideQuests = useGamificationStore((state) => state.sideQuests)
  const checkAndRefreshWeeklyChallenges = useGamificationStore((state) => state.checkAndRefreshWeeklyChallenges)
  const claimChallengeReward = useGamificationStore((state) => state.claimChallengeReward)
  const claimSideQuestReward = useGamificationStore((state) => state.claimSideQuestReward)

  const [timeUntilReset, setTimeUntilReset] = useState(getTimeUntilReset())
  const [activeTab, setActiveTab] = useState<'weekly' | 'quests'>('weekly')

  // Refresh weekly challenges on mount
  useEffect(() => {
    checkAndRefreshWeeklyChallenges()
  }, [checkAndRefreshWeeklyChallenges])

  // Update countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilReset(getTimeUntilReset())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const handleClaimChallenge = (challengeId: string) => {
    claimChallengeReward(challengeId)
  }

  const handleClaimQuest = (questId: string) => {
    claimSideQuestReward(questId)
  }

  const renderChallenge = (challenge: ActiveChallenge) => {
    const progress = Math.min(100, (challenge.progress / challenge.target) * 100)

    return (
      <div
        key={challenge.id}
        className={`p-4 rounded-xl border-2 transition-all ${
          challenge.claimed
            ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60'
            : challenge.completed
              ? 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{challenge.emoji}</span>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {challenge.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {challenge.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              +{challenge.reward} XP
            </span>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">
              Progression
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {challenge.progress}/{challenge.target}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                challenge.completed ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {challenge.completed && !challenge.claimed && (
          <button
            onClick={() => handleClaimChallenge(challenge.id)}
            className="mt-3 w-full py-2 bg-gradient-to-r from-green-500 to-emerald-500
              text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600
              transition-all flex items-center justify-center gap-2"
          >
            <span>🎁</span>
            <span>Récupérer la récompense</span>
          </button>
        )}

        {challenge.claimed && (
          <div className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
            ✓ Récompense récupérée
          </div>
        )}
      </div>
    )
  }

  const renderSideQuest = (quest: ActiveSideQuest) => {
    const progress = Math.min(100, (quest.progress / quest.target) * 100)

    return (
      <div
        key={quest.id}
        className={`p-4 rounded-xl border-2 transition-all ${
          quest.claimed
            ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60'
            : quest.completed
              ? 'border-purple-400 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{quest.emoji}</span>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {quest.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {quest.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              +{quest.reward} XP
            </span>
            {quest.badgeId && (
              <p className="text-xs text-gray-500 dark:text-gray-400">+ Badge</p>
            )}
            {quest.itemReward && (
              <p className="text-xs text-gray-500 dark:text-gray-400">+ Item</p>
            )}
          </div>
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">
              Progression
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {quest.progress}/{quest.target}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                quest.completed ? 'bg-purple-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {quest.completed && !quest.claimed && (
          <button
            onClick={() => handleClaimQuest(quest.id)}
            className="mt-3 w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500
              text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600
              transition-all flex items-center justify-center gap-2"
          >
            <span>🎁</span>
            <span>Récupérer la récompense</span>
          </button>
        )}

        {quest.claimed && (
          <div className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
            ✓ Quête terminée
          </div>
        )}
      </div>
    )
  }

  // Count stats
  const completedChallenges = weeklyChallenges.filter(c => c.completed).length
  const claimedChallenges = weeklyChallenges.filter(c => c.claimed).length
  const completedQuests = sideQuests.filter(q => q.completed).length
  const claimedQuests = sideQuests.filter(q => q.claimed).length

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('weekly')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
            activeTab === 'weekly'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <span className="mr-2">🎯</span>
          Défis de la semaine
          {completedChallenges > claimedChallenges && (
            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {completedChallenges - claimedChallenges}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('quests')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
            activeTab === 'quests'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <span className="mr-2">🗺️</span>
          Quêtes
          {completedQuests > claimedQuests && (
            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {completedQuests - claimedQuests}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'weekly' && (
        <>
          {/* Timer */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Temps restant
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nouveaux défis chaque lundi
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {timeUntilReset.days}j {timeUntilReset.hours}h {timeUntilReset.minutes}m
                </div>
              </div>
            </div>
          </div>

          {/* Progress summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Défis complétés</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {completedChallenges}/{weeklyChallenges.length}
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                style={{ width: `${weeklyChallenges.length > 0 ? (completedChallenges / weeklyChallenges.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Challenges list */}
          <div className="space-y-4">
            {weeklyChallenges.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <span className="text-4xl block mb-2">🎯</span>
                <p>Les défis de la semaine arrivent...</p>
                <p className="text-sm">Reviens dans quelques instants !</p>
              </div>
            ) : (
              weeklyChallenges.map(renderChallenge)
            )}
          </div>
        </>
      )}

      {activeTab === 'quests' && (
        <>
          {/* Progress summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Quêtes terminées</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {claimedQuests}/{sideQuests.length}
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                style={{ width: `${sideQuests.length > 0 ? (claimedQuests / sideQuests.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Active quests */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span>🔥</span>
              <span>Quêtes en cours</span>
            </h3>
            <div className="space-y-4">
              {sideQuests.filter(q => !q.claimed).length === 0 ? (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  Toutes les quêtes sont terminées !
                </div>
              ) : (
                sideQuests.filter(q => !q.claimed).map(renderSideQuest)
              )}
            </div>
          </div>

          {/* Completed quests */}
          {claimedQuests > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span>✓</span>
                <span>Quêtes terminées ({claimedQuests})</span>
              </h3>
              <div className="space-y-4">
                {sideQuests.filter(q => q.claimed).map(renderSideQuest)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
