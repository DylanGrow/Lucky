export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        felt: { DEFAULT: '#1a472a', light: '#2d5e3f', dark: '#0f2b19' },
        chip: { red: '#e63946', green: '#2a9d8f', blue: '#457b9d', gold: '#f4a261' }
      },
      fontFamily: { sans: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'] },
      animation: {
        'dice-shake': 'shake 0.4s ease-in-out',
        'glow-pulse': 'glow 1.5s infinite alternate',
        'confetti-burst': 'confetti 1s ease-out forwards'
      },
      keyframes: {
        shake: { '0%, 100%': { transform: 'rotate(0deg)' }, '25%': { transform: 'rotate(-8deg)' }, '75%': { transform: 'rotate(8deg)' } },
        glow: { '0%': { boxShadow: '0 0 5px rgba(0,255,0,0.4)' }, '100%': { boxShadow: '0 0 25px rgba(0,255,0,0.8)' } }
      }
    }
  },
  plugins: []
}
