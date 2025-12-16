'use client'

import { motion } from 'framer-motion'
import type { Coin as CoinType } from '@/types/platformer'

interface CoinProps {
  coin: CoinType
}

export default function Coin({ coin }: CoinProps) {
  if (coin.collected) return null

  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: `${coin.position.x}px`,
        top: `${coin.position.y}px`,
        width: `${coin.size.width}px`,
        height: `${coin.size.height}px`,
      }}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-yellow-300">
        🪙
      </div>
    </motion.div>
  )
}

