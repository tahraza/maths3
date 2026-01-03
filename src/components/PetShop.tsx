'use client'

import { useState } from 'react'
import { shopItems, itemCategories } from '@/data/pets'
import { usePetStore, EquippedItems } from '@/stores/petStore'

interface PetShopProps {
  onClose: () => void
}

export default function PetShop({ onClose }: PetShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('hat')
  const [purchaseMessage, setPurchaseMessage] = useState<{ text: string; success: boolean } | null>(null)

  const ownedItems = usePetStore((state) => state.ownedItems)
  const equippedItems = usePetStore((state) => state.equippedItems)
  const buyItem = usePetStore((state) => state.buyItem)
  const equipItem = usePetStore((state) => state.equipItem)
  const unequipItem = usePetStore((state) => state.unequipItem)
  const getSpendableXP = usePetStore((state) => state.getSpendableXP)
  const canAfford = usePetStore((state) => state.canAfford)

  const spendableXP = getSpendableXP()

  const filteredItems = shopItems.filter(item => item.category === selectedCategory)

  const handleBuy = (itemId: string) => {
    const item = shopItems.find(i => i.id === itemId)
    if (!item) return

    const success = buyItem(itemId)
    if (success) {
      setPurchaseMessage({ text: `${item.name} acheté ! 🎉`, success: true })
    } else {
      setPurchaseMessage({ text: `Pas assez d'XP pour ${item.name}`, success: false })
    }
    setTimeout(() => setPurchaseMessage(null), 2000)
  }

  const handleEquipToggle = (itemId: string, category: keyof EquippedItems) => {
    if (equippedItems[category] === itemId) {
      unequipItem(category)
    } else {
      equipItem(itemId)
    }
  }

  const isOwned = (itemId: string) => ownedItems.includes(itemId)
  const isEquipped = (itemId: string, category: keyof EquippedItems) => equippedItems[category] === itemId

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>🛒</span>
              <span>Boutique</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Personnalise ton compagnon !
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">XP disponibles</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{spendableXP} ⭐</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>

        {/* Purchase message */}
        {purchaseMessage && (
          <div
            className={`
              mx-6 mt-4 p-3 rounded-lg text-center font-medium
              ${purchaseMessage.success
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
              }
            `}
          >
            {purchaseMessage.text}
          </div>
        )}

        {/* Category tabs */}
        <div className="px-6 pt-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {itemCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                <span className="mr-1">{category.emoji}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Items grid */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const owned = isOwned(item.id)
              const equipped = isEquipped(item.id, item.category as keyof EquippedItems)
              const affordable = canAfford(item.price)

              return (
                <div
                  key={item.id}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all
                    ${equipped
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : owned
                        ? 'border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700'
                    }
                  `}
                >
                  {/* Owned/Equipped badge */}
                  {equipped && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Équipé
                    </span>
                  )}
                  {owned && !equipped && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Possédé
                    </span>
                  )}

                  {/* Item display */}
                  <div className="text-center mb-3">
                    <span className="text-5xl">{item.emoji}</span>
                  </div>

                  <h4 className="font-semibold text-gray-900 dark:text-white text-center text-sm mb-1">
                    {item.name}
                  </h4>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Action button */}
                  {owned ? (
                    <button
                      onClick={() => handleEquipToggle(item.id, item.category as keyof EquippedItems)}
                      className={`
                        w-full py-2 rounded-lg font-medium text-sm transition-colors
                        ${equipped
                          ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                          : 'bg-green-500 text-white hover:bg-green-600'
                        }
                      `}
                    >
                      {equipped ? 'Retirer' : 'Équiper'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuy(item.id)}
                      disabled={!affordable}
                      className={`
                        w-full py-2 rounded-lg font-medium text-sm transition-colors
                        ${affordable
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-500 hover:to-orange-500'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      {item.price} ⭐
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Aucun item dans cette catégorie
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            💡 Astuce : Les XP que tu dépenses sont ceux au-delà de ton niveau actuel.
            Tu ne perdras jamais de niveau !
          </p>
        </div>
      </div>
    </div>
  )
}
