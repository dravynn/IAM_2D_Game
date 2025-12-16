'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { useEffect, useState } from 'react'

export default function StatsPanel() {
  const {
    playerStats,
    achievements,
    statsPanelOpen,
    toggleStatsPanel,
    iamTokens,
  } = useGameStore()

  const [playTime, setPlayTime] = useState(playerStats.playTime)

  useEffect(() => {
    if (!statsPanelOpen) return

    const interval = setInterval(() => {
      setPlayTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [statsPanelOpen])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    }
    return `${minutes}m ${secs}s`
  }

  const progressPercentage = (playerStats.experience / playerStats.experienceToNextLevel) * 100
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length
  const totalAchievements = achievements.length

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleStatsPanel}
        className="fixed top-20 left-4 z-40 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle stats panel"
      >
        📊 Stats
      </button>

      {/* Panel */}
      <AnimatePresence>
        {statsPanelOpen && (
          <motion.div
            className="fixed top-20 left-4 z-30 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-6rem)] overflow-y-auto"
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Player Stats</h2>
                <button
                  onClick={toggleStatsPanel}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              {/* Level & XP */}
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Level</span>
                  <span className="text-2xl font-bold">{playerStats.level}</span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>XP: {playerStats.experience}</span>
                    <span>{playerStats.experienceToNextLevel} XP</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-white rounded-full h-2"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl mb-1">🪙</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Total Tokens</div>
                  <div className="text-lg font-bold">{iamTokens.toLocaleString()}</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl mb-1">💰</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Coins Collected</div>
                  <div className="text-lg font-bold">{playerStats.totalCoinsCollected}</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Quests Done</div>
                  <div className="text-lg font-bold">{playerStats.totalQuestsCompleted}</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl mb-1">🗺️</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Zones Unlocked</div>
                  <div className="text-lg font-bold">{playerStats.zonesUnlocked}/3</div>
                </div>
              </div>

              {/* Play Time */}
              <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⏱️</span>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Play Time</div>
                    <div className="font-semibold">{formatTime(playTime)}</div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                  Achievements ({unlockedAchievements}/{totalAchievements})
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-lg border-2 ${
                        achievement.unlocked
                          ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{achievement.icon}</span>
                          <div>
                            <div className="font-semibold text-sm">{achievement.title}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {achievement.description}
                            </div>
                          </div>
                        </div>
                        {achievement.unlocked && (
                          <span className="text-yellow-500">✓</span>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                          Reward: {achievement.reward} IAM
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

