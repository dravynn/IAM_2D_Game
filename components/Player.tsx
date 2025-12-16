'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

export default function Player() {
  const { player, setPlayerPosition } = useGameStore()
  const keysRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key.toLowerCase())
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase())
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    const moveInterval = setInterval(() => {
      const keys = keysRef.current
      let newX = player.position.x
      let newY = player.position.y

      const maxX = typeof window !== 'undefined' ? Math.min(window.innerWidth - 50, 800) : 800
      const maxY = typeof window !== 'undefined' ? Math.min(window.innerHeight - 200, 600) : 600

      if (keys.has('w') || keys.has('arrowup')) {
        newY = Math.max(0, newY - player.speed)
      }
      if (keys.has('s') || keys.has('arrowdown')) {
        newY = Math.min(maxY, newY + player.speed)
      }
      if (keys.has('a') || keys.has('arrowleft')) {
        newX = Math.max(0, newX - player.speed)
      }
      if (keys.has('d') || keys.has('arrowright')) {
        newX = Math.min(maxX, newX + player.speed)
      }

      if (newX !== player.position.x || newY !== player.position.y) {
        setPlayerPosition({ x: newX, y: newY })
      }
    }, 16) // ~60fps

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      clearInterval(moveInterval)
    }
  }, [player.position, player.speed, setPlayerPosition])

  return (
    <motion.div
      className="absolute z-20 text-5xl select-none pointer-events-none drop-shadow-2xl"
      style={{
        left: `${player.position.x}px`,
        top: `${player.position.y}px`,
        transform: 'translate(-50%, -50%)',
        filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
      }}
      animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <span className="relative">
        ⚡
        <motion.span
          className="absolute inset-0 text-yellow-300 opacity-50"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          ⚡
        </motion.span>
      </span>
    </motion.div>
  )
}

