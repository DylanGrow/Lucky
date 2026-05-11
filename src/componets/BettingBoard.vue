<template>
  <div class="w-full bg-felt-dark rounded-xl border-4 border-felt-light p-4 shadow-inner">
    <div class="grid grid-cols-12 gap-2 text-center text-xs font-bold uppercase tracking-wide">
      <!-- Pass / Don't Pass / Come -->
      <button 
        v-for="zone in mainZones" 
        :key="zone.key"
        @click="handleZoneClick(zone)"
        :disabled="!zone.enabled"
        class="col-span-4 py-4 rounded-lg border-2 transition hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        :class="zone.class"
        aria-label="Place bet on {{ zone.label }}"
      >
        {{ zone.label }}
        <div v-if="getZoneAmount(zone.key) > 0" class="mt-1 text-sm">${{ getZoneAmount(zone.key) }}</div>
      </button>

      <!-- Point Numbers / Place Bets -->
      <div class="col-span-12 grid grid-cols-6 gap-2 mt-2">
        <button 
          v-for="num in [4,5,6,8,9,10]" 
          :key="num"
          @click="placeBet('place', num)"
          :disabled="!isValidPlace(num)"
          class="py-3 rounded-lg border-2 bg-felt hover:bg-felt-light transition disabled:opacity-30"
          :class="{ 'border-chip-gold shadow-[0_0_8px_rgba(244,162,97,0.5)]': point === num }"
        >
          Place {{ num }}
          <div v-if="getBetCount('place', num) > 0" class="text-chip-red">${{ getPlaceAmount(num) }}</div>
        </button>
      </div>
    </div>

    <!-- Chip Selector -->
    <div class="flex justify-center gap-3 mt-4">
      <button 
        v-for="v in [5, 10, 25, 50]" 
        :key="v"
        @click="chipValue = v"
        class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm transition hover:scale-110"
        :class="{ 'ring-2 ring-white scale-110': chipValue === v }"
        :style="chipStyles[v]"
      >
        {{ v }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBettingEngine } from '@/composables/useBettingEngine'

const { phase, point, activeBets, chipValue, placeBet } = useBettingEngine()

const mainZones = [
  { key: 'passLine', label: 'Pass Line', class: 'bg-felt text-white border-white/30 hover:bg-felt-light', enabled: phase.value === 'comeOut' },
  { key: 'dontPass', label: 'Don\'t Pass', class: 'bg-felt text-red-300 border-red-500/40 hover:bg-red-900/30', enabled: phase.value === 'comeOut' },
  { key: 'come', label: 'Come', class: 'bg-felt text-blue-300 border-blue-500/40 hover:bg-blue-900/30', enabled: phase.value === 'pointOn' }
]

const chipStyles = { 5: 'bg-chip-red', 10: 'bg-chip-blue', 25: 'bg-chip-green', 50: 'bg-chip-gold' }

function handleZoneClick(zone) {
  if (zone.key === 'come') placeBet('come', null, false, true)
  else placeBet(zone.key)
}

function getZoneAmount(key) {
  return activeBets.value.filter(b => b.type === key && !b.isOdds).reduce((s, b) => s + b.amount, 0)
}

function getBetCount(type, target) {
  return activeBets.value.filter(b => b.type === type && b.target === target && !b.isOdds).length
}

function getPlaceAmount(num) {
  return activeBets.value.filter(b => b.type === 'place' && b.target === num).reduce((s, b) => s + b.amount, 0)
}

function isValidPlace(num) {
  return phase.value === 'pointOn' && [4,5,6,8,9,10].includes(num)
}
</script>
