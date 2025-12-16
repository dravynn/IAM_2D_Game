'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import type { CollectibleCoin as CollectibleCoinType } from '@/types/game'
import ParticleEffect from './ParticleEffect'
import { showNotification } from './Notification'

interface CollectibleCoinProps {
  coin: CollectibleCoinType
  playerPosition: { x: number; y: number }
}

export default function CollectibleCoin({ coin, playerPosition }: CollectibleCoinProps) {
  const { collectCoin } = useGameStore()
  const [showParticles, setShowParticles] = useState(false)
  const [isCollecting, setIsCollecting] = useState(false)

  const distance = Math.sqrt(
    Math.pow(coin.position.x - playerPosition.x, 2) +
    Math.pow(coin.position.y - playerPosition.y, 2)
  )

  const isNearby = distance < 50

  useEffect(() => {
    if (isNearby && !coin.collected && !isCollecting) {
      setIsCollecting(true)
      setShowParticles(true)
      collectCoin(coin.id)
      showNotification({
        type: 'reward',
        message: 'Coin Collected!',
        amount: coin.value,
      })
      setTimeout(() => setShowParticles(false), 1000)
    }
  }, [isNearby, coin.id, coin.collected, coin.value, isCollecting, collectCoin])

  if (coin.collected) return null

  return (
    <>
      <motion.div
        className="absolute z-5 text-3xl select-none pointer-events-none drop-shadow-lg"
        style={{
          left: `${coin.position.x}px`,
          top: `${coin.position.y}px`,
          transform: 'translate(-50%, -50%)',
          filter: isNearby ? 'brightness(1.5)' : 'none',
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
          scale: isNearby ? [1.5, 1.8, 1.5] : [1, 1.3, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="relative">
          🪙
          {isNearby && (
            <motion.span
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-yellow-400 whitespace-nowrap"
              animate={{ opacity: [0, 1, 0], y: [-10, -20] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              +{coin.value}
            </motion.span>
          )}
        </span>
      </motion.div>
      <AnimatePresence>
        {showParticles && (
          <ParticleEffect x={coin.position.x} y={coin.position.y} emoji="✨" />
        )}
      </AnimatePresence>
    </>
  )
}

