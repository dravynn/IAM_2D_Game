export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Velocity {
  vx: number
  vy: number
}

export interface Player {
  position: Position
  velocity: Velocity
  size: Size
  onGround: boolean
  facingRight: boolean
  health: number
  maxHealth: number
}

export interface Coin {
  id: string
  position: Position
  size: Size
  collected: boolean
  value: number
}

export interface Obstacle {
  id: string
  position: Position
  size: Size
  type: 'spike' | 'pit' | 'platform' | 'barrier' | 'flag'
}

export interface Level {
  id: string
  name: string
  description: string
  width: number
  height: number
  coins: Coin[]
  obstacles: Obstacle[]
  startPosition: Position
  endPosition: Position
  requiredCoins: number
  unlocked: boolean
}

export interface GameState {
  currentLevel: number
  totalIAM: number
  levelsUnlocked: number[]
  playerUpgrades: {
    speed: number
    jumpPower: number
    health: number
  }
}

