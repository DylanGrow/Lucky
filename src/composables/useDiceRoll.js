import { ref } from 'vue'
import { useGameStore } from '@/store/gameStore'
import { useEasterEggs } from './useEasterEggs'
import { useSound } from './useSound'

export function useDiceRoll() {
  const dice = ref([1, 1])
  const game = useGameStore()
  const { checkEasterEgg, playRollSFX } = useEasterEggs()
  const { play } = useSound()

  async function roll() {
    if (game.rolling || game.bank < 5) return
    game.rolling = true
    await new Promise(r => setTimeout(r, 600)) // Animation delay
    play('roll')
    
    const d1 = Math.floor(Math.random() * 6) + 1
    const d2 = Math.floor(Math.random() * 6) + 1
    dice.value = [d1, d2]
    
    const total = d1 + d2
    checkEasterEgg(d1, d2, total, game)
    
    // Streak logic (simplified for Pass Line wins)
    if ([7, 11].includes(total)) {
      game.setStreak(game.streak + 1)
    } else {
      game.setStreak(0)
    }
    
    game.rolling = false
  }

  return { dice, roll }
}
