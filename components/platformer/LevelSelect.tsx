'use client'

import { motion } from 'framer-motion'
import { usePlatformerStore } from '@/store/platformerStore'

export default function LevelSelect() {
  const { levels, currentLevelIndex, setCurrentLevel, gameState } = usePlatformerStore()

  return (
    <div className="fixed bottom-4 left-4 z-20 hidden md:block">
      <motion.div
        className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
          Select Level
        </div>
        <div className="flex gap-2">
          {levels.map((level, index) => (
            <motion.button
              key={level.id}
              onClick={() => level.unlocked && setCurrentLevel(index)}
              disabled={!level.unlocked}
              className={`relative p-3 rounded-lg transition-all ${
                currentLevelIndex === index
                  ? 'bg-purple-500 text-white scale-110 shadow-lg'
                  : level.unlocked
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 opacity-50 cursor-not-allowed'
              }`}
              whileHover={level.unlocked ? { scale: 1.1 } : {}}
              whileTap={level.unlocked ? { scale: 0.95 } : {}}
            >
              <div className="text-2xl mb-1">{index === 0 ? '🌳' : index === 1 ? '💎' : '⛰️'}</div>
              <div className="text-xs font-semibold">{index + 1}</div>
              {!level.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg">🔒</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

