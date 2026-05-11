// Casino-standard payout ratios (multiplier on winning bet)
export const PAYOUTS = {
  passLine: 1,      // 1:1
  dontPass: 1,      // 1:1
  come: 1,          // 1:1
  place: { 4: 9/5, 10: 9/5, 5: 7/5, 9: 7/5, 6: 7/6, 8: 7/6 },
  odds: { 4: 2, 10: 2, 5: 3/2, 9: 3/2, 6: 6/5, 8: 6/5 }
}

// Minimum/maximum bet constraints
export const BET_LIMITS = {
  min: 5,
  maxPlace: 100,
  maxOdds: 50 // 3x odds on 6/8, 5x on 5/9, 10x on 4/10 (simplified)
}

export function calculateWin(type, target, amount, isOdds = false) {
  if (type === 'passLine' || type === 'dontPass' || type === 'come') {
    return amount * PAYOUTS.passLine
  }
  if (type === 'place' || type === 'odds') {
    const mult = PAYOUTS[type][target] || 1
    const win = amount * mult
    // Round down to nearest whole dollar (casino standard)
    return Math.floor(win)
  }
  return 0
}

export function isValidBet(store, type, amount, phase, point) {
  if (store.bank < amount) return false
  if (amount < BET_LIMITS.min) return false
  if (type === 'place' && amount > BET_LIMITS.maxPlace) return false
  if (phase === 'comeOut' && (type === 'place' || type === 'odds')) return false
  if (type === 'passLine' && phase === 'pointOn') return false
  if (type === 'dontPass' && phase === 'pointOn') return false
  return true
}
