const DB_NAME = 'luckRollDB'
const DB_VERSION = 1
const STORE = 'state'

export async function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = e => e.target.result.createObjectStore(STORE, { keyPath: 'id' })
    req.onsuccess = e => resolve(e.target.result)
    req.onerror = e => reject(e)
  })
}

export async function getState() {
  const db = await openDB()
  return new Promise(r => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).get('default')
    req.onsuccess = () => r(req.result || { bank: 500, rebuys: 0, streak: 0, skins: ['default'], easterEggs: {}, bets: [] })
  })
}

export async function saveState(state) {
  const db = await openDB()
  const tx = db.transaction(STORE, 'readwrite')
  tx.objectStore(STORE).put({ id: 'default', ...state })
  return new Promise(r => tx.oncomplete = r)
}
