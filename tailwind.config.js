/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#080808',
        primary: '#111111',
        card: '#1A1A1A',
        elevated: '#242424',
        'text-primary': '#FFFFFF',
        'text-body': '#F0ECE8',
        'text-secondary': '#C8C8C8',
        'text-muted': '#888888',
        'text-disabled': '#4A4A4A',
        'border-default': '#2E2E2E',
        'border-hover': '#4A4A4A',
        accent: '#990000',
        'accent-hover': '#CC1111',
        'accent-subtle': '#3D0000',
        success: '#1A7A3A',
        warning: '#CC8800',
        error: '#E63030',
        info: '#4488CC',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'elevation-2': '0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
        'elevation-3': '0 8px 24px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        'elevation-4': '0 16px 48px rgba(0,0,0,0.7), 0 8px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        glow: '0 0 60px rgba(153,0,0,0.35)',
        'glow-lg': '0 0 120px rgba(204,17,17,0.45)',
      },
      animation: {
        'gradient-shift': 'gradientShift 12s ease infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-mid': 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'border-sweep': 'borderSweep 4s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-30px) translateX(15px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
