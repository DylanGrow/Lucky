import { ref, computed } from 'vue'
import { useGameStore } from '@/store/gameStore'
import { PAYOUTS, calculateWin, isValidBet } from '@/utils/crapsRules'

export function useBettingEngine() {
  const store = useGameStore()
  const phase = ref('comeOut') // 'comeOut' | 'pointOn'
  const point = ref(null)
  const activeBets = ref([]) // { id, type, target, amount, isOdds, isCome }
  const chipValue = ref(5)

  const totalOnTable = computed(() => 
    activeBets.value.reduce((sum, b) => sum + b.amount, 0)
  )

  function placeBet(type, target = null, isOdds = false, isCome = false) {
    const amount = chipValue.value
    if (!isValidBet(store, type, amount, phase.value, point.value)) return false

    // Odds must be placed on existing base bet
    if (isOdds && !activeBets.value.some(b => b.type === type && !b.isOdds && (isCome ? b.isCome : !b.isCome))) {
      return false
    }

    store.deduct(amount)
    activeBets.value.push({
      id: crypto.randomUUID(),
      type,
      target: target || point.value,
      amount,
      isOdds,
      isCome
    })
    return true
  }

  function removeBet(betId) {
    const idx = activeBets.value.findIndex(b => b.id === betId)
    if (idx === -1) return false
    const bet = activeBets.value[idx]
    
    // Come bets can only be removed after next roll
    if (bet.isCome && phase.value === 'pointOn') return false
    // Place bets can always be taken down
    activeBets.value.splice(idx, 1)
    store.addBank(bet.amount)
    return true
  }

  function resolveRoll(d1, d2) {
    const total = d1 + d2
    let winnings = 0
    const logs = []

    // Helper: resolve line bets
    const resolveLines = (passWin, dontWin) => {
      activeBets.value = activeBets.value.filter(b => {
        if (b.type === 'passLine' && passWin) { winnings += calculateWin('passLine', null, b.amount); return false }
        if (b.type === 'passLine' && !passWin) return false
        if (b.type === 'dontPass' && dontWin) { winnings += calculateWin('dontPass', null, b.amount); return false }
        if (b.type === 'dontPass' && !dontWin) return false
        return true
      })
    }

    if (phase.value === 'comeOut') {
      if ([7, 11].includes(total)) {
        resolveLines(true, false)
        logs.push(total === 7 ? '🎯 Natural 7! Pass wins!' : 'Yo! 11! Pass wins!')
      } else if ([2, 3].includes(total)) {
        resolveLines(false, true)
        logs.push(`Craps ${total}! Don't Pass wins!`)
      } else if (total === 12) {
        resolveLines(false, false) // Push
        logs.push('🔥 BOXCARS! Pass loses, Don\'t pushes.')
      } else {
        point.value = total
        phase.value = 'pointOn'
        logs.push(`🎲 Point set to ${total}!`)
      }
    } else {
      if (total === point.value) {
        resolveLines(true, false)
        resolveNumberBets(point.value, true)
        logs.push(`🎉 Point ${total} hit! All matching bets pay!`)
        point.value = null
        phase.value = 'comeOut'
      } else if (total === 7) {
        resolveLines(false, true)
        resolveNumberBets(7, false) // Seven out
        logs.push('📉 Seven Out! Pass/Place lose, Don\'t wins!')
        point.value = null
        phase.value = 'comeOut'
      } else {
        resolveNumberBets(total, null)
        if ([4,5,6,8,9,10].includes(total)) {
          // Move come bets to their established point
          activeBets.value.forEach(b => {
            if (b.isCome && !b.target) b.target = total
          })
          logs.push(`Rolled ${total}. Come bets tracking.`)
        }
      }
    }

    if (winnings > 0) store.addBank(winnings)
    return { winnings, logs, phase: phase.value, point: point.value }
  }

  function resolveNumberBets(rolled, winCondition) {
    activeBets.value = activeBets.value.filter(b => {
      if (!b.target || ![4,5,6,8,9,10].includes(b.target)) return true
      if (b.target === rolled && (winCondition === true || winCondition === null)) {
        winnings += calculateWin(b.type, b.target, b.amount, b.isOdds)
        return b.type === 'come' // Keep come bets active for next roll
      }
      if (winCondition === false && b.target === 7) return false // Seven out clears place/odds
      return true
    })
  }

  return { phase, point, activeBets, chipValue, totalOnTable, placeBet, removeBet, resolveRoll }
}
