'use client'

import { useEffect } from 'react'
import GameCanvas from '@/components/GameCanvas'
import HUD from '@/components/HUD'
import QuestSidebar from '@/components/QuestSidebar'
import BottomNavbar from '@/components/BottomNavbar'
import DailyLoginModal from '@/components/DailyLoginModal'
import MovementControls from '@/components/MovementControls'
import { NotificationContainer } from '@/components/Notification'
import StatsPanel from '@/components/StatsPanel'
import ZoneMap from '@/components/ZoneMap'
import { useGameStore } from '@/store/gameStore'

export default function Home() {
  const { darkMode } = useGameStore()

  useEffect(() => {
    // Apply dark mode class on mount
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <HUD />
      <div className="absolute top-16 bottom-0 left-0 right-0 md:bottom-0" style={{ height: 'calc(100vh - 4rem)' }}>
        <GameCanvas />
      </div>
      <QuestSidebar />
      <StatsPanel />
      <ZoneMap />
      <BottomNavbar />
      <MovementControls />
      <DailyLoginModal />
      <NotificationContainer />

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 z-20 hidden md:block">
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Controls:</strong> WASD or Arrow Keys to move | E to interact
          </p>
        </div>
      </div>
    </main>
  )
}

