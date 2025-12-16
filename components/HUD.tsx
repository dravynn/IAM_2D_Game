'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

export default function HUD() {
  const { iamTokens, zones, currentZoneId, toggleDarkMode, darkMode, playerStats } = useGameStore()
  const currentZone = zones.find((z) => z.id === currentZoneId)
  const progressPercentage = (playerStats.experience / playerStats.experienceToNextLevel) * 100

  return (
    <div className="absolute top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* IAM Tokens */}
          <motion.div 
            className="flex items-center gap-2"
            animate={{
              scale: iamTokens > 0 ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <span className="text-3xl drop-shadow-lg">🪙</span>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">
                IAM Tokens
              </div>
              <div className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 drop-shadow-md">
                {iamTokens.toLocaleString()}
              </div>
            </div>
          </motion.div>

          {/* Current Zone */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-2xl">{currentZone?.emoji}</span>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Zone
              </div>
              <div className="text-lg font-semibold">
                {currentZone?.name}
              </div>
            </div>
          </div>

          {/* Level Display */}
          <div className="hidden md:flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg px-3 py-2 text-white">
              <div className="text-xs font-semibold opacity-90">Level</div>
              <div className="text-xl font-bold">{playerStats.level}</div>
            </div>
            <div className="w-20">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {playerStats.experience}/{playerStats.experienceToNextLevel} XP
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full h-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
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

