'use client'

import { useState } from 'react'
import { FileText, Clock, Target, Award, ChevronRight, AlertCircle, BarChart3, Trophy } from 'lucide-react'
import Link from 'next/link'
import { annales, getAllYears } from '@/data/annales'
import { useExamStore } from '@/stores/examStore'
import { cn } from '@/lib/utils'

export default function ExamenPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const { currentExamId, examHistory, getExamStats } = useExamStore()
  const years = getAllYears()
  const stats = getExamStats()

  const filteredAnnales = selectedYear
    ? annales.filter(a => a.year === selectedYear)
    : annales

  // Si un examen est en cours, afficher un message
  if (currentExamId) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
        <div className="mx-auto max-w-2xl px-4">
          <div className="card text-center py-12">
            <AlertCircle className="mx-auto h-16 w-16 text-amber-500 mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Examen en cours
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Tu as un examen en cours. Tu peux le continuer ou l'abandonner.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href={`/examen/${currentExamId}`}
                className="px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
              >
                Continuer l'examen
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
            <FileText className="h-8 w-8 text-primary-600" />
            Mode Examen Blanc
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Entraîne-toi dans les conditions réelles du brevet avec des annales officielles.
          </p>
        </div>

        {/* Stats */}
        {stats.totalExams > 0 && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary-500" />
              Mes Statistiques
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {stats.totalExams}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Examens passés
                </div>
              </div>
              <div className="text-center p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.averageScore}/100
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Moyenne
                </div>
              </div>
              <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                  <Trophy className="h-5 w-5" />
                  {stats.bestScore}/100
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Meilleur score
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Informations */}
        <div className="card mb-6 border-l-4 border-primary-500">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Comment ça marche ?
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-0.5 text-primary-500" />
              <span>Durée : 2 heures, comme le jour du brevet</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="h-4 w-4 mt-0.5 text-primary-500" />
              <span>5 exercices couvrant tout le programme</span>
            </li>
            <li className="flex items-start gap-2">
              <Award className="h-4 w-4 mt-0.5 text-primary-500" />
              <span>Note sur 100 points avec correction détaillée</span>
            </li>
          </ul>
        </div>

        {/* Filtre par année */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedYear(null)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors',
                selectedYear === null
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
              )}
            >
              Toutes
            </button>
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  selectedYear === year
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                )}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des annales */}
        <div className="space-y-4">
          {filteredAnnales.map(annale => {
            const completed = examHistory.some(e => e.annaleId === annale.id)
            const bestResult = examHistory
              .filter(e => e.annaleId === annale.id)
              .sort((a, b) => b.score - a.score)[0]

            return (
              <Link
                key={annale.id}
                href={`/examen/${annale.id}`}
                className="card group flex items-center justify-between hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 text-white font-bold">
                      {annale.year.toString().slice(-2)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        Brevet {annale.year} - {annale.session}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {annale.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {annale.totalPoints} pts
                        </span>
                        <span>{annale.exercises.length} exercices</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {completed && bestResult && (
                    <div className={cn(
                      'px-3 py-1 rounded-full text-sm font-medium',
                      bestResult.score >= 80
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : bestResult.score >= 50
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    )}>
                      {bestResult.score}/100
                    </div>
                  )}
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
                </div>
              </Link>
            )
          })}
        </div>

        {filteredAnnales.length === 0 && (
          <div className="card text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              Aucune annale disponible pour cette année.
            </p>
          </div>
        )}

        {/* Historique récent */}
        {examHistory.length > 0 && (
          <div className="mt-8 card">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Derniers examens
            </h2>
            <div className="space-y-3">
              {examHistory.slice(-5).reverse().map((result, index) => {
                const annale = annales.find(a => a.id === result.annaleId)
                if (!annale) return null

                const date = new Date(result.completedAt)

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        Brevet {annale.year} - {annale.session}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {date.toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className={cn(
                      'text-lg font-bold',
                      result.score >= 80
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : result.score >= 50
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-red-600 dark:text-red-400'
                    )}>
                      {result.score}/100
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
