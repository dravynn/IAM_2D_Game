'use client'

import { useGameStore } from '@/store/gameStore'

export default function BottomNavbar() {
  const { zones, currentZoneId, setCurrentZone, toggleQuestSidebar } = useGameStore()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {/* Zone Selector */}
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setCurrentZone(zone.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                currentZoneId === zone.id
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl">{zone.emoji}</span>
              <span className="text-xs font-medium">{zone.name.split(' ')[0]}</span>
            </button>
          ))}

          {/* Quest Log Button */}
          <button
            onClick={toggleQuestSidebar}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-2xl">📋</span>
            <span className="text-xs font-medium">Quests</span>
          </button>
        </div>
      </div>
    </div>
  )
}

