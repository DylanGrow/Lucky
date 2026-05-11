export function useEasterEggs() {
  function checkEasterEgg(d1, d2, total, store) {
    const isHardWay = d1 === d2 && [4,6,8,10].includes(total)
    const isBoxcars = total === 12
    const isSnakeEyes = total === 2
    const isEleven = total === 11

    if (isHardWay) {
      store.addBank(10)
      showToast('🔥 Hard Way! +$10')
    }
    if (isBoxcars) {
      store.addBank(50)
      if (!store.easterEggs.first12) {
        store.easterEggs.first12 = true
        store.unlockSkin('devilsHorns')
      }
      showToast('🔥 BOXCARS! The gods have spoken! +$50')
    }
    if (isSnakeEyes) {
      store.easterEggs.snakeEyes++
      if (store.easterEggs.snakeEyes >= 3) {
        store.addBank(25)
        showToast('🤬 Even Yo Momma rolls better! +$25')
      }
    }
    if (isEleven) showToast('🎤 Yo! Yo! 11!')
  }

  function showToast(msg) {
    // Replace with your toast component or console
    console.log(msg)
  }

  return { checkEasterEgg }
}
