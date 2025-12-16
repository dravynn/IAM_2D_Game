'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

export default function QuestSidebar() {
  const {
    quests,
    activeQuestId,
    questSidebarOpen,
    toggleQuestSidebar,
    currentZoneId,
  } = useGameStore()

  const activeQuest = quests.find((q) => q.id === activeQuestId)
  const zoneQuests = quests.filter((q) => q.zoneId === currentZoneId)

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleQuestSidebar}
        className="fixed top-20 right-4 z-40 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-colors md:hidden"
        aria-label="Toggle quest log"
      >
        📋
      </button>

      <button
        onClick={toggleQuestSidebar}
        className="fixed top-20 right-4 z-40 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors hidden md:block"
        aria-label="Toggle quest log"
      >
        {questSidebarOpen ? 'Hide' : 'Show'} Quest Log
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {questSidebarOpen && (
          <motion.div
            className="fixed top-20 right-4 z-30 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-6rem)] overflow-y-auto"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Quest Log</h2>
                <button
                  onClick={toggleQuestSidebar}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              {/* Active Quest */}
              {activeQuest && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                    Active Quest
                  </h3>
                  <div
                    className={`p-4 rounded-lg border-2 ${
                      activeQuest.completed
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-lg">{activeQuest.title}</h4>
                      {activeQuest.completed && (
                        <span className="text-green-500">✓</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {activeQuest.description}
                    </p>
                    <div className="space-y-2">
                      {activeQuest.objectives.map((obj) => (
                        <div
                          key={obj.id}
                          className={`flex items-center gap-2 text-sm ${
                            obj.completed
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          <span>{obj.completed ? '✓' : '○'}</span>
                          <span
                            className={
                              obj.completed ? 'line-through' : ''
                            }
                          >
                            {obj.description}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Reward:
                        </span>{' '}
                        <span className="font-bold text-primary-600 dark:text-primary-400">
                          {activeQuest.reward} IAM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Zone Quests */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                  Zone Quests
                </h3>
                <div className="space-y-3">
                  {zoneQuests.map((quest) => (
                    <div
                      key={quest.id}
                      className={`p-3 rounded-lg border ${
                        quest.completed
                          ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-sm">{quest.title}</h4>
                        {quest.completed && (
                          <span className="text-green-500">✓</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {quest.description}
                      </p>
                      <div className="text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Reward:
                        </span>{' '}
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          {quest.reward} IAM
                        </span>
                      </div>
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

