/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        mist: {
          50: '#FFFFFF',
          100: '#F6F8F7',
          200: '#E9EFEA',
          300: '#D8E2DD',
        },
        abyss: {
          950: '#0B1517',
          900: '#102124',
          800: '#122124',
          700: '#192D31',
          500: '#4F6367',
          400: '#8FA5A8',
        },
        aegean: {
          400: '#2FB5B0',
          600: '#0F6E6E',
          700: '#0B5555',
        },
        copper: {
          400: '#E8845A',
          600: '#D46A3C',
        },
      },
    },
  },
  plugins: [],
};
