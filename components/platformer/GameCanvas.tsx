'use client'

import { useEffect, useRef } from 'react'
import { usePlatformerStore } from '@/store/platformerStore'
import { usePlatformerPhysics } from '@/hooks/usePlatformerPhysics'
import Player from './Player'
import Coin from './Coin'
import Obstacle from './Obstacle'

export default function GameCanvas() {
  const {
    player,
    currentCoins,
    currentObstacles,
    levels,
    currentLevelIndex,
    initializeGame,
  } = usePlatformerStore()

  const canvasRef = useRef<HTMLDivElement>(null)

  usePlatformerPhysics()

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  useEffect(() => {
    // Camera follow player
    if (canvasRef.current) {
      const offsetX = Math.max(0, player.position.x - window.innerWidth / 2)
      canvasRef.current.style.transform = `translateX(-${offsetX}px)`
    }
  }, [player.position.x])

  const currentLevel = levels[currentLevelIndex]
  const collectedCount = currentCoins.filter((c) => c.collected).length

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-sky-200 to-blue-300 dark:from-gray-900 dark:to-gray-800">
      {/* Ground */}
      <div
        className="absolute bottom-0 left-0 bg-gradient-to-b from-green-600 to-green-800 border-t-4 border-green-400"
        style={{
          width: `${currentLevel.width}px`,
          height: '50px',
        }}
      />

      {/* Background elements */}
      <div
        className="absolute bottom-0 left-0 opacity-20"
        style={{
          width: `${currentLevel.width}px`,
          height: '100%',
        }}
      >
        {Array.from({ length: Math.floor(currentLevel.width / 200) }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 text-6xl"
            style={{ left: `${i * 200}px` }}
          >
            🌳
          </div>
        ))}
      </div>

      {/* Game objects container */}
      <div
        ref={canvasRef}
        className="absolute inset-0 transition-transform duration-100 ease-linear"
        style={{
          width: `${currentLevel.width}px`,
          height: `${currentLevel.height}px`,
        }}
      >
        {/* Obstacles */}
        {currentObstacles.map((obstacle) => (
          <Obstacle key={obstacle.id} obstacle={obstacle} />
        ))}

        {/* Coins */}
        {currentCoins.map((coin) => (
          <Coin key={coin.id} coin={coin} />
        ))}

        {/* Player */}
        <Player />
      </div>

      {/* Coin progress indicator */}
      <div className="absolute top-20 left-4 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg px-4 py-2 shadow-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Coins: {collectedCount}/{currentLevel.requiredCoins}
        </div>
        <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
          <div
            className="h-full bg-yellow-500 rounded-full transition-all duration-300"
            style={{
              width: `${(collectedCount / currentLevel.requiredCoins) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

