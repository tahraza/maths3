'use client'

import { useState, useEffect } from 'react'
import { Brain, RotateCcw, ChevronLeft, ChevronRight, Shuffle, Check, X, Calculator, Variable, Shapes, BarChart2 } from 'lucide-react'
import { flashcards, Flashcard } from '@/data/flashcards'
import { chapters } from '@/data/lessons'
import { cn } from '@/lib/utils'
import { BlockMath } from '@/components/KaTeX'
import { useGamificationStore, POINTS } from '@/stores/gamificationStore'

const chapterIcons = {
  nombres: Calculator,
  fonctions: Variable,
  geometrie: Shapes,
  statistiques: BarChart2,
}

export default function FlashcardsPage() {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([])
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set())
  const [unknownCards, setUnknownCards] = useState<Set<string>>(new Set())
  const { addPoints, incrementStat } = useGamificationStore()

  // Filtrer les cartes selon la sélection
  const filteredCards = flashcards.filter(card => {
    if (selectedChapter && card.chapterId !== selectedChapter) return false
    if (selectedCategory && card.category !== selectedCategory) return false
    return true
  })

  // Obtenir les catégories du chapitre sélectionné
  const categories = selectedChapter
    ? Array.from(new Set(flashcards.filter(c => c.chapterId === selectedChapter).map(c => c.category)))
    : []

  // Mélanger les cartes au chargement ou lors d'un changement de filtre
  useEffect(() => {
    shuffleCards()
  }, [selectedChapter, selectedCategory])

  const shuffleCards = () => {
    const cards = [...filteredCards].sort(() => Math.random() - 0.5)
    setShuffledCards(cards)
    setCurrentIndex(0)
    setIsFlipped(false)
    setKnownCards(new Set())
    setUnknownCards(new Set())
  }

  const currentCard = shuffledCards[currentIndex]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleKnown = () => {
    if (currentCard) {
      const newKnown = new Set(knownCards)
      newKnown.add(currentCard.id)
      setKnownCards(newKnown)

      const newUnknown = new Set(unknownCards)
      newUnknown.delete(currentCard.id)
      setUnknownCards(newUnknown)

      // Donner des points
      if (!knownCards.has(currentCard.id)) {
        addPoints(POINTS.FLASHCARD_REVIEWED, 'Flashcard maîtrisée')
        incrementStat('correctAnswers')
      }
    }
    handleNext()
  }

  const handleUnknown = () => {
    if (currentCard) {
      const newUnknown = new Set(unknownCards)
      newUnknown.add(currentCard.id)
      setUnknownCards(newUnknown)

      const newKnown = new Set(knownCards)
      newKnown.delete(currentCard.id)
      setKnownCards(newKnown)
    }
    handleNext()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleFlip()
    } else if (e.key === 'ArrowLeft') {
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      handleNext()
    } else if (e.key === 'ArrowUp') {
      handleKnown()
    } else if (e.key === 'ArrowDown') {
      handleUnknown()
    }
  }

  // Écran de sélection du chapitre
  if (!selectedChapter) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="flex items-center justify-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
              <Brain className="h-8 w-8 text-primary-600" />
              Flashcards
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Mémorise les formules et théorèmes essentiels du Brevet
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {chapters.map((chapter) => {
              const Icon = chapterIcons[chapter.id as keyof typeof chapterIcons]
              const chapterCards = flashcards.filter(c => c.chapterId === chapter.id)

              return (
                <button
                  key={chapter.id}
                  onClick={() => setSelectedChapter(chapter.id)}
                  className="card text-left transition-all hover:border-primary-300 hover:shadow-lg dark:hover:border-primary-700"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${chapter.color}-100 dark:bg-${chapter.color}-900/30`}>
                      <Icon className={`h-6 w-6 text-${chapter.color}-600 dark:text-${chapter.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {chapter.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {chapterCards.length} flashcards
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Option pour toutes les cartes */}
          <button
            onClick={() => {
              setSelectedChapter('all')
              setShuffledCards([...flashcards].sort(() => Math.random() - 0.5))
            }}
            className="mt-6 w-full card text-center transition-all hover:border-primary-300 hover:shadow-lg dark:hover:border-primary-700"
          >
            <div className="flex items-center justify-center gap-3">
              <Shuffle className="h-5 w-5 text-primary-600" />
              <span className="font-medium text-slate-900 dark:text-slate-100">
                Toutes les flashcards ({flashcards.length})
              </span>
            </div>
          </button>
        </div>
      </div>
    )
  }

  // Si un chapitre est sélectionné mais pas de catégorie, afficher les catégories
  if (selectedChapter !== 'all' && !selectedCategory && categories.length > 1) {
    const chapter = chapters.find(c => c.id === selectedChapter)
    const Icon = chapterIcons[selectedChapter as keyof typeof chapterIcons]

    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedChapter(null)}
            className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour aux chapitres
          </button>

          <div className="mb-8 text-center">
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-${chapter?.color}-100 dark:bg-${chapter?.color}-900/30`}>
              <Icon className={`h-8 w-8 text-${chapter?.color}-600 dark:text-${chapter?.color}-400`} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {chapter?.name}
            </h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              Choisis une catégorie
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => {
              const categoryCards = flashcards.filter(
                c => c.chapterId === selectedChapter && c.category === category
              )

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="card text-left transition-all hover:border-primary-300 hover:shadow-lg dark:hover:border-primary-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">
                        {category}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {categoryCards.length} cartes
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Option pour toutes les cartes du chapitre */}
          <button
            onClick={() => setSelectedCategory('all')}
            className="mt-4 w-full card text-center transition-all hover:border-primary-300 hover:shadow-lg dark:hover:border-primary-700"
          >
            <span className="font-medium text-slate-900 dark:text-slate-100">
              Toutes les cartes de ce chapitre ({filteredCards.length})
            </span>
          </button>
        </div>
      </div>
    )
  }

  // Affichage des flashcards
  if (shuffledCards.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-slate-600 dark:text-slate-400">Aucune flashcard disponible.</p>
          <button
            onClick={() => {
              setSelectedChapter(null)
              setSelectedCategory(null)
            }}
            className="mt-4 text-primary-600 hover:underline"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  const progress = ((currentIndex + 1) / shuffledCards.length) * 100
  const chapter = chapters.find(c => c.id === currentCard?.chapterId)

  return (
    <div
      className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => {
              if (selectedCategory) {
                setSelectedCategory(null)
              } else {
                setSelectedChapter(null)
              }
            }}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour
          </button>

          <button
            onClick={shuffleCards}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <Shuffle className="h-4 w-4" />
            Mélanger
          </button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Carte {currentIndex + 1} sur {shuffledCards.length}</span>
            <div className="flex gap-4">
              <span className="text-green-600 dark:text-green-400">
                ✓ {knownCards.size}
              </span>
              <span className="text-red-600 dark:text-red-400">
                ✗ {unknownCards.size}
              </span>
            </div>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-primary-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div
          onClick={handleFlip}
          className="perspective-1000 relative mb-6 cursor-pointer"
        >
          <div
            className={cn(
              'relative min-h-[300px] transition-transform duration-500',
              isFlipped && 'rotate-y-180'
            )}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div
              className={cn(
                'absolute inset-0 rounded-xl border-2 bg-white p-6 shadow-lg dark:bg-slate-800',
                'flex flex-col items-center justify-center text-center',
                isFlipped ? 'invisible' : 'visible',
                `border-${chapter?.color}-200 dark:border-${chapter?.color}-800`
              )}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <span className={`mb-4 rounded-full bg-${chapter?.color}-100 px-3 py-1 text-xs font-medium text-${chapter?.color}-700 dark:bg-${chapter?.color}-900/30 dark:text-${chapter?.color}-300`}>
                {currentCard?.category}
              </span>
              <h2 className="text-xl font-medium text-slate-900 dark:text-slate-100">
                {currentCard?.front}
              </h2>
              <p className="mt-6 text-sm text-slate-400 dark:text-slate-500">
                Cliquer pour retourner
              </p>
            </div>

            {/* Back */}
            <div
              className={cn(
                'absolute inset-0 rounded-xl border-2 bg-gradient-to-br from-primary-50 to-indigo-50 p-6 shadow-lg dark:from-primary-900/20 dark:to-indigo-900/20',
                'flex flex-col items-center justify-center text-center',
                isFlipped ? 'visible' : 'invisible',
                'border-primary-200 dark:border-primary-800'
              )}
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <p className="text-lg text-slate-800 dark:text-slate-200">
                {currentCard?.back}
              </p>
              {currentCard?.math && (
                <div className="mt-4 rounded-lg bg-white/80 px-4 py-3 dark:bg-slate-800/80">
                  <BlockMath math={currentCard.math} />
                </div>
              )}
              {currentCard?.tip && (
                <p className="mt-4 text-sm text-primary-600 dark:text-primary-400">
                  💡 {currentCard.tip}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="rounded-full p-3 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleUnknown}
            className="flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
          >
            <X className="h-5 w-5" />
            À revoir
          </button>

          <button
            onClick={handleKnown}
            className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 font-medium text-green-700 transition-colors hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
          >
            <Check className="h-5 w-5" />
            Je sais
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === shuffledCards.length - 1}
            className="rounded-full p-3 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Keyboard hints */}
        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          Raccourcis : Espace = retourner • ← → = naviguer • ↑ = je sais • ↓ = à revoir
        </p>
      </div>

      {/* CSS for 3D flip */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}
