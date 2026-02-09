import { fontFamily } from 'tailwindcss/defaultTheme';

module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Shadcn/UI base colors mapped to VA theme
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: '#e63312', // VA Red
          foreground: '#ffffff',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#e63312',
          600: '#cc2d10',
          700: '#b3270e',
          800: '#99210c',
          900: '#7f1b0a',
        },
        primary: {
          DEFAULT: '#133F6D', // VA Blue
          foreground: '#ffffff',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#133F6D',
          600: '#103761',
          700: '#0e2f55',
          800: '#0b2749',
          900: '#081f3d',
        },
        accent: {
          DEFAULT: '#03979d', // VA Teal
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#95c11f', // VA Green
          foreground: '#ffffff',
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#95c11f',
          600: '#82a91a',
          700: '#6f9116',
          800: '#5c7913',
          900: '#496110',
        },
        warning: {
          DEFAULT: '#fbba00', // VA Yellow
          foreground: '#1d1d1b',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#fbba00',
          600: '#d99e00',
          700: '#b78200',
          800: '#956600',
          900: '#734a00',
        },
        error: {
          DEFAULT: '#f07f3c', // VA Orange (for errors/alerts)
          foreground: '#ffffff',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f07f3c',
          600: '#d66d33',
          700: '#bc5b2a',
          800: '#a24921',
          900: '#883718',
        },
        destructive: {
          DEFAULT: '#f07f3c', // VA Orange
          foreground: '#ffffff',
        },
        info: {
          DEFAULT: '#03979d', // VA Teal
          foreground: '#ffffff',
        },
        // Original VA colors for direct access
        warning: {
          red: '#e63312',
          blue: '#133F6D',
          black: '#1d1d1b',
          gray: '#6D6F71',
          lightgray: '#D1D3D4',
          white: '#ffffff',
          yellow: '#fbba00',
          orange: '#f07f3c',
          teal: '#03979d',
          green: '#95c11f',
        },
        // Neutral grays based on VA black variants
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#D1D3D4', // VA Light Gray
          400: '#a3a3a3',
          500: '#737373',
          600: '#6D6F71', // VA Gray
          700: '#525252',
          800: '#404040',
          900: '#1d1d1b', // VA Black
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: '#fee2e2' }, // Light red tint
          '50%': { backgroundColor: '#fecaca' },
        },
      },
      animation: {
        blink: 'blink 1.5s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
