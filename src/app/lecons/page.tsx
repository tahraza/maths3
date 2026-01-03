'use client'

import { BookOpen, Calculator, Variable, Shapes, BarChart2, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { lessons, chapters } from '@/data/lessons'
import { cn } from '@/lib/utils'

const chapterIcons = {
  nombres: Calculator,
  fonctions: Variable,
  geometrie: Shapes,
  statistiques: BarChart2,
}

const chapterColors: Record<string, { bg: string; icon: string }> = {
  'nombres': { bg: 'bg-blue-100 dark:bg-blue-900/30', icon: 'text-blue-600 dark:text-blue-400' },
  'fonctions': { bg: 'bg-purple-100 dark:bg-purple-900/30', icon: 'text-purple-600 dark:text-purple-400' },
  'geometrie': { bg: 'bg-teal-100 dark:bg-teal-900/30', icon: 'text-teal-600 dark:text-teal-400' },
  'statistiques': { bg: 'bg-orange-100 dark:bg-orange-900/30', icon: 'text-orange-600 dark:text-orange-400' },
}

export default function LeconsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
            <BookOpen className="h-8 w-8 text-primary-600" />
            Leçons de Maths 3<sup>ème</sup>
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Tout le programme du Brevet avec des exemples concrets
          </p>
        </div>

        <div className="space-y-8">
          {chapters.map((chapter) => {
            const Icon = chapterIcons[chapter.id as keyof typeof chapterIcons]
            const chapterLessons = lessons.filter(l => l.chapterId === chapter.id)

            return (
              <div key={chapter.id} className="card">
                <div className="mb-4 flex items-center gap-3">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', chapterColors[chapter.id]?.bg)}>
                    <Icon className={cn('h-5 w-5', chapterColors[chapter.id]?.icon)} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{chapter.name}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{chapterLessons.length} leçons</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {chapterLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/lecons/${lesson.id}`}
                      className="group rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-primary-300 hover:bg-primary-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900 group-hover:text-primary-700 dark:text-slate-100 dark:group-hover:text-primary-300">
                            {lesson.title}
                          </h3>
                          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                            <Clock className="h-3.5 w-3.5" />
                            {lesson.duration} min
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-500" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
