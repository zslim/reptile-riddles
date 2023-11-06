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
        neon: {
          pink: '#B7016E',
          purple: '#6A0F5B',
          blue: '#48127A',
          green: '#095D40',
          orange: '#CA7D02'
        },
        neon2: {
          pink: '#CB017A',
          purple: '#7D126B',
          blue: '#54158E',
          green: '#0B6F4C',
          orange: '#DE8A02'
        },
        'hover': {
          red: '#DA1233',
          blue: '#095FC6',
          green: '#1E8004',
          yellow: '#CE9300',
        },
        'icon': {
          green: '#23BE6E',
          red: '#9C1C33'
        },
      },
    },
  },
  plugins: [],
  safelist: [{
    pattern: /(bg|text|border|hover:bg)-neon*-(pink|purple|blue|green|)/
  },
    'hover:bg-neon2-pink',
    'hover:bg-neon2-purple',
    'hover:bg-neon2-green',
    'hover:bg-neon2-blue',
  ]
};

