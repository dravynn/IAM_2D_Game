'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

export default function ZoneMap() {
  const { zones, currentZoneId, setCurrentZone } = useGameStore()

  return (
    <div className="fixed bottom-4 right-4 z-20 hidden md:block">
      <motion.div
        className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
          Zones
        </div>
        <div className="flex gap-2">
          {zones.map((zone, index) => (
            <motion.button
              key={zone.id}
              onClick={() => setCurrentZone(zone.id)}
              className={`relative p-2 rounded-lg transition-all ${
                currentZoneId === zone.id
                  ? 'bg-primary-500 text-white scale-110 shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={zone.name}
            >
              <span className="text-xl">{zone.emoji}</span>
              {currentZoneId === zone.id && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white dark:border-gray-800"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

