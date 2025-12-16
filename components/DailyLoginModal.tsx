'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

export default function DailyLoginModal() {
  const { dailyLogin, claimDailyBonus, checkDailyLogin } = useGameStore()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    checkDailyLogin()
    if (!dailyLogin.claimed) {
      setShowModal(true)
    }
  }, [checkDailyLogin, dailyLogin.claimed])

  const handleClaim = () => {
    claimDailyBonus()
    setShowModal(false)
  }

  const bonus = 50 + dailyLogin.streak * 10

  return (
    <AnimatePresence>
      {showModal && !dailyLogin.claimed && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4 shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="text-center mb-4">
              <span className="text-6xl">🎁</span>
              <h2 className="text-2xl font-bold mt-2">Daily Login Bonus!</h2>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  +{bonus} IAM
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Streak: {dailyLogin.streak} day{dailyLogin.streak !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
              Come back tomorrow for an even bigger bonus!
            </p>

            <button
              onClick={handleClaim}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              Claim Bonus
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

