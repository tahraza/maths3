'use client'

import { usePetStore, usePetStage } from '@/stores/petStore'
import { useGamificationStore } from '@/stores/gamificationStore'
import { shopItems, getStageName, getPetStage } from '@/data/pets'
import { CHARACTERISTICS } from '@/data/challenges'

interface PetCompanionProps {
  onOpenShop?: () => void
  onChangePet?: () => void
  compact?: boolean
}

export default function PetCompanion({ onOpenShop, onChangePet, compact = false }: PetCompanionProps) {
  const selectedPet = usePetStore((state) => state.selectedPet)
  const petName = usePetStore((state) => state.petName)
  const getPet = usePetStore((state) => state.getPet)
  const equippedItems = usePetStore((state) => state.equippedItems)
  const getSpendableXP = usePetStore((state) => state.getSpendableXP)
  const characteristics = usePetStore((state) => state.characteristics)

  const totalPoints = useGamificationStore((state) => state.totalPoints)
  const levelInfo = useGamificationStore((state) => state.getLevel())
  const stage = usePetStage()
  const pet = getPet()
  const spendableXP = getSpendableXP()

  if (!selectedPet || !pet) {
    return null
  }

  // Calculate next evolution info
  const getNextEvolution = () => {
    if (stage === 'adult') return null

    const nextStage = stage === 'baby' ? 'teen' : 'adult'
    const nextLevel = stage === 'baby' ? 4 : 7

    // Calculate XP needed for next level
    let xpNeeded = 0
    let currentXP = totalPoints
    for (let lvl = 1; lvl < nextLevel; lvl++) {
      const threshold = lvl * 100
      if (currentXP >= threshold) {
        currentXP -= threshold
      } else {
        xpNeeded += threshold - currentXP
        currentXP = 0
      }
    }
    if (currentXP < nextLevel * 100) {
      xpNeeded = (nextLevel * 100) - currentXP
    }

    // Simple calculation: XP until reaching next evolution level
    const xpForNextLevel = nextLevel * (nextLevel + 1) / 2 * 100
    const xpRemaining = Math.max(0, xpForNextLevel - totalPoints)

    return {
      stage: nextStage,
      emoji: pet.stages[nextStage],
      stageName: getStageName(nextStage),
      levelRequired: nextLevel,
      xpRemaining
    }
  }

  const nextEvolution = getNextEvolution()

  // Get equipped item data
  const equippedItemsData = {
    hat: equippedItems.hat ? shopItems.find(i => i.id === equippedItems.hat) : null,
    glasses: equippedItems.glasses ? shopItems.find(i => i.id === equippedItems.glasses) : null,
    necklace: equippedItems.necklace ? shopItems.find(i => i.id === equippedItems.necklace) : null,
    outfit: equippedItems.outfit ? shopItems.find(i => i.id === equippedItems.outfit) : null,
    background: equippedItems.background ? shopItems.find(i => i.id === equippedItems.background) : null,
    effect: equippedItems.effect ? shopItems.find(i => i.id === equippedItems.effect) : null,
  }

  // Animation class based on happiness
  const getAnimationClass = () => {
    if (characteristics.happiness >= 75) return 'animate-bounce'
    if (characteristics.happiness >= 50) return 'animate-pulse'
    return ''
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
        <div className="relative">
          <span className={`text-4xl ${getAnimationClass()}`}>{pet.stages[stage]}</span>
          {equippedItemsData.hat && (
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl">
              {equippedItemsData.hat.emoji}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white truncate">{petName}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Niv. {levelInfo.level} • {spendableXP} XP dispo
          </p>
        </div>
        {onOpenShop && (
          <button
            onClick={onOpenShop}
            className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow transition-shadow"
          >
            🛒
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-pink-900/30 rounded-2xl p-6 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>🐾</span>
            <span>Mon Compagnon</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {pet.name} • {getStageName(stage)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Niveau {levelInfo.level}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400">
            {spendableXP} XP à dépenser
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Pet Display Area */}
        <div
          className={`
            relative mx-auto w-48 h-48 rounded-2xl flex items-center justify-center
            ${equippedItemsData.background
              ? 'bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800'
              : 'bg-white/50 dark:bg-gray-800/50'
            }
          `}
        >
          {/* Background emoji */}
          {equippedItemsData.background && (
            <span className="absolute inset-0 flex items-center justify-center text-8xl opacity-30">
              {equippedItemsData.background.emoji}
            </span>
          )}

          {/* Effect layer */}
          {equippedItemsData.effect && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <span className="text-6xl opacity-50">{equippedItemsData.effect.emoji}</span>
            </div>
          )}

          {/* Happiness hearts effect */}
          {characteristics.happiness >= 50 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="absolute top-2 right-2 text-xl animate-ping">💕</span>
              {characteristics.happiness >= 75 && (
                <span className="absolute top-4 left-2 text-lg animate-ping delay-300">💖</span>
              )}
            </div>
          )}

          {/* Pet container */}
          <div className="relative z-10">
            {/* Hat */}
            {equippedItemsData.hat && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl">
                {equippedItemsData.hat.emoji}
              </span>
            )}

            {/* Glasses */}
            {equippedItemsData.glasses && (
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-2xl">
                {equippedItemsData.glasses.emoji}
              </span>
            )}

            {/* Pet emoji with animation */}
            <span className={`text-7xl relative z-0 ${getAnimationClass()}`}>
              {pet.stages[stage]}
            </span>

            {/* Necklace */}
            {equippedItemsData.necklace && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl">
                {equippedItemsData.necklace.emoji}
              </span>
            )}

            {/* Outfit indicator */}
            {equippedItemsData.outfit && (
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xl">
                {equippedItemsData.outfit.emoji}
              </span>
            )}
          </div>
        </div>

        {/* Characteristics */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
            Caractéristiques
          </h4>
          {Object.entries(CHARACTERISTICS).map(([key, config]) => {
            const value = characteristics[key as keyof typeof characteristics]
            return (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <span>{config.emoji}</span>
                    <span className="text-gray-600 dark:text-gray-400">{config.name}</span>
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{value}/100</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      config.color === 'pink' ? 'bg-pink-500' :
                      config.color === 'yellow' ? 'bg-yellow-500' :
                      config.color === 'blue' ? 'bg-blue-500' :
                      config.color === 'orange' ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pet Name & Title */}
      <div className="text-center mb-4">
        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{petName}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{levelInfo.title}</p>
      </div>

      {/* Next Evolution */}
      {nextEvolution && (
        <div className="mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{pet.stages[stage]}</span>
              <span className="text-gray-400">→</span>
              <span className="text-3xl opacity-60">{nextEvolution.emoji}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Prochaine évolution
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {nextEvolution.stageName} • Niveau {nextEvolution.levelRequired}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Encore {nextEvolution.xpRemaining} XP
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Equipped Items Summary */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {Object.entries(equippedItemsData).map(([category, item]) => (
          item && (
            <span
              key={category}
              className="px-2 py-1 bg-white/70 dark:bg-gray-700/70 rounded-full text-sm"
              title={item.name}
            >
              {item.emoji}
            </span>
          )
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {onOpenShop && (
          <button
            onClick={onOpenShop}
            className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-orange-400
              text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-orange-500
              transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>🛒</span>
            <span>Boutique</span>
          </button>
        )}
        {onChangePet && (
          <button
            onClick={onChangePet}
            className="py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
              font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title="Changer de compagnon"
          >
            🔄
          </button>
        )}
      </div>
    </div>
  )
}
