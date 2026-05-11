<template>
  <div class="min-h-screen bg-felt-dark text-white font-sans p-4 flex flex-col items-center">
    <header class="w-full max-w-4xl flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold tracking-wider">🎲 Let the Luck Roll In</h1>
      <div class="flex gap-3">
        <button @click="game.sound = !game.sound" class="px-3 py-1 bg-felt-light rounded border border-felt">
          {{ game.sound ? '🔊' : '🔇' }}
        </button>
        <span class="px-3 py-1 bg-felt-light rounded border border-felt font-mono">💰 ${{ game.bank }}</span>
      </div>
    </header>

    <main class="w-full max-w-4xl bg-felt rounded-xl p-5 shadow-2xl border-2 border-felt-light">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1 flex flex-col items-center justify-center p-6 bg-black/30 rounded-lg">
          <div class="flex gap-4 mb-6" :class="{ 'animate-dice-shake': game.rolling }">
            <DiceFace v-for="(d, i) in dice" :key="i" :value="d" :skin="game.diceSkin" />
          </div>
          <button @click="roll" :disabled="game.rolling" class="w-full py-4 bg-chip-red text-white font-bold text-xl rounded-lg shadow-lg hover:bg-red-500 active:scale-95 transition disabled:opacity-50">
            {{ game.rolling ? 'Rolling...' : '🎲 ROLL' }}
          </button>
          <div v-if="game.streak >= 3" class="mt-3 text-yellow-400 font-bold animate-pulse">🔥 HOT STREAK! 🔥</div>
        </div>
        <div class="flex-[2]"><BettingBoard /></div>
      </div>

      <div class="mt-5 flex justify-between items-center bg-black/20 p-3 rounded">
        <button @click="game.rebuy()" class="px-4 py-2 bg-chip-gold text-black font-semibold rounded hover:bg-yellow-400">💰 Buy Chips ($500)</button>
        <span class="text-sm text-felt-light">Rebuys: {{ game.rebuys }}{{ game.rebuys >= 5 ? ' 🃏 High roller in denial!' : '' }}</span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGameStore } from '@/store/gameStore'
import { useDiceRoll } from '@/composables/useDiceRoll'
import BettingBoard from '@/components/BettingBoard.vue'
import DiceFace from '@/components/dice/DiceFace.vue'

const game = useGameStore()
const { dice, roll } = useDiceRoll()

onMounted(async () => {
  await game.init()
  if (game.streak >= 3) document.title = '🔥 Hot Streak! Roll Again!'
})
</script>
