import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'], theme: { extend: { colors: { navy: '#0b2242', ink: '#182235', mist: '#f4f7fb', line: '#d8e1ee', accent: '#b58b2b', sky: '#eaf2ff' }, boxShadow: { soft: '0 18px 45px rgba(11,34,66,.08)' } } }, plugins: [] };
export default config;
