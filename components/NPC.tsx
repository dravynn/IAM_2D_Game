'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import type { NPC as NPCType } from '@/types/game'

interface NPCProps {
  npc: NPCType
  playerPosition: { x: number; y: number }
}

export default function NPC({ npc, playerPosition }: NPCProps) {
  const { interactWithNPC } = useGameStore()
  const [showDialogue, setShowDialogue] = useState(false)
  const [dialogueIndex, setDialogueIndex] = useState(0)

  const distance = Math.sqrt(
    Math.pow(npc.position.x - playerPosition.x, 2) +
    Math.pow(npc.position.y - playerPosition.y, 2)
  )

  const isNearby = distance < 80

  const handleInteract = useCallback(() => {
    if (isNearby) {
      interactWithNPC(npc.id)
      setShowDialogue(true)
      setDialogueIndex(0)
    }
  }, [isNearby, npc.id, interactWithNPC])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.key === 'e' || e.key === 'E') && isNearby && !showDialogue) {
        handleInteract()
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [isNearby, showDialogue, handleInteract])

  const currentDialogue = npc.dialogue[dialogueIndex] || ''

  return (
    <>
      <motion.div
        className="absolute z-10 text-4xl cursor-pointer select-none"
        style={{
          left: `${npc.position.x}px`,
          top: `${npc.position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
        onClick={handleInteract}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {npc.emoji}
        {isNearby && (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-yellow-400 dark:bg-yellow-500 text-gray-900 px-2 py-1 rounded whitespace-nowrap"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Press E
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {showDialogue && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (dialogueIndex < npc.dialogue.length - 1) {
                setDialogueIndex(dialogueIndex + 1)
              } else {
                setShowDialogue(false)
                setDialogueIndex(0)
              }
            }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4 shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{npc.emoji}</span>
                <h3 className="text-xl font-bold">{npc.name}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {currentDialogue}
              </p>
              <button
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  if (dialogueIndex < npc.dialogue.length - 1) {
                    setDialogueIndex(dialogueIndex + 1)
                  } else {
                    setShowDialogue(false)
                    setDialogueIndex(0)
                  }
                }}
              >
                {dialogueIndex < npc.dialogue.length - 1 ? 'Next' : 'Close'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

