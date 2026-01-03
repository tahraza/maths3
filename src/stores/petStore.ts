import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { pets, shopItems, getPetStage } from '@/data/pets'
import { useGamificationStore } from './gamificationStore'
import { CHARACTERISTICS, CharacteristicType } from '@/data/challenges'

export interface EquippedItems {
  hat: string | null
  glasses: string | null
  necklace: string | null
  outfit: string | null
  background: string | null
  effect: string | null
}

export interface PetCharacteristics {
  happiness: number
  energy: number
  intelligence: number
  courage: number
  wisdom: number
}

export interface UnlockedPerk {
  characteristic: CharacteristicType
  level: number
  description: string
  type: 'cosmetic' | 'bonus' | 'feature'
}

interface PetState {
  // État du compagnon
  selectedPet: string | null
  petName: string
  ownedItems: string[]
  equippedItems: EquippedItems
  characteristics: PetCharacteristics
  freeHintsUsedToday: number
  lastHintResetDate: string | null

  // Actions
  choosePet: (petId: string, name: string) => void
  renamePet: (name: string) => void
  buyItem: (itemId: string) => boolean
  equipItem: (itemId: string) => void
  unequipItem: (category: keyof EquippedItems) => void
  updateCharacteristic: (stat: CharacteristicType, amount: number) => void
  useFreeHint: () => boolean
  resetPet: () => void

  // Getters
  getPet: () => typeof pets[0] | null
  getEquippedItemsData: () => typeof shopItems
  canAfford: (price: number) => boolean
  getSpendableXP: () => number
  getUnlockedPerks: () => UnlockedPerk[]
  getXPBonus: (type: 'exercises' | 'flashcards' | 'reviews') => number
  getFreeHintsAvailable: () => number
  exportData: () => string
  importData: (data: string) => boolean
}

