'use client'

import { useEffect } from 'react'
import GameCanvas from '@/components/platformer/GameCanvas'
import HUD from '@/components/platformer/HUD'
import WinScreen from '@/components/platformer/WinScreen'
import LevelSelect from '@/components/platformer/LevelSelect'
import MobileControls from '@/components/platformer/MobileControls'
import { usePlatformerStore } from '@/store/platformerStore'

export default function Home() {
  const { darkMode, initializeGame } = usePlatformerStore()

  useEffect(() => {
    initializeGame()
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode, initializeGame])

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <HUD />
      <div className="absolute top-16 bottom-0 left-0 right-0">
        <GameCanvas />
      </div>
      <LevelSelect />
      <MobileControls />
      <WinScreen />

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 z-20 md:hidden">
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Controls:</strong> Use buttons or WASD/Arrows
          </p>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-20 hidden md:block">
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Controls:</strong> WASD or Arrow Keys | Space/W to Jump
          </p>
        </div>
      </div>
    </main>
  )
}
