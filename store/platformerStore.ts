import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Player, Coin, Obstacle, Level, GameState } from '@/types/platformer'

interface PlatformerState {
  // Game state
  gameState: GameState
  currentLevelIndex: number
  
  // Player
  player: Player
  
  // Levels
  levels: Level[]
  
  // Current level data
  currentCoins: Coin[]
  currentObstacles: Obstacle[]
  
  // UI
  darkMode: boolean
  showWinScreen: boolean
  showLevelComplete: boolean
  
  // Actions
  setPlayerPosition: (position: { x: number; y: number }) => void
  setPlayerVelocity: (velocity: { vx: number; vy: number }) => void
  setPlayerOnGround: (onGround: boolean) => void
  setPlayerFacing: (facingRight: boolean) => void
  collectCoin: (coinId: string) => void
  setCurrentLevel: (levelIndex: number) => void
  unlockNextLevel: () => void
  resetLevel: () => void
  toggleDarkMode: () => void
  showWin: () => void
  hideWin: () => void
  initializeGame: () => void
}

const GRAVITY = 0.8
const JUMP_POWER = -15
const MOVE_SPEED = 5
const GROUND_FRICTION = 0.85

const createLevel1 = (): Level => ({
  id: 'level-1',
  name: 'The Awakening',
  description: 'Begin your journey to restore balance',
  width: 3000,
  height: 600,
  coins: Array.from({ length: 15 }, (_, i) => ({
    id: `coin-1-${i}`,
    position: { x: 200 + i * 180, y: 400 - Math.sin(i) * 50 },
    size: { width: 30, height: 30 },
    collected: false,
    value: 10,
  })),
  obstacles: [
    // Platforms
    { id: 'platform-1', position: { x: 500, y: 450 }, size: { width: 200, height: 20 }, type: 'platform' },
    { id: 'platform-2', position: { x: 900, y: 400 }, size: { width: 200, height: 20 }, type: 'platform' },
    { id: 'platform-3', position: { x: 1300, y: 350 }, size: { width: 200, height: 20 }, type: 'platform' },
    { id: 'platform-4', position: { x: 1700, y: 300 }, size: { width: 200, height: 20 }, type: 'platform' },
    // Spikes
    { id: 'spike-1', position: { x: 700, y: 550 }, size: { width: 40, height: 50 }, type: 'spike' },
    { id: 'spike-2', position: { x: 1100, y: 550 }, size: { width: 40, height: 50 }, type: 'spike' },
    { id: 'spike-3', position: { x: 1500, y: 550 }, size: { width: 40, height: 50 }, type: 'spike' },
    // Barrier (opens after collecting 10 coins)
    { id: 'barrier-1', position: { x: 2000, y: 200 }, size: { width: 50, height: 400 }, type: 'barrier' },
    // Flag (end)
    { id: 'flag-1', position: { x: 2800, y: 300 }, size: { width: 50, height: 200 }, type: 'flag' },
  ],
  startPosition: { x: 50, y: 500 },
  endPosition: { x: 2800, y: 300 },
  requiredCoins: 10,
  unlocked: true,
})

