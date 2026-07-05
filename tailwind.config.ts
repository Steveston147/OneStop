import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B2341',
        'deep-navy': '#071A33',
        ink: '#172033',
        muted: '#5F6B7A',
        mist: '#EEF2F6',
        line: '#d8e1ee',
        accent: '#8A1538',
        'deep-red': '#6F102D',
        gold: '#B08A3C',
        'light-gold': '#F6F0E3',
        'off-white': '#F8F6F2',
        sky: '#eaf2ff',
      },
      boxShadow: { soft: '0 18px 45px rgba(11,35,65,.08)' },
    },
  },
  plugins: [],
};

export default config;
