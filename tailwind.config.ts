import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0b2242',
        ink: '#182235',
        mist: '#f4f7fb',
        line: '#d8e1ee',
        accent: '#9f1d35',
        rits: '#9f1d35',
        ritsDark: '#731427',
        ritsPale: '#fff3f5',
        creotechBlue: '#2B5EA8',
        creotechPink: '#C02659',
        sky: '#eaf2ff',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(11,34,66,.08)',
      },
    },
  },
  plugins: [],
};

export default config;
