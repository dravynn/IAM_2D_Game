'use client'

import { motion } from 'framer-motion'

interface ParticleEffectProps {
  x: number
  y: number
  amount?: number
  emoji?: string
}

export default function ParticleEffect({ x, y, amount = 8, emoji = '✨' }: ParticleEffectProps) {
  return (
    <>
      {Array.from({ length: amount }).map((_, i) => {
        const angle = (360 / amount) * i
        const distance = 50 + Math.random() * 30
        const radians = (angle * Math.PI) / 180
        const targetX = x + Math.cos(radians) * distance
        const targetY = y + Math.sin(radians) * distance

        return (
          <motion.div
            key={i}
            className="absolute text-2xl pointer-events-none z-50"
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: targetX - x,
              y: targetY - y,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            {emoji}
          </motion.div>
        )
      })}
    </>
  )
}

