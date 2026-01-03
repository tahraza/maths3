'use client'

import { useEffect, useState } from 'react'
import { usePetMessageStore } from '@/stores/petMessageStore'
import { usePetStore } from '@/stores/petStore'

export default function PetMessage() {
  const isVisible = usePetMessageStore((state) => state.isVisible)
  const message = usePetMessageStore((state) => state.message)
  const storePetEmoji = usePetMessageStore((state) => state.petEmoji)
  const hideMessage = usePetMessageStore((state) => state.hideMessage)

  const getPet = usePetStore((state) => state.getPet)
  const selectedPet = usePetStore((state) => state.selectedPet)

  const [isAnimating, setIsAnimating] = useState(false)

  // Get the actual pet emoji
  const pet = getPet()
  const petEmoji = pet?.stages.baby || storePetEmoji

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
    } else {
      // Delay to allow exit animation
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!isAnimating && !isVisible) return null

  return (
    <div
      className={`
        fixed bottom-24 left-1/2 -translate-x-1/2 z-50
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <div
        className="
          bg-white dark:bg-gray-800
          rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-700
          px-5 py-4 max-w-sm
          flex items-start gap-3
        "
        onClick={hideMessage}
      >
        {/* Pet emoji with animation */}
        <div className="flex-shrink-0">
          <span className="text-4xl animate-bounce inline-block">
            {petEmoji}
          </span>
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-800 dark:text-gray-100 font-medium leading-snug">
            {message}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Touche pour fermer
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            hideMessage()
          }}
          className="
            flex-shrink-0 w-6 h-6
            flex items-center justify-center
            text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
            transition-colors
          "
        >
          ✕
        </button>
      </div>

      {/* Speech bubble tail */}
      <div
        className="
          absolute -bottom-2 left-1/2 -translate-x-1/2
          w-4 h-4 bg-white dark:bg-gray-800
          border-r-2 border-b-2 border-blue-200 dark:border-blue-700
          rotate-45
        "
      />
    </div>
  )
}
