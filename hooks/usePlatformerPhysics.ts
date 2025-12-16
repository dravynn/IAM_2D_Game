import { useEffect, useRef } from 'react'
import { usePlatformerStore, GRAVITY, JUMP_POWER, MOVE_SPEED, GROUND_FRICTION } from '@/store/platformerStore'

export function usePlatformerPhysics() {
  const {
    player,
    currentObstacles,
    currentCoins,
    collectCoin,
    setPlayerPosition,
    setPlayerVelocity,
    setPlayerOnGround,
    setPlayerFacing,
    resetLevel,
    currentLevelIndex,
    levels,
    unlockNextLevel,
    showWin,
  } = usePlatformerStore()

  const keysRef = useRef<Set<string>>(new Set())
  const mobileControlsRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false })
  const animationFrameRef = useRef<number>()

  // Expose mobile controls
  useEffect(() => {
    ;(window as any).setMobileLeft = (pressed: boolean) => {
      mobileControlsRef.current.left = pressed
    }
    ;(window as any).setMobileRight = (pressed: boolean) => {
      mobileControlsRef.current.right = pressed
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key.toLowerCase())
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase())
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    const gameLoop = () => {
      const keys = keysRef.current
      const mobile = mobileControlsRef.current
      let { x, y } = player.position
      let { vx, vy } = player.velocity
      let onGround = false

      // Horizontal movement (keyboard + mobile)
      if (keys.has('a') || keys.has('arrowleft') || mobile.left) {
        vx = -MOVE_SPEED
        setPlayerFacing(false)
      } else if (keys.has('d') || keys.has('arrowright') || mobile.right) {
        vx = MOVE_SPEED
        setPlayerFacing(true)
      } else {
        vx *= GROUND_FRICTION
      }

      // Jump
      if ((keys.has('w') || keys.has('arrowup') || keys.has(' ')) && player.onGround) {
        vy = JUMP_POWER
        onGround = false
      }

      // Apply gravity
      vy += GRAVITY

      // Update position
      x += vx
      y += vy

      // Ground collision
      const groundY = 550 // Ground level
      if (y + player.size.height >= groundY) {
        y = groundY - player.size.height
        vy = 0
        onGround = true
      }

      // Platform collision
      currentObstacles.forEach((obstacle) => {
        if (obstacle.type === 'platform') {
          const playerRight = x + player.size.width
          const playerBottom = y + player.size.height
          const obstacleRight = obstacle.position.x + obstacle.size.width
          const obstacleBottom = obstacle.position.y + obstacle.size.height

          // Check if player is above platform and falling
          if (
            vy > 0 &&
            playerRight > obstacle.position.x &&
            x < obstacleRight &&
            playerBottom > obstacle.position.y &&
            y < obstacle.position.y + 10
          ) {
            y = obstacle.position.y - player.size.height
            vy = 0
            onGround = true
          }
        }
      })

      // Coin collection
      currentCoins.forEach((coin) => {
        if (!coin.collected) {
          const distance = Math.sqrt(
            Math.pow(x + player.size.width / 2 - (coin.position.x + coin.size.width / 2), 2) +
            Math.pow(y + player.size.height / 2 - (coin.position.y + coin.size.height / 2), 2)
          )
          if (distance < 40) {
            collectCoin(coin.id)
          }
        }
      })

      // Spike collision
      currentObstacles.forEach((obstacle) => {
        if (obstacle.type === 'spike') {
          const playerRight = x + player.size.width
          const playerBottom = y + player.size.height
          const obstacleRight = obstacle.position.x + obstacle.size.width
          const obstacleBottom = obstacle.position.y + obstacle.size.height

          if (
            playerRight > obstacle.position.x &&
            x < obstacleRight &&
            playerBottom > obstacle.position.y &&
            y < obstacleBottom
          ) {
            // Reset level on spike hit
            resetLevel()
          }
        }
      })

      // Pit collision
      currentObstacles.forEach((obstacle) => {
        if (obstacle.type === 'pit') {
          const playerRight = x + player.size.width
          const playerBottom = y + player.size.height
          const obstacleRight = obstacle.position.x + obstacle.size.width

          if (
            playerRight > obstacle.position.x &&
            x < obstacleRight &&
            y + player.size.height > obstacle.position.y
          ) {
            resetLevel()
          }
        }
      })

      // Check barrier (should open when enough coins collected)
      const currentLevel = levels[currentLevelIndex]
      const collectedCount = currentCoins.filter((c) => c.collected).length
      const barrier = currentObstacles.find((o) => o.type === 'barrier')
      if (barrier && collectedCount >= currentLevel.requiredCoins) {
        // Barrier opens - remove it from obstacles
        // This is handled by filtering in render
      }

      // Check flag (level complete)
      const flag = currentObstacles.find((o) => o.type === 'flag')
      if (flag) {
        const distance = Math.sqrt(
          Math.pow(x + player.size.width / 2 - (flag.position.x + flag.size.width / 2), 2) +
          Math.pow(y + player.size.height / 2 - (flag.position.y + flag.size.height / 2), 2)
        )
        if (distance < 50) {
          // Level complete
          if (currentLevelIndex === levels.length - 1) {
            // Final level - check if all coins collected
            const allCoinsCollected = currentCoins.every((c) => c.collected)
            if (allCoinsCollected) {
              showWin()
            }
          } else {
            unlockNextLevel()
            // Move to next level after a delay
            setTimeout(() => {
              usePlatformerStore.getState().setCurrentLevel(currentLevelIndex + 1)
            }, 1000)
          }
        }
      }

      // Boundary checks
      if (x < 0) x = 0
      if (x > currentLevel.width - player.size.width) {
        x = currentLevel.width - player.size.width
      }

      setPlayerPosition({ x, y })
      setPlayerVelocity({ vx, vy })
      setPlayerOnGround(onGround)

      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [
    player.position,
    player.velocity,
    player.onGround,
    currentObstacles,
    currentCoins,
    collectCoin,
    setPlayerPosition,
    setPlayerVelocity,
    setPlayerOnGround,
    setPlayerFacing,
    resetLevel,
    currentLevelIndex,
    levels,
    unlockNextLevel,
    showWin,
  ])
}

