'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  Calculator,
  BookOpen,
  ClipboardList,
  Brain,
  BarChart3,
  Menu,
  X,
  Sun,
  Moon,
  Star,
  Flame
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from './ThemeProvider'
import { useGamificationStore } from '@/stores/gamificationStore'

const navigation = [
  { name: 'Accueil', href: '/', icon: Calculator },
  { name: 'Leçons', href: '/lecons', icon: BookOpen },
  { name: 'Exercices', href: '/exercices', icon: ClipboardList },
  { name: 'Flashcards', href: '/flashcards', icon: Brain },
  { name: 'Stats', href: '/stats', icon: BarChart3 },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { getLevel, currentStreak } = useGamificationStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const level = mounted ? getLevel() : { level: 1, title: 'Débutant', currentXP: 0, nextLevelXP: 100, progress: 0 }
  const streak = mounted ? currentStreak : 0

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <span className="hidden text-lg font-bold text-slate-900 dark:text-slate-100 sm:block">
              Maths 3<sup>ème</sup>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Gamification status */}
            {mounted && (
              <div className="hidden items-center gap-3 rounded-lg bg-slate-100 px-3 py-1.5 dark:bg-slate-800 sm:flex">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-primary-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Niv. {level.level}
                  </span>
                </div>
                {streak > 0 && (
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {streak}j
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Changer de thème"
            >
              {mounted && resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 md:hidden">
          <div className="space-y-1 px-4 py-3">
            {/* Mobile gamification status */}
            {mounted && (
              <div className="mb-3 flex items-center gap-3 rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-primary-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Niveau {level.level} - {level.title}
                  </span>
                </div>
                {streak > 0 && (
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {streak} jours
                    </span>
                  </div>
                )}
              </div>
            )}

            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium',
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
