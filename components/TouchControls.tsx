'use client'

import { useState, useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'

export default function TouchControls() {
  const { player, setPlayerPosition } = useGameStore()
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    if (!isMoving || !touchStart) return

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      const deltaX = touch.clientX - touchStart.x
      const deltaY = touch.clientY - touchStart.y

      const newX = Math.max(0, Math.min(800, player.position.x + deltaX * 0.5))
      const newY = Math.max(0, Math.min(600, player.position.y + deltaY * 0.5))

      setPlayerPosition({ x: newX, y: newY })
      setTouchStart({ x: touch.clientX, y: touch.clientY })
    }

    const handleTouchEnd = () => {
      setIsMoving(false)
      setTouchStart(null)
    }

    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isMoving, touchStart, player.position, setPlayerPosition])

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
    setIsMoving(true)
  }

  return (
    <div
      className="fixed inset-0 z-10 md:hidden"
      onTouchStart={handleTouchStart}
      style={{ touchAction: 'none' }}
    />
  )
}

