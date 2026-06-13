// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'weather-pulse': 'pulse 2s infinite',
        'weather-rain': 'rain 0.5s infinite linear',
      },
      keyframes: {
        rain: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(20px)', opacity: 1 },
        }
      }
    },
  },
}