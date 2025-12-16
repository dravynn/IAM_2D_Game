'use client'

import type { Obstacle as ObstacleType } from '@/types/platformer'
import { usePlatformerStore } from '@/store/platformerStore'

interface ObstacleProps {
  obstacle: ObstacleType
}

export default function Obstacle({ obstacle }: ObstacleProps) {
  const { currentCoins, levels, currentLevelIndex } = usePlatformerStore()
  const currentLevel = levels[currentLevelIndex]
  const collectedCount = currentCoins.filter((c) => c.collected).length

  // Hide barrier if enough coins collected
  if (obstacle.type === 'barrier' && collectedCount >= currentLevel.requiredCoins) {
    return null
  }

  const getObstacleContent = () => {
    switch (obstacle.type) {
      case 'spike':
        return (
          <div className="w-full h-full bg-red-600 flex items-end justify-center text-2xl">
            ⬇️
          </div>
        )
      case 'pit':
        return (
          <div className="w-full h-full bg-gray-800 dark:bg-gray-900 border-2 border-gray-600" />
        )
      case 'platform':
        return (
          <div className="w-full h-full bg-gradient-to-b from-green-600 to-green-800 rounded-t-lg border-2 border-green-400" />
        )
      case 'barrier':
        return (
          <div className="w-full h-full bg-gradient-to-r from-red-700 to-red-900 flex items-center justify-center text-3xl border-4 border-red-500">
            🚧
          </div>
        )
      case 'flag':
        return (
          <div className="w-full h-full flex flex-col items-center">
            <div className="text-4xl">🏁</div>
            <div className="w-1 h-full bg-gradient-to-b from-red-500 to-red-700 mt-2" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="absolute z-5"
      style={{
        left: `${obstacle.position.x}px`,
        top: `${obstacle.position.y}px`,
        width: `${obstacle.size.width}px`,
        height: `${obstacle.size.height}px`,
      }}
    >
      {getObstacleContent()}
    </div>
  )
}

