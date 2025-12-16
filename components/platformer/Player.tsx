'use client'

import { motion } from 'framer-motion'
import { usePlatformerStore } from '@/store/platformerStore'

export default function Player() {
  const { player } = usePlatformerStore()

  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: `${player.position.x}px`,
        top: `${player.position.y}px`,
        width: `${player.size.width}px`,
        height: `${player.size.height}px`,
        transform: player.facingRight ? 'scaleX(1)' : 'scaleX(-1)',
      }}
      animate={{
        y: player.onGround ? 0 : [0, -5, 0],
      }}
      transition={{
        duration: 0.3,
        repeat: player.onGround ? Infinity : 0,
      }}
    >
      <div className="w-full h-full bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-2xl shadow-lg border-2 border-blue-300">
        ⚡
      </div>
      {/* Health indicator */}
      {player.health < player.maxHealth && (
        <div className="absolute -top-6 left-0 right-0 flex gap-1 justify-center">
          {Array.from({ length: player.maxHealth }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < player.health ? 'bg-red-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

