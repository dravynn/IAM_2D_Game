'use client'

import { usePlatformerStore } from '@/store/platformerStore'
import { useRef } from 'react'

export default function MobileControls() {
  const { player, setPlayerVelocity, setPlayerFacing, setPlayerOnGround } = usePlatformerStore()
  const leftPressed = useRef(false)
  const rightPressed = useRef(false)

  const handleLeftStart = () => {
    leftPressed.current = true
    setPlayerFacing(false)
    if (typeof window !== 'undefined' && (window as any).setMobileLeft) {
      ;(window as any).setMobileLeft(true)
    }
  }

  const handleLeftEnd = () => {
    leftPressed.current = false
    if (typeof window !== 'undefined' && (window as any).setMobileLeft) {
      ;(window as any).setMobileLeft(false)
    }
  }

  const handleRightStart = () => {
    rightPressed.current = true
    setPlayerFacing(true)
    if (typeof window !== 'undefined' && (window as any).setMobileRight) {
      ;(window as any).setMobileRight(true)
    }
  }

  const handleRightEnd = () => {
    rightPressed.current = false
    if (typeof window !== 'undefined' && (window as any).setMobileRight) {
      ;(window as any).setMobileRight(false)
    }
  }

  const handleJump = () => {
    if (player.onGround) {
      setPlayerVelocity({ vx: player.velocity.vx, vy: -15 })
      setPlayerOnGround(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-30 md:hidden">
      <div className="flex flex-col gap-2">
        {/* Jump button */}
        <button
          onTouchStart={handleJump}
          onMouseDown={handleJump}
          className="w-16 h-16 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl font-bold"
        >
          ↑
        </button>
        {/* Movement buttons */}
        <div className="flex gap-2">
          <button
            onTouchStart={handleLeftStart}
            onTouchEnd={handleLeftEnd}
            onMouseDown={handleLeftStart}
            onMouseUp={handleLeftEnd}
            onMouseLeave={handleLeftEnd}
            className="w-16 h-16 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center text-2xl font-bold"
          >
            ←
          </button>
          <button
            onTouchStart={handleRightStart}
            onTouchEnd={handleRightEnd}
            onMouseDown={handleRightStart}
            onMouseUp={handleRightEnd}
            onMouseLeave={handleRightEnd}
            className="w-16 h-16 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center text-2xl font-bold"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

