'use client'

import { useState, useEffect } from 'react'
import { Brain, RotateCcw, ChevronLeft, ChevronRight, Shuffle, Calculator, Variable, Shapes, BarChart2, Clock, Trophy, Target } from 'lucide-react'
import { flashcards, Flashcard } from '@/data/flashcards'
import { chapters } from '@/data/lessons'
import { cn } from '@/lib/utils'
import { BlockMath } from '@/components/KaTeX'
import { useGamificationStore, POINTS } from '@/stores/gamificationStore'
import { useFlashcardStore, simpleToSM2Quality, getMasteryLevel, getMasteryBadge, SimpleQuality } from '@/stores/flashcardStore'
import { usePetMessageStore } from '@/stores/petMessageStore'

const chapterIcons = {
  nombres: Calculator,
  fonctions: Variable,
  geometrie: Shapes,
  statistiques: BarChart2,
}

type StudyMode = 'due' | 'all' | 'chapter'

export default function FlashcardsPage() {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [studyMode, setStudyMode] = useState<StudyMode | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [studyCards, setStudyCards] = useState<Flashcard[]>([])
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 })

  const { addPoints, incrementStat } = useGamificationStore()
  const { recordReview, getReview, getDueCards, getStats } = useFlashcardStore()
  const showPetMessage = usePetMessageStore((state) => state.showMessage)

  const stats = getStats()
  const dueCards = getDueCards()

  // Initialiser les cartes selon le mode
  useEffect(() => {
    if (studyMode === 'due') {
      const cards = [...dueCards].sort(() => Math.random() - 0.5)
      setStudyCards(cards)
      setCurrentIndex(0)
      setIsFlipped(false)
      setSessionStats({ reviewed: 0, correct: 0 })
    } else if (studyMode === 'all') {
      const cards = [...flashcards].sort(() => Math.random() - 0.5)
      setStudyCards(cards)
      setCurrentIndex(0)
      setIsFlipped(false)
      setSessionStats({ reviewed: 0, correct: 0 })
    }
  }, [studyMode])

  // Quand on sélectionne un chapitre/catégorie
  useEffect(() => {
    if (selectedChapter && (selectedCategory || selectedChapter === 'all')) {
      let cards = flashcards

      if (selectedChapter !== 'all') {
        cards = cards.filter(c => c.chapterId === selectedChapter)
      }

      if (selectedCategory && selectedCategory !== 'all') {
        cards = cards.filter(c => c.category === selectedCategory)
      }

      const shuffled = [...cards].sort(() => Math.random() - 0.5)
      setStudyCards(shuffled)
      setCurrentIndex(0)
      setIsFlipped(false)
      setSessionStats({ reviewed: 0, correct: 0 })
      setStudyMode('chapter')
    }
  }, [selectedChapter, selectedCategory])

  const currentCard = studyCards[currentIndex]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    if (currentIndex < studyCards.length - 1) {
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

  const handleRate = (quality: SimpleQuality) => {
    if (!currentCard) return

    const sm2Quality = simpleToSM2Quality(quality)
    recordReview(currentCard.id, sm2Quality)

    // Mettre à jour les stats de session
    setSessionStats(prev => ({
      reviewed: prev.reviewed + 1,
      correct: quality !== 'hard' ? prev.correct + 1 : prev.correct
    }))

    // Points XP
    if (quality === 'easy') {
      addPoints(POINTS.FLASHCARD_MASTERED, 'Flashcard maîtrisée')
      incrementStat('correctAnswers')
    } else {
      addPoints(POINTS.FLASHCARD_REVIEWED, 'Flashcard révisée')
    }

    // Passer à la carte suivante ou terminer
    if (currentIndex < studyCards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    } else {
      // Session terminée
      showPetMessage('flashcard_session', { score: Math.round((sessionStats.correct / (sessionStats.reviewed + 1)) * 100) })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleFlip()
    } else if (e.key === 'ArrowLeft') {
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      handleNext()
    } else if (e.key === '1') {
      handleRate('hard')
    } else if (e.key === '2') {
      handleRate('medium')
    } else if (e.key === '3') {
      handleRate('easy')
    }
  }

  const resetSession = () => {
    setStudyMode(null)
    setSelectedChapter(null)
    setSelectedCategory(null)
    setStudyCards([])
    setCurrentIndex(0)
    setIsFlipped(false)
    setSessionStats({ reviewed: 0, correct: 0 })
  }

  // Écran d'accueil principal
  if (!studyMode && !selectedChapter) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="flex items-center justify-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
              <Brain className="h-8 w-8 text-primary-600" />
              Flashcards
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Mémorise avec la répétition espacée
            </p>
          </div>

          {/* Stats globales */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="card text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.dueToday}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">À réviser</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.mastered}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Maîtrisées</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.reviewed}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Révisées</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">{stats.total}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total</div>
            </div>
          </div>

          {/* Mode Révision du jour */}
          {dueCards.length > 0 && (
            <button
              onClick={() => setStudyMode('due')}
              className="mb-6 w-full rounded-xl border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 text-left transition-all hover:border-blue-400 hover:shadow-lg dark:border-blue-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:hover:border-blue-600"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500 text-white">
                  <Clock className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Révision du jour
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {dueCards.length} carte{dueCards.length > 1 ? 's' : ''} à réviser maintenant
                  </p>
                </div>
                <div className="text-3xl">🔥</div>
              </div>
            </button>
          )}

          {/* Message si pas de cartes dues */}
          {dueCards.length === 0 && stats.reviewed > 0 && (
            <div className="mb-6 rounded-xl bg-green-50 p-6 text-center dark:bg-green-900/20">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                Toutes les révisions sont faites !
              </h3>
              <p className="text-green-600 dark:text-green-400">
                Reviens demain pour continuer ta progression
              </p>
            </div>
          )}

          {/* Sélection par chapitre */}
          <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">
            Par chapitre
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {chapters.map((chapter) => {
              const Icon = chapterIcons[chapter.id as keyof typeof chapterIcons]
              const chapterCards = flashcards.filter(c => c.chapterId === chapter.id)
              const chapterDue = dueCards.filter(c => c.chapterId === chapter.id).length

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
                        {chapterDue > 0 && (
                          <span className="ml-2 text-blue-600 dark:text-blue-400">
                            • {chapterDue} à réviser
                          </span>
                        )}
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
            onClick={() => setStudyMode('all')}
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

  // Obtenir les catégories du chapitre sélectionné
  const categories = selectedChapter && selectedChapter !== 'all'
    ? Array.from(new Set(flashcards.filter(c => c.chapterId === selectedChapter).map(c => c.category)))
    : []

  // Si un chapitre est sélectionné mais pas de catégorie
  if (selectedChapter && selectedChapter !== 'all' && !selectedCategory && categories.length > 1) {
    const chapter = chapters.find(c => c.id === selectedChapter)
    const Icon = chapterIcons[selectedChapter as keyof typeof chapterIcons]
    const filteredCards = flashcards.filter(c => c.chapterId === selectedChapter)

    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={resetSession}
            className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour
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

  // Session terminée
  if (studyCards.length > 0 && currentIndex >= studyCards.length) {
    const accuracy = sessionStats.reviewed > 0
      ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100)
      : 0

    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="card text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Session terminée !
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Tu as révisé {sessionStats.reviewed} carte{sessionStats.reviewed > 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {sessionStats.correct}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">Réussies</div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {accuracy}%
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Précision</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetSession}
                className="flex-1 py-3 px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={() => {
                  setCurrentIndex(0)
                  setIsFlipped(false)
                  setSessionStats({ reviewed: 0, correct: 0 })
                  setStudyCards([...studyCards].sort(() => Math.random() - 0.5))
                }}
                className="flex-1 py-3 px-4 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Recommencer
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Affichage des flashcards
  if (studyCards.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {studyMode === 'due'
              ? 'Aucune carte à réviser pour le moment !'
              : 'Aucune flashcard disponible.'}
          </p>
          <button
            onClick={resetSession}
            className="text-primary-600 hover:underline"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  const progress = ((currentIndex + 1) / studyCards.length) * 100
  const chapter = chapters.find(c => c.id === currentCard?.chapterId)
  const cardReview = currentCard ? getReview(currentCard.id) : null
  const masteryLevel = getMasteryLevel(cardReview)
  const masteryBadge = getMasteryBadge(masteryLevel)

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
            onClick={resetSession}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour
          </button>

          <div className="flex items-center gap-2">
            {studyMode === 'due' && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                Mode Révision
              </span>
            )}
            <button
              onClick={() => {
                setStudyCards([...studyCards].sort(() => Math.random() - 0.5))
                setCurrentIndex(0)
                setIsFlipped(false)
              }}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <Shuffle className="h-4 w-4" />
              Mélanger
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Carte {currentIndex + 1} sur {studyCards.length}</span>
            <div className="flex items-center gap-2">
              <span className={masteryBadge.emoji}>{masteryBadge.label}</span>
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

        {/* Rating buttons (visible only when flipped) */}
        {isFlipped && (
          <div className="mb-6">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-3">
              Comment était cette carte ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleRate('hard')}
                className="flex-1 py-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex flex-col items-center"
              >
                <span className="text-xl mb-1">😓</span>
                <span>Difficile</span>
                <span className="text-xs opacity-70">À revoir</span>
              </button>
              <button
                onClick={() => handleRate('medium')}
                className="flex-1 py-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-medium hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors flex flex-col items-center"
              >
                <span className="text-xl mb-1">🤔</span>
                <span>Moyen</span>
                <span className="text-xs opacity-70">Hésitation</span>
              </button>
              <button
                onClick={() => handleRate('easy')}
                className="flex-1 py-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors flex flex-col items-center"
              >
                <span className="text-xl mb-1">😊</span>
                <span>Facile</span>
                <span className="text-xs opacity-70">Maîtrisé</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation (when not flipped) */}
        {!isFlipped && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-full p-3 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleFlip}
              className="px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
            >
              Voir la réponse
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === studyCards.length - 1}
              className="rounded-full p-3 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Session stats */}
        <div className="mt-6 flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <span>Session : {sessionStats.reviewed} révisées</span>
          <span>•</span>
          <span className="text-green-600 dark:text-green-400">{sessionStats.correct} réussies</span>
        </div>

        {/* Keyboard hints */}
        <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
          Raccourcis : Espace = retourner • 1/2/3 = noter • ← → = naviguer
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
