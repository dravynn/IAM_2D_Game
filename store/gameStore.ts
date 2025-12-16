import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { format, isToday, parseISO } from 'date-fns'
import type { Position, Zone, Quest, NPC, CollectibleCoin, Player, DailyLogin, Achievement, PlayerStats } from '@/types/game'

interface GameState {
  // Player state
  player: Player
  iamTokens: number
  
  // Zones
  zones: Zone[]
  currentZoneId: string
  
  // Quests
  quests: Quest[]
  activeQuestId: string | null
  
  // NPCs
  npcs: NPC[]
  
  // Collectibles
  coins: CollectibleCoin[]
  
  // Daily login
  dailyLogin: DailyLogin
  
  // Achievements
  achievements: Achievement[]
  
  // Player stats
  playerStats: PlayerStats
  
  // UI state
  darkMode: boolean
  questSidebarOpen: boolean
  statsPanelOpen: boolean
  
  // Actions
  setPlayerPosition: (position: Position) => void
  setCurrentZone: (zoneId: string) => void
  addTokens: (amount: number) => void
  completeQuest: (questId: string) => void
  collectCoin: (coinId: string) => void
  interactWithNPC: (npcId: string) => void
  checkDailyLogin: () => void
  claimDailyBonus: () => void
  toggleDarkMode: () => void
  toggleQuestSidebar: () => void
  toggleStatsPanel: () => void
  addExperience: (amount: number) => void
  unlockAchievement: (achievementId: string) => void
  initializeGame: () => void
}

const initialZones: Zone[] = [
  {
    id: 'sacred-grove',
    name: 'Sacred Grove',
    description: 'A peaceful forest where your journey begins',
    color: 'green',
    emoji: '🌳',
  },
  {
    id: 'crystal-caves',
    name: 'Crystal Caves',
    description: 'Mysterious caves filled with glowing crystals',
    color: 'blue',
    emoji: '💎',
  },
  {
    id: 'divine-peak',
    name: 'Divine Peak',
    description: 'The highest mountain where divine power flows',
    color: 'purple',
    emoji: '⛰️',
  },
]

const initialQuests: Quest[] = [
  {
    id: 'quest-1',
    title: 'Welcome to IAM QUEST',
    description: 'Meet the guide and learn about your divine powers',
    zoneId: 'sacred-grove',
    npcId: 'npc-guide',
    completed: false,
    reward: 100,
    objectives: [
      { id: 'obj-1', description: 'Talk to the Guide', completed: false },
      { id: 'obj-2', description: 'Collect 5 IAM coins', completed: false },
    ],
  },
  {
    id: 'quest-2',
    title: 'Training Grounds',
    description: 'Learn from the Combat Trainer',
    zoneId: 'sacred-grove',
    npcId: 'npc-trainer',
    completed: false,
    reward: 150,
    objectives: [
      { id: 'obj-2a', description: 'Talk to Combat Trainer', completed: false },
      { id: 'obj-2b', description: 'Reach level 2', completed: false },
    ],
  },
  {
    id: 'quest-3',
    title: 'Crystal Collector',
    description: 'Gather crystals from the caves',
    zoneId: 'crystal-caves',
    completed: false,
    reward: 200,
    objectives: [
      { id: 'obj-3', description: 'Enter Crystal Caves', completed: false },
      { id: 'obj-4', description: 'Collect 8 coins', completed: false },
    ],
  },
  {
    id: 'quest-4',
    title: 'Merchant\'s Challenge',
    description: 'Help the Crystal Merchant',
    zoneId: 'crystal-caves',
    npcId: 'npc-merchant',
    completed: false,
    reward: 250,
    objectives: [
      { id: 'obj-4a', description: 'Talk to Crystal Merchant', completed: false },
      { id: 'obj-4b', description: 'Collect 15 coins total', completed: false },
    ],
  },
  {
    id: 'quest-5',
    title: 'Divine Ascent',
    description: 'Reach the Divine Peak',
    zoneId: 'divine-peak',
    completed: false,
    reward: 300,
    objectives: [
      { id: 'obj-5', description: 'Reach Divine Peak', completed: false },
      { id: 'obj-6', description: 'Collect 10 coins', completed: false },
    ],
  },
  {
    id: 'quest-6',
    title: 'Elder\'s Wisdom',
    description: 'Seek guidance from the Divine Elder',
    zoneId: 'divine-peak',
    npcId: 'npc-elder',
    completed: false,
    reward: 400,
    objectives: [
      { id: 'obj-6a', description: 'Talk to Divine Elder', completed: false },
      { id: 'obj-6b', description: 'Reach level 5', completed: false },
      { id: 'obj-6c', description: 'Complete 3 previous quests', completed: false },
    ],
  },
]

