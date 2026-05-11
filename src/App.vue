<template>
  <div class="min-h-screen bg-felt-dark text-white flex flex-col items-center p-4">
    <header class="w-full max-w-lg flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold tracking-wider">🎲 Let the Luck Roll In</h1>
      <div class="flex gap-3 items-center">
        <button @click="store.soundEnabled=!store.soundEnabled" class="px-3 py-1 bg-felt-light rounded border border-felt">{{store.soundEnabled?'🔊':'🔇'}}</button>
        <span class="px-3 py-1 bg-felt-light rounded border border-felt font-mono">💰 ${{store.bank}}</span>
      </div>
    </header>
    <main class="w-full max-w-lg bg-felt rounded-xl p-5 shadow-2xl border-2 border-felt-light space-y-4">
      <div class="flex justify-center gap-6 items-center py-6 bg-black/30 rounded-lg">
        <Dice3D v-for="(d,i) in dice" :key="i" :value="d" :skin="store.diceSkin" :is-rolling="store.rolling" :is-hot="store.streak>=3" />
      </div>
      <button @click="handleRoll" :disabled="store.rolling" class="w-full py-4 bg-chip-red text-white font-bold text-xl rounded-lg shadow-lg hover:bg-red-500 active:scale-95 transition disabled:opacity-50">
        {{store.rolling?'Rolling...':'🎲 ROLL'}}
      </button>
      <BettingBoard :phase="betting.phase" :active-bets="betting.activeBets" :current-chip="betting.chipValue" @bet="handlePlaceBet" @chip="v=>betting.chipValue=v" />
      <div v-if="notifications.length" class="bg-black/40 rounded p-3 text-center space-y-1 text-sm">
        <div v-for="(msg,i) in notifications" :key="i" class="animate-fade-in">{{msg}}</div>
      </div>
      <div class="flex justify-between items-center bg-black/20 p-3 rounded mt-2">
        <button @click="store.rebuy()" class="px-4 py-2 bg-chip-gold text-black font-semibold rounded hover:bg-yellow-400">💰 Rebuy $500</button>
        <span class="text-xs text-felt-light">Streak: {{store.streak}} 🔥</span>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useGameStore } from './store/gameStore'
import { useDiceRoll } from './composables/useDiceRoll'
import { useBettingEngine } from './composables/useBettingEngine'
import Dice3D from './components/dice/Dice3D.vue'
import BettingBoard from './components/BettingBoard.vue'
const store = useGameStore(), { dice, roll } = useDiceRoll(), { phase, activeBets, chipValue, placeBet, resolveRoll } = useBettingEngine(), notifications = ref([])
onMounted(() => store.init())
async function handleRoll() {
  if (store.rolling || store.bank < 5) return
  store.rolling = true; notifications.value = []
  const { d1, d2, total } = await roll()
  const result = resolveRoll(d1, d2)
  handleEasterEggs(d1, d2, total)
  handleStreak(total)
  notifications.value = result.logs; store.rolling = false
}
function handlePlaceBet(type, target) {
  if (placeBet(type, target || 6)) notifications.value.push(`Bet placed: ${type} ${target||''}`)
  else notifications.value.push('❌ Invalid bet or insufficient funds')
}
function handleStreak(total) {
  if ([7,11].includes(total)) store.setStreak(store.streak + 1)
  else if (total !== 7) store.setStreak(0)
}
function handleEasterEggs(d1, d2, total) {
  const isHard = d1 === d2 && [4,6,8,10].includes(total)
  const isBoxcars = total === 12, isSnake = total === 2
  if (isHard) { store.addBank(10); notifications.value.push('🔥 Hard Way! +$10') }
  if (isBoxcars) {
    store.addBank(50); notifications.value.push('🔥 BOXCARS! The gods have spoken! +$50')
    if (!store.easterEggs.first12) { store.easterEggs.first12 = true; store.unlockSkin('devilsHorns') }
  }
  if (isSnake) { store.easterEggs.snakeEyesCount++; if (store.easterEggs.snakeEyesCount>=3) { store.addBank(25); notifications.value.push('🤬 Yo Momma rolls better! +$25') } }
  if (total===11) notifications.value.push('🎤 Yo! Yo! 11!')
  if (total===12 && (new Date().getHours()===0 || new Date().getHours()===12)) store.unlockSkin('chrono')
}
</script>
