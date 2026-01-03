'use client'

import { useState } from 'react'
import { pets, petCategories, getPetStage, getStageName } from '@/data/pets'
import { usePetStore } from '@/stores/petStore'
import { useGamificationStore } from '@/stores/gamificationStore'

interface PetSelectorProps {
  onClose?: () => void
}

export default function PetSelector({ onClose }: PetSelectorProps) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)
  const [petName, setPetName] = useState('')
  const [step, setStep] = useState<'select' | 'name'>('select')

  const choosePet = usePetStore((state) => state.choosePet)
  const levelInfo = useGamificationStore((state) => state.getLevel())
  const currentStage = getPetStage(levelInfo.level)

  const selectedPet = pets.find(p => p.id === selectedPetId)

  const handleSelectPet = (petId: string) => {
    setSelectedPetId(petId)
  }

  const handleContinue = () => {
    if (selectedPetId) {
      setStep('name')
    }
  }

  const handleConfirm = () => {
    if (selectedPetId && petName.trim()) {
      choosePet(selectedPetId, petName.trim())
      onClose?.()
    }
  }

  const handleBack = () => {
    setStep('select')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        {step === 'select' ? (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Choisis ton compagnon ! 🐾
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Il t&apos;accompagnera tout au long de tes révisions
              </p>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {petCategories.map((category) => (
                <div key={category.id} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <span>{category.emoji}</span>
                    <span>{category.name}</span>
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {pets
                      .filter(pet => pet.category === category.id)
                      .map((pet) => (
                        <button
                          key={pet.id}
                          onClick={() => handleSelectPet(pet.id)}
                          className={`
                            p-4 rounded-xl border-2 transition-all duration-200
                            flex flex-col items-center gap-2
                            ${selectedPetId === pet.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-105'
                              : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }
                          `}
                        >
                          <span className="text-4xl">
                            {pet.stages[currentStage]}
                          </span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {pet.name}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              {selectedPet && (
                <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{selectedPet.stages[currentStage]}</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedPet.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedPet.description}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Stade actuel : {getStageName(currentStage)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={handleContinue}
                disabled={!selectedPetId}
                className={`
                  w-full py-3 rounded-xl font-semibold text-lg transition-all
                  ${selectedPetId
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Continuer →
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Comment s&apos;appelle ton compagnon ? ✨
              </h2>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <span className="text-8xl mb-4 animate-bounce">
                  {selectedPet?.stages[currentStage]}
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedPet?.name} - {getStageName(currentStage)}
                </p>
              </div>

              <div className="max-w-sm mx-auto">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom de ton compagnon
                </label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Ex: Pythagore, Euler, Félix..."
                  maxLength={20}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:border-blue-500 focus:outline-none transition-colors
                    placeholder:text-gray-400"
                  autoFocus
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
                  {petName.length}/20 caractères
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                ← Retour
              </button>
              <button
                onClick={handleConfirm}
                disabled={!petName.trim()}
                className={`
                  flex-1 py-3 rounded-xl font-semibold text-lg transition-all
                  ${petName.trim()
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                C&apos;est parti ! 🎉
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