const initialNPCs: NPC[] = [
  {
    id: 'npc-guide',
    name: 'The Guide',
    emoji: '🧙',
    position: { x: 300, y: 200 },
    zoneId: 'sacred-grove',
    questId: 'quest-1',
    dialogue: [
      'Welcome, divine hero!',
      'You are "I Am That I Am" - a being of great power.',
      'Complete quests to earn IAM tokens and unlock new zones.',
      'Press E or tap me to interact!',
    ],
  },
  {
    id: 'npc-merchant',
    name: 'Crystal Merchant',
    emoji: '🛒',
    position: { x: 500, y: 300 },
    zoneId: 'crystal-caves',
    dialogue: [
      'Welcome to the Crystal Caves!',
      'Collect coins to earn IAM tokens.',
      'The more you collect, the stronger you become!',
    ],
  },
  {
    id: 'npc-elder',
    name: 'Divine Elder',
    emoji: '👴',
    position: { x: 400, y: 250 },
    zoneId: 'divine-peak',
    dialogue: [
      'You have reached the Divine Peak!',
      'Your journey is just beginning.',
      'Continue to explore and grow in power!',
    ],
  },
  {
    id: 'npc-trainer',
    name: 'Combat Trainer',
    emoji: '⚔️',
    position: { x: 200, y: 350 },
    zoneId: 'sacred-grove',
    dialogue: [
      'Train hard, hero!',
      'Level up to increase your speed and power.',
      'Every achievement brings you closer to divinity!',
    ],
  },
  {
    id: 'npc-collector',
    name: 'Coin Collector',
    emoji: '👛',
    position: { x: 600, y: 150 },
    zoneId: 'crystal-caves',
    dialogue: [
      'I love collecting coins!',
      'Have you found all the coins in this zone?',
      'Collect them all for a special reward!',
    ],
  },
]

const initialAchievements: Achievement[] = [
  {
    id: 'first-coin',
    title: 'First Coin',
    description: 'Collect your first IAM coin',
    icon: '🪙',
    unlocked: false,
    reward: 25,
  },
  {
    id: 'coin-collector-10',
    title: 'Coin Collector',
    description: 'Collect 10 coins',
    icon: '💰',
    unlocked: false,
    reward: 50,
  },
  {
    id: 'coin-master-30',
    title: 'Coin Master',
    description: 'Collect 30 coins',
    icon: '💎',
    unlocked: false,
    reward: 100,
  },
  {
    id: 'coin-legend-60',
    title: 'Coin Legend',
    description: 'Collect all 60 coins',
    icon: '👑',
    unlocked: false,
    reward: 500,
  },
  {
    id: 'first-quest',
    title: 'Quest Starter',
    description: 'Complete your first quest',
    icon: '🎯',
    unlocked: false,
    reward: 50,
  },
  {
    id: 'quest-master',
    title: 'Quest Master',
    description: 'Complete all quests',
    icon: '🏆',
    unlocked: false,
    reward: 300,
  },
  {
    id: 'zone-explorer',
    title: 'Zone Explorer',
    description: 'Visit all 3 zones',
    icon: '🗺️',
    unlocked: false,
    reward: 150,
  },
  {
    id: 'level-5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    unlocked: false,
    reward: 200,
  },
  {
    id: 'level-10',
    title: 'Divine Warrior',
    description: 'Reach level 10',
    icon: '🌟',
    unlocked: false,
    reward: 500,
  },
  {
    id: 'token-rich',
    title: 'Token Rich',
    description: 'Earn 1000 IAM tokens',
    icon: '💵',
    unlocked: false,
    reward: 250,
  },
]

