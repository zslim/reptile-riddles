/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kahoot': {
          red: '#E41C3D',
          blue: '#1369D0',
          green: '#288A0E',
          yellow: '#D89D02',
          purple: '#4C1E93',
          lightpurple: '#8951C0',
          darkblue: '#2C0F70'
        },
        'hover': {
          red: '#DA1233',
          blue: '#095FC6',
          green: '#1E8004',
          yellow: '#CE9300',
        },        
        'icon': {
          green: '#1BA35C',
          red: '#F44336'
        },
      },
    },
  },
   plugins: [],
   safelist: [{
    pattern: /(bg|text|border|hover:bg)-kahoot-(red|blue|green|yellow|)/
  },
  'hover:bg-hover-red',
  'hover:bg-hover-blue',
  'hover:bg-hover-green',
  'hover:bg-hover-yellow',
  ]
}

