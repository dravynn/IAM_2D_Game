'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePlatformerStore } from '@/store/platformerStore'

export default function WinScreen() {
  const { showWinScreen, hideWin, gameState, resetLevel, setCurrentLevel } = usePlatformerStore()

  const handleRestart = () => {
    hideWin()
    setCurrentLevel(0)
  }

  return (
    <AnimatePresence>
      {showWinScreen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md mx-4 shadow-2xl text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <motion.div
              className="text-8xl mb-4"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              🎉
            </motion.div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              The Awakening Complete!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              You have restored balance to the world by giving back all IAM tokens.
            </p>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-700 font-semibold mb-1">Total IAM Collected</div>
              <div className="text-3xl font-bold text-gray-900">
                {gameState.totalIAM.toLocaleString()} 🪙
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg"
              >
                Play Again
              </button>
              <button
                onClick={hideWin}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 px-6 rounded-lg font-semibold transition-all"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

