import { defineStore } from 'pinia'
import { getState, saveState } from '@/utils/db'

export const useGameStore = defineStore('game', {
  state: () => ({
    bank: 500, rebuys: 0, streak: 0, diceSkin: 'default',
    unlockedSkins: ['default'], sound: false, rolling: false,
    easterEggs: { snakeEyes: 0, first12: false, rebuys5: false }
  }),
  actions: {
    async init() { Object.assign(this.$state, await getState()) },
    async save() { await saveState(this.$state) },
    addBank(amount) { this.bank += amount; this.save() },
    deduct(amount) { if (this.bank >= amount) { this.bank -= amount; this.save(); return true } return false },
    rebuy() { this.rebuys++; this.addBank(500); if (this.rebuys === 5) this.unlockSkin('neonHat') },
    unlockSkin(name) {
      if (!this.unlockedSkins.includes(name)) this.unlockedSkins.push(name)
      this.save()
    },
    setStreak(val) { this.streak = val; this.save() }
  }
})
