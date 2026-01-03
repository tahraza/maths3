'use client'

import { useState, useRef } from 'react'
import { useGamificationStore } from '@/stores/gamificationStore'
import { usePetStore } from '@/stores/petStore'

export default function DataManagement() {
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetStep, setResetStep] = useState(1)
  const [importMessage, setImportMessage] = useState<{ text: string; success: boolean } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const gamificationExport = useGamificationStore((state) => state.exportData)
  const gamificationImport = useGamificationStore((state) => state.importData)
  const gamificationReset = useGamificationStore((state) => state.resetAllData)

  const petExport = usePetStore((state) => state.exportData)
  const petImport = usePetStore((state) => state.importData)
  const petReset = usePetStore((state) => state.resetPet)

  const handleExport = () => {
    const data = {
      version: 1,
      exportDate: new Date().toISOString(),
      gamification: JSON.parse(gamificationExport()),
      pet: JSON.parse(petExport()),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `maths3-sauvegarde-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setImportMessage({ text: 'Sauvegarde exportée avec succès !', success: true })
    setTimeout(() => setImportMessage(null), 3000)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const data = JSON.parse(content)

        // Validate structure
        if (!data.gamification || !data.pet) {
          throw new Error('Format de fichier invalide')
        }

        // Import data
        const gamificationSuccess = gamificationImport(JSON.stringify(data.gamification))
        const petSuccess = petImport(JSON.stringify(data.pet))

        if (gamificationSuccess && petSuccess) {
          setImportMessage({ text: 'Données importées avec succès ! Actualise la page.', success: true })
        } else {
          setImportMessage({ text: 'Erreur lors de l\'importation', success: false })
        }
      } catch {
        setImportMessage({ text: 'Fichier invalide ou corrompu', success: false })
      }
      setTimeout(() => setImportMessage(null), 3000)
    }
    reader.readAsText(file)

    // Reset input
    event.target.value = ''
  }

  const handleResetClick = () => {
    setShowResetConfirm(true)
    setResetStep(1)
  }

  const handleResetConfirm = () => {
    if (resetStep === 1) {
      setResetStep(2)
    } else {
      // Actually reset
      gamificationReset()
      petReset()
      setShowResetConfirm(false)
      setResetStep(1)
      setImportMessage({ text: 'Toutes les données ont été supprimées', success: true })
      setTimeout(() => {
        setImportMessage(null)
        window.location.reload()
      }, 2000)
    }
  }

  const handleResetCancel = () => {
    setShowResetConfirm(false)
    setResetStep(1)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>⚙️</span>
          <span>Gestion des données</span>
        </h3>

        {/* Import message */}
        {importMessage && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-medium ${
              importMessage.success
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            }`}
          >
            {importMessage.text}
          </div>
        )}

        <div className="space-y-4">
          {/* Export */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📤</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Exporter ma progression
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Télécharge un fichier de sauvegarde contenant toutes tes données :
                  XP, badges, compagnon, items achetés, défis...
                </p>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg
                    hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <span>💾</span>
                  <span>Télécharger la sauvegarde</span>
                </button>
              </div>
            </div>
          </div>

          {/* Import */}
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📥</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Importer une sauvegarde
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Restaure tes données depuis un fichier de sauvegarde précédemment exporté.
                  Attention : cela remplacera tes données actuelles.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={handleImportClick}
                  className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg
                    hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <span>📁</span>
                  <span>Choisir un fichier</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reset */}
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🗑️</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Réinitialiser toutes les données
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Supprime définitivement toutes tes données : progression, XP, badges,
                  compagnon et items. Cette action est irréversible !
                </p>
                <button
                  onClick={handleResetClick}
                  className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg
                    hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <span>⚠️</span>
                  <span>Réinitialiser</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span>💡</span>
          <span>Bon à savoir</span>
        </h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Tes données sont stockées localement sur ton navigateur</li>
          <li>• Exporte régulièrement pour éviter de perdre ta progression</li>
          <li>• Tu peux utiliser la sauvegarde sur un autre appareil</li>
        </ul>
      </div>

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="text-center mb-6">
              <span className="text-5xl block mb-4">
                {resetStep === 1 ? '⚠️' : '🚨'}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {resetStep === 1 ? 'Es-tu sûr ?' : 'Dernière chance !'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {resetStep === 1
                  ? 'Tu vas supprimer toutes tes données. Cette action est irréversible.'
                  : 'Confirme une dernière fois pour supprimer définitivement toutes tes données.'}
              </p>
            </div>

            {resetStep === 2 && (
              <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-sm text-red-800 dark:text-red-200">
                <p className="font-medium mb-1">Tu vas perdre :</p>
                <ul className="list-disc list-inside">
                  <li>Tous tes points XP</li>
                  <li>Tes badges et accomplissements</li>
                  <li>Ton compagnon et ses items</li>
                  <li>Ta progression dans les défis</li>
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleResetCancel}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                  font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleResetConfirm}
                className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl
                  hover:bg-red-600 transition-colors"
              >
                {resetStep === 1 ? 'Continuer' : 'Supprimer tout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