const createLevel2 = (): Level => ({
  id: 'level-2',
  name: 'The Descent',
  description: 'Navigate through treacherous paths',
  width: 3500,
  height: 600,
  coins: Array.from({ length: 20 }, (_, i) => ({
    id: `coin-2-${i}`,
    position: { x: 200 + i * 160, y: 350 - Math.cos(i * 0.5) * 80 },
    size: { width: 30, height: 30 },
    collected: false,
    value: 15,
  })),
  obstacles: [
    // Platforms
    { id: 'platform-2-1', position: { x: 400, y: 450 }, size: { width: 150, height: 20 }, type: 'platform' },
    { id: 'platform-2-2', position: { x: 700, y: 400 }, size: { width: 150, height: 20 }, type: 'platform' },
    { id: 'platform-2-3', position: { x: 1000, y: 350 }, size: { width: 150, height: 20 }, type: 'platform' },
    { id: 'platform-2-4', position: { x: 1300, y: 300 }, size: { width: 150, height: 20 }, type: 'platform' },
    { id: 'platform-2-5', position: { x: 1600, y: 250 }, size: { width: 150, height: 20 }, type: 'platform' },
    // Spikes
    { id: 'spike-2-1', position: { x: 600, y: 550 }, size: { width: 40, height: 50 }, type: 'spike' },
    { id: 'spike-2-2', position: { x: 900, y: 550 }, size: { width: 40, height: 50 }, type: 'spike' },
    { id: 'spike-2-3', position: { x: 1200, y: 550 }, size: { width: 40, height: 50 }, type: 'spike' },
    { id: 'spike-2-4', position: { x: 1500, y: 550 }, size: { width: 40, height: 50 }, type: 'spike' },
    // Pits
    { id: 'pit-2-1', position: { x: 1800, y: 550 }, size: { width: 200, height: 50 }, type: 'pit' },
    { id: 'pit-2-2', position: { x: 2200, y: 550 }, size: { width: 200, height: 50 }, type: 'pit' },
    // Barrier
    { id: 'barrier-2-1', position: { x: 2500, y: 200 }, size: { width: 50, height: 400 }, type: 'barrier' },
    // Flag
    { id: 'flag-2', position: { x: 3300, y: 300 }, size: { width: 50, height: 200 }, type: 'flag' },
  ],
  startPosition: { x: 50, y: 500 },
  endPosition: { x: 3300, y: 300 },
  requiredCoins: 15,
  unlocked: false,
})

const createLevel3 = (): Level => ({
  id: 'level-3',
  name: 'The Awakening',
  description: 'Give back to restore balance',
  width: 4000,
  height: 600,
  coins: Array.from({ length: 25 }, (_, i) => ({
    id: `coin-3-${i}`,
    position: { x: 200 + i * 150, y: 300 - Math.sin(i * 0.3) * 100 },
    size: { width: 30, height: 30 },
    collected: false,
    value: 20,
  })),
  obstacles: [
    // Complex platform layout
    { id: 'platform-3-1', position: { x: 300, y: 450 }, size: { width: 100, height: 20 }, type: 'platform' },
    { id: 'platform-3-2', position: { x: 500, y: 400 }, size: { width: 100, height: 20 }, type: 'platform' },
    { id: 'platform-3-3', position: { x: 700, y: 350 }, size: { width: 100, height: 20 }, type: 'platform' },
    { id: 'platform-3-4', position: { x: 900, y: 300 }, size: { width: 100, height: 20 }, type: 'platform' },
    { id: 'platform-3-5', position: { x: 1100, y: 250 }, size: { width: 100, height: 20 }, type: 'platform' },
    { id: 'platform-3-6', position: { x: 1300, y: 200 }, size: { width: 100, height: 20 }, type: 'platform' },
    { id: 'platform-3-7', position: { x: 1500, y: 250 }, size: { width: 100, height: 20 }, type: 'platform' },
    { id: 'platform-3-8', position: { x: 1700, y: 300 }, size: { width: 100, height: 20 }, type: 'platform' },
    // Many spikes
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `spike-3-${i}`,
      position: { x: 400 + i * 350, y: 550 },
      size: { width: 40, height: 50 },
      type: 'spike' as const,
    })),
    // Pits
    { id: 'pit-3-1', position: { x: 2000, y: 550 }, size: { width: 300, height: 50 }, type: 'pit' },
    { id: 'pit-3-2', position: { x: 2500, y: 550 }, size: { width: 300, height: 50 }, type: 'pit' },
    // Barrier
    { id: 'barrier-3-1', position: { x: 3000, y: 200 }, size: { width: 50, height: 400 }, type: 'barrier' },
    // Flag
    { id: 'flag-3', position: { x: 3800, y: 300 }, size: { width: 50, height: 200 }, type: 'flag' },
  ],
  startPosition: { x: 50, y: 500 },
  endPosition: { x: 3800, y: 300 },
  requiredCoins: 20,
  unlocked: false,
})

const initialLevels: Level[] = [createLevel1(), createLevel2(), createLevel3()]

