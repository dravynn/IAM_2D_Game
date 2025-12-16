'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface Notification {
  id: string
  type: 'success' | 'info' | 'reward' | 'quest' | 'achievement' | 'levelup'
  message: string
  amount?: number
  icon?: string
}

interface NotificationProps {
  notification: Notification
  onRemove: (id: string) => void
}

export default function NotificationComponent({ notification, onRemove }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id)
    }, 3000)

    return () => clearTimeout(timer)
  }, [notification.id, onRemove])

  const getIcon = () => {
    if (notification.icon) return notification.icon
    switch (notification.type) {
      case 'success':
        return '✅'
      case 'reward':
        return '💰'
      case 'quest':
        return '🎯'
      case 'achievement':
        return '🏆'
      case 'levelup':
        return '⭐'
      default:
        return 'ℹ️'
    }
  }

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-500'
      case 'reward':
        return 'bg-yellow-500'
      case 'quest':
        return 'bg-purple-500'
      case 'achievement':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500'
      case 'levelup':
        return 'bg-gradient-to-r from-purple-500 to-pink-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <motion.div
      className={`${getBgColor()} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[280px] max-w-sm`}
      initial={{ opacity: 0, y: -50, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
    >
      <span className="text-2xl">{getIcon()}</span>
      <div className="flex-1">
        <p className="font-semibold">{notification.message}</p>
        {notification.amount && (
          <p className="text-sm opacity-90">+{notification.amount} IAM</p>
        )}
      </div>
    </motion.div>
  )
}

export function NotificationContainer() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const handleNotification = (event: CustomEvent<Notification>) => {
      setNotifications((prev) => [...prev, event.detail])
    }

    window.addEventListener('show-notification', handleNotification as EventListener)
    return () => {
      window.removeEventListener('show-notification', handleNotification as EventListener)
    }
  }, [])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationComponent
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export function showNotification(notification: Omit<Notification, 'id'>) {
  const event = new CustomEvent<Notification>('show-notification', {
    detail: { ...notification, id: Date.now().toString() },
  })
  window.dispatchEvent(event)
}