const generateCoins = (zoneId: string, count: number): CollectibleCoin[] => {
  const coins: CollectibleCoin[] = []
  for (let i = 0; i < count; i++) {
    coins.push({
      id: `coin-${zoneId}-${i}`,
      position: {
        x: Math.random() * 700 + 100,
        y: Math.random() * 400 + 100,
      },
      zoneId,
      collected: false,
      value: Math.floor(Math.random() * 20) + 10, // Increased coin values
    })
  }
  return coins
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      player: {
        position: { x: 100, y: 100 },
        currentZone: 'sacred-grove',
        speed: 5,
      },
      iamTokens: 0,
      zones: initialZones,
      currentZoneId: 'sacred-grove',
      quests: initialQuests,
      activeQuestId: 'quest-1',
      npcs: initialNPCs,
      coins: [
        ...generateCoins('sacred-grove', 15),
        ...generateCoins('crystal-caves', 20),
        ...generateCoins('divine-peak', 25),
      ],
      dailyLogin: {
        lastLoginDate: '',
        streak: 0,
        claimed: false,
      },
      darkMode: false,
      questSidebarOpen: false,
      statsPanelOpen: false,
      notifications: [],
      achievements: initialAchievements,
      playerStats: {
        level: 1,
        experience: 0,
        experienceToNextLevel: 100,
        totalCoinsCollected: 0,
        totalQuestsCompleted: 0,
        totalTokensEarned: 0,
        playTime: 0,
        zonesUnlocked: 1,
      },

      // Actions
      setPlayerPosition: (position) =>
        set((state) => ({
          player: { ...state.player, position },
        })),

      setCurrentZone: (zoneId) =>
        set((state) => {
          // Check if zone is unlocked (for now, all zones are accessible)
          // In future, can add unlock logic based on quest completion
          
          // Update quest objectives for zone entry
          let updatedQuests = state.quests.map((q) => {
            if (q.zoneId === zoneId && !q.completed) {
              const objectives = q.objectives.map((obj) => {
                if ((obj.description.includes('Enter') || obj.description.includes('Reach')) && !obj.completed) {
                  return { ...obj, completed: true }
                }
                return obj
              })
              
              // Check if all objectives are completed
              const allCompleted = objectives.every((obj) => obj.completed)
              if (allCompleted && !q.completed) {
                return { ...q, objectives, completed: true }
              }
              
              return { ...q, objectives }
            }
            return q
          })

          // Auto-complete quest and add reward
          const completedQuest = updatedQuests.find(
            (q) => q.zoneId === zoneId && q.completed && !state.quests.find((oq) => oq.id === q.id)?.completed
          )
          const tokenReward = completedQuest ? completedQuest.reward : 0

          // Show quest completion notification
          if (completedQuest && typeof window !== 'undefined') {
            import('@/components/Notification').then(({ showNotification }) => {
              showNotification({
                type: 'quest',
                message: `Quest Completed: ${completedQuest.title}!`,
                amount: completedQuest.reward,
              })
            })
          }

          return {
            currentZoneId: zoneId,
            player: { ...state.player, currentZone: zoneId },
            quests: updatedQuests,
            iamTokens: state.iamTokens + tokenReward,
          }
        }),

      addTokens: (amount) =>
        set((state) => ({
          iamTokens: state.iamTokens + amount,
        })),

      completeQuest: (questId) =>
        set((state) => {
          const quest = state.quests.find((q) => q.id === questId)
          if (!quest || quest.completed) return state

          const updatedQuests = state.quests.map((q) =>
            q.id === questId ? { ...q, completed: true } : q
          )

          return {
            quests: updatedQuests,
            iamTokens: state.iamTokens + quest.reward,
          }
        }),

      collectCoin: (coinId) =>
        set((state) => {
          const coin = state.coins.find((c) => c.id === coinId)
          if (!coin || coin.collected) return state

          const updatedCoins = state.coins.map((c) =>
            c.id === coinId ? { ...c, collected: true } : c
          )

          // Update quest objectives
          const collectedCount = updatedCoins.filter(
            (c) => c.collected && c.zoneId === state.currentZoneId
          ).length

          let updatedQuests = state.quests.map((q) => {
            if (q.zoneId === state.currentZoneId && !q.completed) {
              const objectives = q.objectives.map((obj) => {
                if (obj.description.includes('Collect') && !obj.completed) {
                  const match = obj.description.match(/\d+/)
                  const target = match ? parseInt(match[0]) : 0
                  if (collectedCount >= target) {
                    return { ...obj, completed: true }
                  }
                }
                return obj
              })
              
              // Check if all objectives are completed
              const allCompleted = objectives.every((obj) => obj.completed)
              if (allCompleted && !q.completed) {
                return { ...q, objectives, completed: true }
              }
              
              return { ...q, objectives }
            }
            return q
          })

          // Auto-complete quest and add reward
          const completedQuest = updatedQuests.find(
            (q) => q.id === state.activeQuestId && q.completed && !state.quests.find((oq) => oq.id === q.id)?.completed
          )
          const tokenReward = completedQuest ? completedQuest.reward : 0

          return {
            coins: updatedCoins,
            quests: updatedQuests,
            iamTokens: state.iamTokens + coin.value + tokenReward,
          }
        }),

      interactWithNPC: (npcId) =>
        set((state) => {
          const npc = state.npcs.find((n) => n.id === npcId)
          if (!npc) return state

          // Complete "Talk to" objectives
          let updatedQuests = state.quests.map((q) => {
            if (q.npcId === npcId && !q.completed) {
              const objectives = q.objectives.map((obj) => {
                if (obj.description.includes('Talk to') && !obj.completed) {
                  return { ...obj, completed: true }
                }
                return obj
              })
              
              // Check if all objectives are completed
              const allCompleted = objectives.every((obj) => obj.completed)
              if (allCompleted && !q.completed) {
                return { ...q, objectives, completed: true }
              }
              
              return { ...q, objectives }
            }
            return q
          })

          // Auto-complete quest and add reward
          const completedQuest = updatedQuests.find(
            (q) => q.npcId === npcId && q.completed && !state.quests.find((oq) => oq.id === q.id)?.completed
          )
          const tokenReward = completedQuest ? completedQuest.reward : 0

          // Update stats
          const totalQuestsCompleted = updatedQuests.filter((q) => q.completed).length
          const newStats = {
            ...state.playerStats,
            totalQuestsCompleted,
            totalTokensEarned: state.iamTokens + tokenReward,
          }

          // Check achievements
          let updatedAchievements = [...state.achievements]
          if (totalQuestsCompleted === 1 && !updatedAchievements.find((a) => a.id === 'first-quest')?.unlocked) {
            const achievement = updatedAchievements.find((a) => a.id === 'first-quest')
            if (achievement) {
              achievement.unlocked = true
              achievement.unlockedAt = new Date().toISOString()
              newStats.totalTokensEarned += achievement.reward
            }
          }
          if (totalQuestsCompleted === updatedQuests.length && !updatedAchievements.find((a) => a.id === 'quest-master')?.unlocked) {
            const achievement = updatedAchievements.find((a) => a.id === 'quest-master')
            if (achievement) {
              achievement.unlocked = true
              achievement.unlockedAt = new Date().toISOString()
              newStats.totalTokensEarned += achievement.reward
            }
          }

          // Add XP for quest completion
          const xpGain = completedQuest ? 50 : 0
          const newXP = newStats.experience + xpGain
          let levelUp = false
          if (newXP >= newStats.experienceToNextLevel) {
            newStats.level += 1
            newStats.experience = newXP - newStats.experienceToNextLevel
            newStats.experienceToNextLevel = Math.floor(newStats.experienceToNextLevel * 1.5)
            levelUp = true
          } else {
            newStats.experience = newXP
          }

          // Show quest completion notification
          if (completedQuest && typeof window !== 'undefined') {
            import('@/components/Notification').then(({ showNotification }) => {
              showNotification({
                type: 'quest',
                message: `Quest Completed: ${completedQuest.title}!`,
                amount: completedQuest.reward,
              })
            })
          }

          if (levelUp && typeof window !== 'undefined') {
            import('@/components/Notification').then(({ showNotification }) => {
              showNotification({
                type: 'success',
                message: `Level Up! You are now level ${newStats.level}!`,
              })
            })
          }

          return {
            quests: updatedQuests,
            iamTokens: state.iamTokens + tokenReward,
            playerStats: newStats,
            achievements: updatedAchievements,
          }
        }),

      checkDailyLogin: () =>
        set((state) => {
          const today = format(new Date(), 'yyyy-MM-dd')
          const lastLogin = state.dailyLogin.lastLoginDate

          if (!lastLogin) {
            return {
              dailyLogin: {
                lastLoginDate: today,
                streak: 1,
                claimed: false,
              },
            }
          }

          if (isToday(parseISO(lastLogin))) {
            return state // Already logged in today
          }

          const lastLoginDate = parseISO(lastLogin)
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)

          const newStreak = isToday(lastLoginDate) || 
            format(lastLoginDate, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')
            ? state.dailyLogin.streak + 1
            : 1

          return {
            dailyLogin: {
              lastLoginDate: today,
              streak: newStreak,
              claimed: false,
            },
          }
        }),

      claimDailyBonus: () =>
        set((state) => {
          if (state.dailyLogin.claimed) return state

          const bonus = 50 + state.dailyLogin.streak * 10
          return {
            dailyLogin: { ...state.dailyLogin, claimed: true },
            iamTokens: state.iamTokens + bonus,
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

      toggleQuestSidebar: () =>
        set((state) => ({
          questSidebarOpen: !state.questSidebarOpen,
        })),

      toggleStatsPanel: () =>
        set((state) => ({
          statsPanelOpen: !state.statsPanelOpen,
        })),

      addExperience: (amount) =>
        set((state) => {
          const newXP = state.playerStats.experience + amount
          let newStats = { ...state.playerStats }
          let levelUp = false

          if (newXP >= newStats.experienceToNextLevel) {
            newStats.level += 1
            newStats.experience = newXP - newStats.experienceToNextLevel
            newStats.experienceToNextLevel = Math.floor(newStats.experienceToNextLevel * 1.5)
            levelUp = true
          } else {
            newStats.experience = newXP
          }

          if (levelUp && typeof window !== 'undefined') {
            import('@/components/Notification').then(({ showNotification }) => {
              showNotification({
                type: 'success',
                message: `Level Up! You are now level ${newStats.level}!`,
              })
            })
          }

          return { playerStats: newStats }
        }),

      unlockAchievement: (achievementId) =>
        set((state) => {
          const updatedAchievements = state.achievements.map((a) =>
            a.id === achievementId && !a.unlocked
              ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() }
              : a
          )

          const achievement = updatedAchievements.find((a) => a.id === achievementId)
          if (achievement && achievement.unlocked) {
            return {
              achievements: updatedAchievements,
              iamTokens: state.iamTokens + achievement.reward,
            }
          }

          return { achievements: updatedAchievements }
        }),

      initializeGame: () => {
        const state = get()
        state.checkDailyLogin()
        if (typeof window !== 'undefined') {
          document.documentElement.classList.toggle('dark', state.darkMode)
        }
      },
    }),
    {
      name: 'iam-quest-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        player: state.player,
        iamTokens: state.iamTokens,
        currentZoneId: state.currentZoneId,
        quests: state.quests,
        activeQuestId: state.activeQuestId,
        coins: state.coins,
        dailyLogin: state.dailyLogin,
        darkMode: state.darkMode,
      }),
    }
  )
)

