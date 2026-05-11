export function exportTableState() {
  const state = JSON.stringify({ bank: game.bank, streak: game.streak, bets: game.bets })
  const encoded = btoa(encodeURIComponent(state))
  return `${window.location.origin}?table=${encoded}`
}

export function importTableState() {
  const params = new URLSearchParams(window.location.search)
  const encoded = params.get('table')
  if (!encoded) return null
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)))
  } catch { return null }
}
