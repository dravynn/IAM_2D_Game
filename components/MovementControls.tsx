'use client'

import { useGameStore } from '@/store/gameStore'

export default function MovementControls() {
  const { player, setPlayerPosition } = useGameStore()

  const move = (direction: 'up' | 'down' | 'left' | 'right') => {
    let newX = player.position.x
    let newY = player.position.y

    const maxX = typeof window !== 'undefined' ? Math.min(window.innerWidth - 50, 800) : 800
    const maxY = typeof window !== 'undefined' ? Math.min(window.innerHeight - 200, 600) : 600

    switch (direction) {
      case 'up':
        newY = Math.max(0, newY - player.speed * 3)
        break
      case 'down':
        newY = Math.min(maxY, newY + player.speed * 3)
        break
      case 'left':
        newX = Math.max(0, newX - player.speed * 3)
        break
      case 'right':
        newX = Math.min(maxX, newX + player.speed * 3)
        break
    }

    setPlayerPosition({ x: newX, y: newY })
  }

  return (
    <div className="fixed bottom-24 right-4 z-20 md:hidden">
      <div className="grid grid-cols-3 gap-1">
        <div></div>
        <button
          onClick={() => move('up')}
          className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 text-2xl shadow-lg active:scale-95 transition-transform"
        >
          ↑
        </button>
        <div></div>
        <button
          onClick={() => move('left')}
          className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 text-2xl shadow-lg active:scale-95 transition-transform"
        >
          ←
        </button>
        <button
          onClick={() => move('down')}
          className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 text-2xl shadow-lg active:scale-95 transition-transform"
        >
          ↓
        </button>
        <button
          onClick={() => move('right')}
          className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 text-2xl shadow-lg active:scale-95 transition-transform"
        >
          →
        </button>
      </div>
    </div>
  )
}
