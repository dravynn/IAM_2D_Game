'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import Player from './Player'
import NPC from './NPC'
import CollectibleCoin from './CollectibleCoin'

export default function GameCanvas() {
  const {
    currentZoneId,
    zones,
    player,
    npcs,
    coins,
    initializeGame,
  } = useGameStore()

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const currentZone = zones.find((z) => z.id === currentZoneId)
  const zoneNPCs = npcs.filter((n) => n.zoneId === currentZoneId)
  const zoneCoins = coins.filter((c) => c.zoneId === currentZoneId && !c.collected)

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden" style={{ minHeight: '600px' }}>
      {/* Zone Background with animated gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: currentZone?.color === 'green'
            ? 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)'
            : currentZone?.color === 'blue'
            ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)'
            : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Zone Emoji Background Pattern with animation */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="text-9xl">{currentZone?.emoji}</span>
      </motion.div>

      {/* Floating particles effect */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Game Objects */}
      {zoneCoins.map((coin) => (
        <CollectibleCoin
          key={coin.id}
          coin={coin}
          playerPosition={player.position}
        />
      ))}

      {zoneNPCs.map((npc) => (
        <NPC key={npc.id} npc={npc} playerPosition={player.position} />
      ))}

      <Player />

      {/* Zone Transition Areas */}
      {currentZoneId === 'sacred-grove' && (
        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-full bg-blue-500 opacity-30 cursor-pointer hover:opacity-60 transition-opacity flex items-center justify-center"
          onClick={() => useGameStore.getState().setCurrentZone('crystal-caves')}
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: [
              '0 0 0px rgba(59, 130, 246, 0)',
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 0px rgba(59, 130, 246, 0)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <span className="text-white text-3xl">→</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-white font-semibold bg-black bg-opacity-50 px-2 py-1 rounded">
              Crystal Caves
            </span>
          </div>
        </motion.div>
      )}

      {currentZoneId === 'crystal-caves' && (
        <>
          <motion.div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-20 h-full bg-green-500 opacity-30 cursor-pointer hover:opacity-60 transition-opacity flex items-center justify-center"
            onClick={() => useGameStore.getState().setCurrentZone('sacred-grove')}
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                '0 0 0px rgba(16, 185, 129, 0)',
                '0 0 20px rgba(16, 185, 129, 0.5)',
                '0 0 0px rgba(16, 185, 129, 0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <span className="text-white text-3xl">←</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-white font-semibold bg-black bg-opacity-50 px-2 py-1 rounded">
                Sacred Grove
              </span>
            </div>
          </motion.div>
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-full bg-purple-500 opacity-30 cursor-pointer hover:opacity-60 transition-opacity flex items-center justify-center"
            onClick={() => useGameStore.getState().setCurrentZone('divine-peak')}
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                '0 0 0px rgba(139, 92, 246, 0)',
                '0 0 20px rgba(139, 92, 246, 0.5)',
                '0 0 0px rgba(139, 92, 246, 0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <span className="text-white text-3xl">→</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-white font-semibold bg-black bg-opacity-50 px-2 py-1 rounded">
                Divine Peak
              </span>
            </div>
          </motion.div>
        </>
      )}

      {currentZoneId === 'divine-peak' && (
        <motion.div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-20 h-full bg-blue-500 opacity-30 cursor-pointer hover:opacity-60 transition-opacity flex items-center justify-center"
          onClick={() => useGameStore.getState().setCurrentZone('crystal-caves')}
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: [
              '0 0 0px rgba(59, 130, 246, 0)',
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 0px rgba(59, 130, 246, 0)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <span className="text-white text-3xl">←</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-white font-semibold bg-black bg-opacity-50 px-2 py-1 rounded">
              Crystal Caves
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

