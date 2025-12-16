# IAM: The Awakening 🎮

A modern Mario-style side-scrolling platformer web game built with **TypeScript**, **React**, and **Tailwind CSS**. Play as "I Am", a divine hero sent to restore balance to a broken world by collecting IAM tokens and giving them back to the people.

## 🎮 Game Features

### Core Gameplay
- **Side-Scrolling Platformer**: Classic Mario-style gameplay with smooth physics
- **3 Levels**: Each with unique challenges and increasing difficulty
- **IAM Token Collection**: Collect coins throughout levels to unlock barriers
- **Obstacles**: Navigate spikes, pits, platforms, and barriers
- **Win Condition**: Collect all coins and reach the flag to complete levels
- **Final Awakening**: Complete all levels to "give back" IAM tokens and restore balance

### Controls
- **Desktop**: 
  - `A` / `←` - Move left
  - `D` / `→` - Move right
  - `W` / `↑` / `Space` - Jump
- **Mobile**: 
  - On-screen directional buttons
  - Jump button

### Game Mechanics
- **Physics**: Gravity, jumping, friction, and collision detection
- **Barriers**: Collect required coins to open barriers blocking your path
- **Level Progression**: Unlock new levels by completing previous ones
- **Local Storage**: Progress automatically saved (IAM count, unlocked levels)
- **Camera**: Smooth camera follows player horizontally

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with localStorage persistence
- **Animations**: Framer Motion
- **Physics**: Custom game loop with requestAnimationFrame

## 📦 Project Structure

```
├── app/
│   ├── page.tsx              # Main game page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/platformer/
│   ├── Player.tsx            # Player character component
│   ├── Coin.tsx              # Collectible coin component
│   ├── Obstacle.tsx          # Obstacles (spikes, platforms, etc.)
│   ├── GameCanvas.tsx        # Main game canvas with camera
│   ├── HUD.tsx               # Heads-up display
│   ├── WinScreen.tsx         # Victory screen
│   ├── LevelSelect.tsx       # Level selection UI
│   └── MobileControls.tsx    # Mobile touch controls
├── hooks/
│   └── usePlatformerPhysics.ts  # Game physics and collision detection
├── store/
│   └── platformerStore.ts    # Zustand game state store
└── types/
    └── platformer.ts         # TypeScript type definitions
```

## 🚀 Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Game Levels

### Level 1: The Awakening 🌳
- **Coins Required**: 10
- **Description**: Begin your journey to restore balance
- **Features**: Basic platforms, spikes, and your first barrier

### Level 2: The Descent 💎
- **Coins Required**: 15
- **Description**: Navigate through treacherous paths
- **Features**: More complex platforming, pits, and increased difficulty

### Level 3: The Awakening ⛰️
- **Coins Required**: 20
- **Description**: Give back to restore balance
- **Features**: Most challenging level with complex platforming and many obstacles

## 🎨 Design Features

- **Clean UI**: Modern, futuristic aesthetic
- **Dark/Light Mode**: Toggle between themes
- **Responsive**: Works on desktop and mobile
- **Smooth Animations**: Framer Motion for polished feel
- **Visual Feedback**: Coin collection, level completion, win screen

## 🔮 Future Enhancements

- Story intro and lore pop-ups per level
- IAM staking to unlock hidden worlds
- Stellar wallet connection for on-chain IAM tracking
- Leaderboard and multiplayer race mode
- Custom avatars (NFT-ready)
- Sound effects and background music
- More levels and power-ups
- Enemy AI and combat system

## 📝 Gameplay Tips

1. **Collect Coins**: You need to collect the required number of coins to open barriers
2. **Watch for Spikes**: Touching spikes resets the level
3. **Avoid Pits**: Falling into pits resets the level
4. **Platform Timing**: Some platforms require precise jumps
5. **Complete All Levels**: Finish all 3 levels to achieve "The Awakening"

## 🎮 How to Play

1. Use arrow keys or WASD to move
2. Jump with W, Space, or Up arrow
3. Collect all coins in a level
4. Reach the flag at the end to complete the level
5. Complete all levels to restore balance!

## 📄 License

This project is open source and available for personal use.

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**
