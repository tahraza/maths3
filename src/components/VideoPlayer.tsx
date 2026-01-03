'use client'

import { useState } from 'react'

interface VideoPlayerProps {
  videoUrl: string
  videoDuration?: number
  videoCreator?: string
  onComplete?: () => void
}

/**
 * Extrait l'ID de la vidéo YouTube depuis une URL
 */
function getYouTubeId(url: string): string | null {
  const regexes = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
  ]

  for (const regex of regexes) {
    const match = url.match(regex)
    if (match) return match[1]
  }

  return null
}

/**
 * Formate une durée en secondes en format lisible
 */
function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function VideoPlayer({
  videoUrl,
  videoDuration,
  videoCreator,
  onComplete
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isWatched, setIsWatched] = useState(false)

  const videoId = getYouTubeId(videoUrl)

  if (!videoId) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-red-600 dark:text-red-400">
        URL de vidéo invalide
      </div>
    )
  }

  const handleMarkAsWatched = () => {
    setIsWatched(true)
    onComplete?.()
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">📺</span>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Vidéo explicative
        </h3>
        {isWatched && (
          <span className="ml-auto px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
            Vu
          </span>
        )}
      </div>

      {!isPlaying ? (
        // Thumbnail avec bouton play
        <div className="relative">
          <div
            className="
              relative aspect-video bg-gray-900 rounded-lg overflow-hidden
              cursor-pointer group
            "
            onClick={() => setIsPlaying(true)}
          >
            {/* Thumbnail YouTube */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Miniature de la vidéo"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback si maxresdefault n'existe pas
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              }}
            />

            {/* Overlay sombre au hover */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

            {/* Bouton play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="
                w-16 h-16 md:w-20 md:h-20
                bg-red-600 rounded-full
                flex items-center justify-center
                shadow-lg
                group-hover:scale-110 transition-transform
              ">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Infos sous la miniature */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {videoCreator && (
                <>
                  <span>Par {videoCreator}</span>
                  <span>•</span>
                </>
              )}
              {videoDuration && (
                <span>{formatDuration(videoDuration)}</span>
              )}
            </div>

            <button
              onClick={() => setIsPlaying(true)}
              className="
                px-4 py-2 bg-red-600 text-white font-medium rounded-lg
                hover:bg-red-700 transition-colors
                flex items-center gap-2
              "
            >
              <span>Regarder</span>
            </button>
          </div>
        </div>
      ) : (
        // Lecteur YouTube
        <div>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Vidéo explicative"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {videoCreator && <span>Par {videoCreator}</span>}
            </div>

            <div className="flex items-center gap-2">
              {!isWatched && (
                <button
                  onClick={handleMarkAsWatched}
                  className="
                    px-4 py-2 bg-green-500 text-white font-medium rounded-lg
                    hover:bg-green-600 transition-colors
                    flex items-center gap-2
                  "
                >
                  <span>Marquer comme vu</span>
                </button>
              )}

              <button
                onClick={() => setIsPlaying(false)}
                className="
                  px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                  font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors
                "
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
