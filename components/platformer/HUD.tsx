'use client'

import { motion } from 'framer-motion'
import { usePlatformerStore } from '@/store/platformerStore'

export default function HUD() {
  const { gameState, levels, currentLevelIndex, toggleDarkMode, darkMode } = usePlatformerStore()
  const currentLevel = levels[currentLevelIndex]

  return (
    <div className="absolute top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* IAM Tokens */}
          <motion.div
            className="flex items-center gap-2"
            animate={{
              scale: gameState.totalIAM > 0 ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <span className="text-3xl">🪙</span>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">
                IAM Tokens
              </div>
              <div className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
                {gameState.totalIAM.toLocaleString()}
              </div>
            </div>
          </motion.div>

          {/* Current Level */}
          <div className="hidden md:flex items-center gap-2">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Level
              </div>
              <div className="text-lg font-semibold">
                {currentLevel.name}
              </div>
            </div>
          </div>

          {/* Player Avatar */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
              ⚡
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                I Am
              </div>
              <div className="text-sm font-semibold">Hero</div>
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  )
}

