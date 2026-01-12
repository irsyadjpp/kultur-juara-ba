
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Outfit"', 'sans-serif'],
        headline: ['"Outfit"', 'sans-serif'],
        mono: ['"Outfit"', 'monospace'],
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.5rem',
        'pill': '9999px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      // ... keep existing animations ...
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'scan': 'scan 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
            '0%, 100%': { transform: 'translateY(-10%)', opacity: '0' },
            '50%': { transform: 'translateY(100%)', opacity: '1' },
        },
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
