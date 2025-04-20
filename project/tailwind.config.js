/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFC107',
          light: '#FFECB3',
          dark: '#FFA000',
        },
        secondary: {
          DEFAULT: '#000000',
          light: '#212121',
          dark: '#000000',
        },
        tertiary: {
          DEFAULT: '#FFFFFF',
          light: '#FFFFFF',
          dark: '#F5F5F5',
        },
        success: {
          DEFAULT: '#4CAF50',
          light: '#A5D6A7',
          dark: '#2E7D32',
        },
        warning: {
          DEFAULT: '#FF9800',
          light: '#FFCC80',
          dark: '#EF6C00',
        },
        error: {
          DEFAULT: '#F44336',
          light: '#EF9A9A',
          dark: '#C62828',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};