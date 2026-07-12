import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#13283F',
        'deep-navy': '#0B1B2C',
        ink: '#1D2733',
        muted: '#657181',
        mist: '#F3F5F7',
        line: '#DDE3EA',
        accent: '#A10000',
        'deep-red': '#780000',
        gold: '#C5A46D',
        'light-gold': '#F5EFE5',
        'off-white': '#FCFAF7',
        sky: '#EEF3F8',
      },
      boxShadow: { soft: '0 18px 45px rgba(19,40,63,.08)' },
    },
  },
  plugins: [],
};

export default config;