export const usePlatformerStore = create<PlatformerState>()(
  persist(
    (set, get) => ({
      gameState: {
        currentLevel: 0,
        totalIAM: 0,
        levelsUnlocked: [0],
        playerUpgrades: {
          speed: MOVE_SPEED,
          jumpPower: JUMP_POWER,
          health: 3,
        },
      },
      currentLevelIndex: 0,
      player: {
        position: { x: 50, y: 500 },
        velocity: { vx: 0, vy: 0 },
        size: { width: 40, height: 50 },
        onGround: false,
        facingRight: true,
        health: 3,
        maxHealth: 3,
      },
      levels: initialLevels,
      currentCoins: initialLevels[0].coins,
      currentObstacles: initialLevels[0].obstacles,
      darkMode: false,
      showWinScreen: false,
      showLevelComplete: false,

      setPlayerPosition: (position) =>
        set((state) => ({
          player: { ...state.player, position },
        })),

      setPlayerVelocity: (velocity) =>
        set((state) => ({
          player: { ...state.player, velocity },
        })),

      setPlayerOnGround: (onGround) =>
        set((state) => ({
          player: { ...state.player, onGround },
        })),

      setPlayerFacing: (facingRight) =>
        set((state) => ({
          player: { ...state.player, facingRight },
        })),

      collectCoin: (coinId) =>
        set((state) => {
          const coin = state.currentCoins.find((c) => c.id === coinId)
          if (!coin || coin.collected) return state

          const updatedCoins = state.currentCoins.map((c) =>
            c.id === coinId ? { ...c, collected: true } : c
          )

          const newTotalIAM = state.gameState.totalIAM + coin.value

          return {
            currentCoins: updatedCoins,
            gameState: {
              ...state.gameState,
              totalIAM: newTotalIAM,
            },
          }
        }),

      setCurrentLevel: (levelIndex) =>
        set((state) => {
          const level = state.levels[levelIndex]
          if (!level || !level.unlocked) return state

          return {
            currentLevelIndex: levelIndex,
            player: {
              ...state.player,
              position: level.startPosition,
              velocity: { vx: 0, vy: 0 },
              onGround: false,
            },
            currentCoins: level.coins.map((c) => ({ ...c, collected: false })),
            currentObstacles: level.obstacles,
            gameState: {
              ...state.gameState,
              currentLevel: levelIndex,
            },
          }
        }),

      unlockNextLevel: () =>
        set((state) => {
          const nextLevelIndex = state.currentLevelIndex + 1
          if (nextLevelIndex >= state.levels.length) return state

          const updatedLevels = state.levels.map((level, index) =>
            index === nextLevelIndex ? { ...level, unlocked: true } : level
          )

          return {
            levels: updatedLevels,
            gameState: {
              ...state.gameState,
              levelsUnlocked: [...state.gameState.levelsUnlocked, nextLevelIndex],
            },
          }
        }),

      resetLevel: () =>
        set((state) => {
          const level = state.levels[state.currentLevelIndex]
          return {
            player: {
              ...state.player,
              position: level.startPosition,
              velocity: { vx: 0, vy: 0 },
              onGround: false,
              health: state.gameState.playerUpgrades.health,
            },
            currentCoins: level.coins.map((c) => ({ ...c, collected: false })),
          }
        }),

      toggleDarkMode: () =>
        set((state) => {
          const newMode = !state.darkMode
          if (typeof window !== 'undefined') {
            document.documentElement.classList.toggle('dark', newMode)
          }
          return { darkMode: newMode }
        }),

      showWin: () => set({ showWinScreen: true }),
      hideWin: () => set({ showWinScreen: false }),

      initializeGame: () => {
        const state = get()
        if (typeof window !== 'undefined') {
          document.documentElement.classList.toggle('dark', state.darkMode)
        }
      },
    }),
    {
      name: 'iam-awakening-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        gameState: state.gameState,
        currentLevelIndex: state.currentLevelIndex,
        levels: state.levels,
        darkMode: state.darkMode,
      }),
    }
  )
)

export { GRAVITY, JUMP_POWER, MOVE_SPEED, GROUND_FRICTION }