export const usePetStore = create<PetState>()(
  persist(
    (set, get) => ({
      selectedPet: null,
      petName: '',
      ownedItems: [],
      equippedItems: {
        hat: null,
        glasses: null,
        necklace: null,
        outfit: null,
        background: null,
        effect: null
      },
      characteristics: {
        happiness: 0,
        energy: 0,
        intelligence: 0,
        courage: 0,
        wisdom: 0
      },
      freeHintsUsedToday: 0,
      lastHintResetDate: null,

      choosePet: (petId: string, name: string) => {
        set({ selectedPet: petId, petName: name })
      },

      renamePet: (name: string) => {
        set({ petName: name })
      },

      buyItem: (itemId: string) => {
        const item = shopItems.find(i => i.id === itemId)
        if (!item) return false

        const spendableXP = get().getSpendableXP()
        if (spendableXP < item.price) return false

        // Vérifier si déjà possédé
        if (get().ownedItems.includes(itemId)) return false

        // Dépenser les XP via le gamification store
        const gamificationStore = useGamificationStore.getState()
        gamificationStore.spendXP(item.price, `Achat : ${item.name}`)

        // Ajouter l'item aux possessions
        set(state => ({
          ownedItems: [...state.ownedItems, itemId]
        }))

        return true
      },

      equipItem: (itemId: string) => {
        const item = shopItems.find(i => i.id === itemId)
        if (!item) return

        // Vérifier si l'item est possédé
        if (!get().ownedItems.includes(itemId)) return

        set(state => ({
          equippedItems: {
            ...state.equippedItems,
            [item.category]: itemId
          }
        }))
      },

      unequipItem: (category: keyof EquippedItems) => {
        set(state => ({
          equippedItems: {
            ...state.equippedItems,
            [category]: null
          }
        }))
      },

      getPet: () => {
        const petId = get().selectedPet
        if (!petId) return null
        return pets.find(p => p.id === petId) || null
      },

      getEquippedItemsData: () => {
        const equipped = get().equippedItems
        const items: typeof shopItems = []

        Object.values(equipped).forEach(itemId => {
          if (itemId) {
            const item = shopItems.find(i => i.id === itemId)
            if (item) items.push(item)
          }
        })

        return items
      },

      canAfford: (price: number) => {
        return get().getSpendableXP() >= price
      },

      getSpendableXP: () => {
        const gamificationStore = useGamificationStore.getState()
        const totalPoints = gamificationStore.totalPoints
        const levelInfo = gamificationStore.getLevel()

        // Les XP dépensables sont ceux au-delà du seuil du niveau actuel
        // Niveau N requiert N * 100 XP cumulatifs
        const levelThreshold = levelInfo.level * 100

        return Math.max(0, totalPoints - levelThreshold)
      },

      updateCharacteristic: (stat: CharacteristicType, amount: number) => {
        set(state => ({
          characteristics: {
            ...state.characteristics,
            [stat]: Math.min(100, Math.max(0, state.characteristics[stat] + amount))
          }
        }))
      },

      useFreeHint: () => {
        const today = new Date().toISOString().split('T')[0]
        const { lastHintResetDate, freeHintsUsedToday } = get()

        // Reset si nouveau jour
        if (lastHintResetDate !== today) {
          set({ freeHintsUsedToday: 0, lastHintResetDate: today })
        }

        const available = get().getFreeHintsAvailable()
        if (available <= 0) return false

        set(state => ({ freeHintsUsedToday: state.freeHintsUsedToday + 1 }))
        return true
      },

      resetPet: () => {
        set({
          selectedPet: null,
          petName: '',
          ownedItems: [],
          equippedItems: {
            hat: null,
            glasses: null,
            necklace: null,
            outfit: null,
            background: null,
            effect: null
          },
          characteristics: {
            happiness: 0,
            energy: 0,
            intelligence: 0,
            courage: 0,
            wisdom: 0
          },
          freeHintsUsedToday: 0,
          lastHintResetDate: null
        })
      },

      getUnlockedPerks: () => {
        const { characteristics } = get()
        const perks: UnlockedPerk[] = []

        for (const [key, config] of Object.entries(CHARACTERISTICS)) {
          const charKey = key as CharacteristicType
          const value = characteristics[charKey]

          for (const perk of config.perks) {
            if (value >= perk.level) {
              perks.push({
                characteristic: charKey,
                level: perk.level,
                description: perk.description,
                type: perk.type
              })
            }
          }
        }

        return perks
      },

      getXPBonus: (type: 'exercises' | 'flashcards' | 'reviews') => {
        const { characteristics } = get()

        if (type === 'exercises') {
          const energy = characteristics.energy
          if (energy >= 100) return 0.20
          if (energy >= 75) return 0.15
          if (energy >= 50) return 0.10
          if (energy >= 25) return 0.05
          return 0
        }

        if (type === 'flashcards') {
          const wisdom = characteristics.wisdom
          if (wisdom >= 100) return 0.20 // Double XP = +100%, mais on met 20% pour cohérence
          if (wisdom >= 75) return 0.15
          if (wisdom >= 50) return 0.10
          if (wisdom >= 25) return 0.05
          return 0
        }

        if (type === 'reviews') {
          const wisdom = characteristics.wisdom
          if (wisdom >= 100) return 1.0 // Double XP pour révisions
          return 0
        }

        return 0
      },

      getFreeHintsAvailable: () => {
        const today = new Date().toISOString().split('T')[0]
        const { lastHintResetDate, freeHintsUsedToday, characteristics } = get()

        // Reset quotidien
        const usedToday = lastHintResetDate === today ? freeHintsUsedToday : 0

        const intelligence = characteristics.intelligence
        let maxHints = 0
        if (intelligence >= 100) maxHints = 999 // Illimité
        else if (intelligence >= 75) maxHints = 3
        else if (intelligence >= 50) maxHints = 2
        else if (intelligence >= 25) maxHints = 1

        return Math.max(0, maxHints - usedToday)
      },

      exportData: () => {
        const state = get()
        return JSON.stringify({
          selectedPet: state.selectedPet,
          petName: state.petName,
          ownedItems: state.ownedItems,
          equippedItems: state.equippedItems,
          characteristics: state.characteristics,
        }, null, 2)
      },

      importData: (data: string) => {
        try {
          const parsed = JSON.parse(data)
          set({
            selectedPet: parsed.selectedPet || null,
            petName: parsed.petName || '',
            ownedItems: parsed.ownedItems || [],
            equippedItems: parsed.equippedItems || {
              hat: null, glasses: null, necklace: null,
              outfit: null, background: null, effect: null
            },
            characteristics: parsed.characteristics || {
              happiness: 0, energy: 0, intelligence: 0,
              courage: 0, wisdom: 0
            },
          })
          return true
        } catch {
          return false
        }
      }
    }),
    {
      name: 'maths3-pet',
    }
  )
)

// Hook utilitaire pour obtenir le stade actuel du pet
export function usePetStage(): 'baby' | 'teen' | 'adult' {
  const gamificationStore = useGamificationStore()
  const levelInfo = gamificationStore.getLevel()
  return getPetStage(levelInfo.level)
}
