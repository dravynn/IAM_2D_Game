export interface Position {
  x: number
  y: number
}

export interface Zone {
  id: string
  name: string
  description: string
  color: string
  emoji: string
}

export interface Quest {
  id: string
  title: string
  description: string
  zoneId: string
  npcId?: string
  completed: boolean
  reward: number
  objectives: QuestObjective[]
}

export interface QuestObjective {
  id: string
  description: string
  completed: boolean
}

export interface NPC {
  id: string
  name: string
  emoji: string
  position: Position
  zoneId: string
  questId?: string
  dialogue: string[]
}

export interface CollectibleCoin {
  id: string
  position: Position
  zoneId: string
  collected: boolean
  value: number
}

export interface Player {
  position: Position
  currentZone: string
  speed: number
}

export interface DailyLogin {
  lastLoginDate: string
  streak: number
  claimed: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
  reward: number
}

export interface PlayerStats {
  level: number
  experience: number
  experienceToNextLevel: number
  totalCoinsCollected: number
  totalQuestsCompleted: number
  totalTokensEarned: number
  playTime: number // in seconds
  zonesUnlocked: number
}

