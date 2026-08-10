/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#080808',
        primary: '#111214',
        card: '#18191C',
        elevated: '#202125',
        'text-primary': '#F4F1EA',
        'text-body': '#F4F1EA',
        'text-secondary': '#B3AFA8',
        'text-muted': '#86827C',
        'text-disabled': '#5E5B57',
        'border-default': '#2C2D31',
        'border-hover': '#484A50',
        accent: '#CC0000',
        'accent-hover': '#E8001A',
        'accent-subtle': '#2A080B',
        success: '#5EE0A0',
        warning: '#E8001A',
        error: '#E8001A',
        info: '#F5F5F5',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'elevation-1': '0 1px 2px rgba(0,0,0,0.35)',
        'elevation-2': '0 6px 18px rgba(0,0,0,0.32)',
      },
    },
  },
  plugins: [],
};
