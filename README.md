# 🎲 Let the Luck Roll In

> A classic green-felt casino craps experience. Offline-first Vue 3 PWA with 3D CSS dice, real casino payouts, hot streaks, Easter eggs, and zero external dependencies. Hosted on GitHub Pages.

[![Vue 3](https://img.shields.io/badge/Vue-3.4+-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Hosted-GitHub_Pages-222222?logo=github)](https://pages.github.com/)

---

## ✨ Features

### 🎰 Core Gameplay
- **Full Craps Board**: Pass Line, Don't Pass, Come, Place Bets (4/5/6/8/9/10)
- **Real Casino Math**: Exact payouts (9:5, 7:5, 7:6, 2:1) with true odds tracking
- **Persistent Bankroll**: $500 starting bank, auto-saved via IndexedDB
- **Chip Selector**: $5 / $10 / $25 / $50 denominations with instant table updates
- **Turn-Based Multiplayer Ready**: Shareable state links (no auth required)

### 🔥 Player Magic & Easter Eggs
| Trigger | Effect | Reward |
|---------|--------|--------|
| `3+ Wins in a Row` | Confetti burst + dynamic title + golden glow | Streak multiplier |
| `Hard Way (4,6,8,10)` | Golden explosion + "🔥 Hard Way!" flash | +$10 bonus |
| `Boxcars (12)` | Dice shower + "The gods have spoken!" | +$50 bonus |
| `First 12 Rolled` | Unlocks 👹 Devil's Horns skin | Permanent unlock |
| `Midnight 12 (12AM/PM)` | Time warp animation + double streak | 🕰️ Chrono Dice skin |
| `Snake Eyes 3x` | "Even Yo Momma rolls better!" | +$25 bonus |
| `Rebuy 5x` | "High roller in denial!" toast | 🎩 Neon Top Hat skin |
| `Roll 11` | Retro "Yo! Yo! 11!" audio cue | +0 (pure vibes) |

### 🛠 Tech Stack
- **Frontend**: Vue 3 + Composition API + Pinia state management
- **Styling**: Tailwind CSS (system fonts, zero remote requests)
- **Build**: Vite (fast HMR, optimized production build)
- **Storage**: IndexedDB wrapper (offline bankroll, streaks, unlocks)
- **Offline**: Service Worker (cache-first strategy, full PWA install)
- **Analytics**: Plausible-ready (privacy-first, no cookies)
- **CI/CD**: GitHub Actions auto-deploy on `main` push

### ♿ Accessibility & Polish
- ✅ Full keyboard navigation & `:focus-visible` outlines
- ✅ `aria-live` regions for dice results & screen reader support
- ✅ High-contrast mode (`prefers-contrast`) & reduced motion support
- ✅ Auto-muted audio with toggle + sound caption fallbacks
- ✅ Dynamic `<title>` updates (`🔥 Hot Streak! Roll Again!`)
- ✅ Micro-interactions: chip wobble, dice shake, confetti burst

---

## 🚀 Quick Start

```bash
# 1. Clone & install
git clone https://github.com/yourusername/let-the-luck-roll-in.git
cd let-the-luck-roll-in
npm install

# 2. Run dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
