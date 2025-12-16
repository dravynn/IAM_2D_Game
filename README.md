# IAM QUEST 🎮

A web-based 2D quest game where you play as a divine hero ("I Am That I Am") exploring zones, completing daily quests, helping NPCs, and collecting IAM tokens.

## 🚀 Features

- **2D Top-Down Gameplay**: Explore three unique zones with smooth player movement
- **Quest System**: Complete quests by talking to NPCs and collecting coins
- **IAM Token Economy**: Earn tokens through quests, daily bonuses, and coin collection
- **Daily Login Bonus**: Claim rewards for consecutive daily logins
- **Interactive NPCs**: Talk to NPCs to receive quests and learn about the world
- **Collectible Coins**: Find and collect IAM coins scattered throughout zones
- **Quest Log**: Track your active quests and objectives
- **Dark/Light Mode**: Toggle between themes for comfortable gameplay
- **Responsive Design**: Play on desktop or mobile devices
- **Local Storage**: Your progress is automatically saved

## 🎯 Game Zones

1. **Sacred Grove** 🌳 - A peaceful forest where your journey begins
2. **Crystal Caves** 💎 - Mysterious caves filled with glowing crystals
3. **Divine Peak** ⛰️ - The highest mountain where divine power flows

## 🎮 Controls

### Desktop
- **WASD** or **Arrow Keys**: Move your character
- **E**: Interact with NPCs
- **Click Quest Button**: Open/close quest log
- **Click Zone Transitions**: Move between zones

### Mobile
- **Tap and Drag**: Move your character
- **Directional Buttons**: Use on-screen controls
- **Tap NPCs**: Interact with NPCs
- **Bottom Navbar**: Navigate zones and access quest log

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Storage**: localStorage (via Zustand persist)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main game page
├── components/
│   ├── Player.tsx           # Player character component
│   ├── NPC.tsx              # NPC interaction component
│   ├── CollectibleCoin.tsx  # Collectible coin component
│   ├── GameCanvas.tsx       # Main game canvas
│   ├── HUD.tsx              # Top HUD (tokens, zone)
│   ├── QuestSidebar.tsx     # Quest log sidebar
│   ├── BottomNavbar.tsx     # Mobile navigation
│   ├── DailyLoginModal.tsx  # Daily bonus modal
│   └── MovementControls.tsx # Mobile movement controls
├── store/
│   └── gameStore.ts         # Zustand game state store
└── types/
    └── game.ts              # TypeScript type definitions
```

## 🎨 Game Mechanics

### Quests
- Each zone has unique quests
- Complete objectives to finish quests
- Earn IAM tokens as rewards
- Quests auto-complete when all objectives are met

### IAM Tokens
- Earn tokens by:
  - Completing quests
  - Collecting coins
  - Daily login bonuses
- Tokens are saved in localStorage

### Daily Login Bonus
- Login each day to claim bonuses
- Streak increases bonus amount
- Bonus = 50 + (streak × 10) IAM tokens

## 🔮 Future Features

- Connect to Stellar wallet (Lobstr or Freighter)
- Real blockchain IAM token integration
- Dynamic leaderboard
- Real-time event zones
- On-chain staking to unlock hidden areas
- More zones and quests
- Player achievements
- Inventory system

## 📝 License

This project is open source and available for personal use.

## 🙏 Credits

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS.

